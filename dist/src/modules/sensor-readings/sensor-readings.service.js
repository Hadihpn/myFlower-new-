"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var SensorReadingsService_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorReadingsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const sensor_reading_entity_1 = require("./entities/sensor-reading.entity");
const devices_service_1 = require("../devices/devices.service");
const sensor_verification_service_1 = require("../sensor-verification/sensor-verification.service");
const config_1 = require("@nestjs/config");
const user_plant_selections_service_1 = require("../user-plant-selections/user-plant-selections.service");
const notifications_service_1 = require("../notifications/notifications.service");
const chart_query_dto_1 = require("./dto/chart-query.dto");
let SensorReadingsService = SensorReadingsService_1 = class SensorReadingsService {
    constructor(readingRepository, devicesService, verificationService, userPlantSelectionsService, notificationsService, configService) {
        this.readingRepository = readingRepository;
        this.devicesService = devicesService;
        this.verificationService = verificationService;
        this.userPlantSelectionsService = userPlantSelectionsService;
        this.notificationsService = notificationsService;
        this.configService = configService;
        this.logger = new common_1.Logger(SensorReadingsService_1.name);
        this.suddenChangeThresholds = {
            temperature: this.configService.get('sensor.suddenChange.temperature') ?? 5,
            moisture: this.configService.get('sensor.suddenChange.moisture') ?? 20,
            light: this.configService.get('sensor.suddenChange.light') ?? 300,
        };
    }
    async createReading(deviceId, createReadingDto) {
        const device = await this.devicesService.findDeviceByDeviceId(deviceId);
        if (!device) {
            throw new common_1.NotFoundException(`Device with identifier "${deviceId}" not found`);
        }
        const calibratedData = this.applyCalibration(createReadingDto, device.calibration ?? null);
        const reading = this.readingRepository.create({
            deviceId: device.deviceId,
            temperature: calibratedData.temperature,
            moisture: calibratedData.moisture,
            light: calibratedData.light,
            humidity: calibratedData.humidity,
            timestamp: createReadingDto.timestamp ? new Date(createReadingDto.timestamp) : new Date(),
            verified: true,
        });
        const savedReading = await this.readingRepository.save(reading);
        await this.devicesService.updateLastSeen(deviceId);
        console.log('Before threshold');
        await this.checkPlantThresholds(device.deviceId, device.userId, savedReading);
        await this.checkSuddenChanges(device.id, savedReading);
        return savedReading;
    }
    async getDeviceReadings(deviceId, queryDto) {
        const { startDate, endDate, limit = 10000 } = queryDto;
        const query = this.readingRepository
            .createQueryBuilder('reading')
            .where('reading.deviceId = :deviceId', { deviceId })
            .orderBy('reading.timestamp', 'DESC')
            .limit(limit);
        if (startDate) {
            query.andWhere('reading.timestamp >= :startDate', {
                startDate: new Date(startDate),
            });
        }
        if (endDate) {
            query.andWhere('reading.timestamp <= :endDate', {
                endDate: new Date(endDate),
            });
        }
        return query.getMany();
    }
    async getDeviceById(id) {
        return await this.readingRepository.findOneBy({ id });
    }
    async getLatestReading(deviceId) {
        return this.readingRepository.findOne({
            where: { deviceId },
            order: { timestamp: 'DESC' },
        });
    }
    async getAverageReadings(deviceId, startDate, endDate) {
        const result = await this.readingRepository
            .createQueryBuilder('reading')
            .select('AVG(reading.temperature)', 'avgTemperature')
            .addSelect('AVG(reading.moisture)', 'avgMoisture')
            .addSelect('AVG(reading.light)', 'avgLight')
            .addSelect('AVG(reading.humidity)', 'avgHumidity')
            .where('reading.deviceId = :deviceId', { deviceId })
            .andWhere('reading.timestamp BETWEEN :startDate AND :endDate', {
            startDate,
            endDate,
        })
            .getRawOne();
        return {
            avgTemperature: parseFloat(result?.avgTemperature) || 0,
            avgMoisture: parseFloat(result?.avgMoisture) || 0,
            avgLight: parseFloat(result?.avgLight) || 0,
            avgHumidity: parseFloat(result?.avgHumidity) || 0,
        };
    }
    async getDailyStats(deviceId, date) {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);
        const result = await this.readingRepository
            .createQueryBuilder('reading')
            .select('MIN(reading.temperature)', 'minTemperature')
            .addSelect('MAX(reading.temperature)', 'maxTemperature')
            .addSelect('AVG(reading.temperature)', 'avgTemperature')
            .addSelect('MIN(reading.moisture)', 'minMoisture')
            .addSelect('MAX(reading.moisture)', 'maxMoisture')
            .addSelect('AVG(reading.moisture)', 'avgMoisture')
            .addSelect('MIN(reading.light)', 'minLight')
            .addSelect('MAX(reading.light)', 'maxLight')
            .addSelect('AVG(reading.light)', 'avgLight')
            .where('reading.deviceId = :deviceId', { deviceId })
            .andWhere('reading.timestamp BETWEEN :startOfDay AND :endOfDay', {
            startOfDay,
            endOfDay,
        })
            .getRawOne();
        return {
            minTemperature: parseFloat(result?.minTemperature) || 0,
            maxTemperature: parseFloat(result?.maxTemperature) || 0,
            avgTemperature: parseFloat(result?.avgTemperature) || 0,
            minMoisture: parseFloat(result?.minMoisture) || 0,
            maxMoisture: parseFloat(result?.maxMoisture) || 0,
            avgMoisture: parseFloat(result?.avgMoisture) || 0,
            minLight: parseFloat(result?.minLight) || 0,
            maxLight: parseFloat(result?.maxLight) || 0,
            avgLight: parseFloat(result?.avgLight) || 0,
        };
    }
    applyCalibration(data, calibration) {
        if (!calibration)
            return data;
        return {
            ...data,
            temperature: data.temperature + (calibration.temperatureOffset ?? 0),
            moisture: data.moisture + (calibration.moistureOffset ?? 0),
            light: data.light + (calibration.lightOffset ?? 0),
        };
    }
    async checkSuddenChanges(deviceId, currentReading) {
        try {
            const previousReading = await this.readingRepository
                .createQueryBuilder('reading')
                .where('reading.deviceId = :deviceId', { deviceId })
                .andWhere('reading.timestamp < :currentTs', { currentTs: currentReading.timestamp })
                .orderBy('reading.timestamp', 'DESC')
                .getOne();
            if (!previousReading)
                return;
            const tempChange = Math.abs(currentReading.temperature - previousReading.temperature);
            if (tempChange >= this.suddenChangeThresholds.temperature) {
                await this.verificationService.createVerification(deviceId, currentReading.id, 'temperature_change', tempChange);
            }
            const moistureChange = Math.abs(currentReading.moisture - previousReading.moisture);
            if (moistureChange >= this.suddenChangeThresholds.moisture) {
                await this.verificationService.createVerification(deviceId, currentReading.id, 'moisture_change', moistureChange);
            }
            const lightChange = Math.abs(currentReading.light - previousReading.light);
            if (lightChange >= this.suddenChangeThresholds.light) {
                await this.verificationService.createVerification(deviceId, currentReading.id, 'light_change', lightChange);
            }
        }
        catch (err) {
            this.logger.warn(`checkSuddenChanges failed for device ${deviceId}: ${err}`);
        }
    }
    async checkPlantThresholds(deviceId, userId, reading) {
        try {
            const selection = await this.userPlantSelectionsService.getCurrentlyMonitored(userId, deviceId);
            console.log('selection :', selection);
            if (!selection)
                return;
            const thresholds = selection.package?.thresholds ?? selection.plantSpecies?.thresholds ?? null;
            if (!thresholds)
                return;
            const messages = [];
            if (thresholds.temperature) {
                console.log('threshold compare:');
                console.log(reading.temperature);
                console.log(thresholds.temperature);
                if (reading.temperature < thresholds.temperature.min) {
                    messages.push(`Temperature too low: ${reading.temperature}°C ` +
                        `(min ${thresholds.temperature.min}°C)`);
                }
                else if (reading.temperature > thresholds.temperature.max) {
                    messages.push(`Temperature too high: ${reading.temperature}°C ` +
                        `(max ${thresholds.temperature.max}°C)`);
                }
            }
            if (thresholds.moisture) {
                if (reading.moisture < thresholds.moisture.min) {
                    messages.push(`Soil moisture too low: ${reading.moisture}% ` + `(min ${thresholds.moisture.min}%)`);
                }
                else if (reading.moisture > thresholds.moisture.max) {
                    messages.push(`Soil moisture too high: ${reading.moisture}% ` + `(max ${thresholds.moisture.max}%)`);
                }
            }
            if (thresholds.light) {
                if (reading.light < thresholds.light.min) {
                    messages.push(`Light level too low: ${reading.light} lux ` + `(min ${thresholds.light.min} lux)`);
                }
                else if (reading.light > thresholds.light.max) {
                    messages.push(`Light level too high: ${reading.light} lux ` + `(max ${thresholds.light.max} lux)`);
                }
            }
            if (messages.length > 0 && selection.user?.email) {
                await this.notificationsService.sendThresholdAlert(selection.user.email, selection.user.fullName ?? selection.user.email, messages);
            }
            console.log('message : ', messages);
        }
        catch (err) {
            this.logger.warn(`checkPlantThresholds failed for device ${deviceId} / user ${userId}: ${err}`);
        }
    }
    getDateTruncExpression(interval) {
        const field = interval === chart_query_dto_1.ChartInterval.HOURLY ? 'hour' : 'day';
        return `DATE_TRUNC('${field}', reading.timestamp) as time_bucket`;
    }
    async verifyDeviceOwnership(deviceId, userId) {
        const device = await this.devicesService.findDeviceByDeviceId(deviceId);
        if (!device) {
            throw new common_1.NotFoundException(`Device with ID ${deviceId} not found`);
        }
        if (device.userId !== userId) {
            throw new common_1.ForbiddenException('You do not have access to this device');
        }
    }
    async getChartData(deviceId, userId, range, interval) {
        await this.verifyDeviceOwnership(deviceId, userId);
        const { startDate, endDate } = this.calculateDateRange(range);
        const aggregatedData = await this.aggregateReadings(deviceId, startDate, endDate, interval);
        return {
            deviceId,
            range,
            interval,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            data: aggregatedData,
        };
    }
    async aggregateReadings(deviceId, startDate, endDate, interval) {
        let truncFormat;
        switch (interval) {
            case chart_query_dto_1.ChartInterval.HOURLY:
                truncFormat = 'hour';
                break;
            case chart_query_dto_1.ChartInterval.DAILY:
                truncFormat = 'day';
                break;
            case chart_query_dto_1.ChartInterval.WEEKLY:
                truncFormat = 'week';
                break;
        }
        const results = await this.readingRepository
            .createQueryBuilder('reading')
            .select(`DATE_TRUNC('${truncFormat}', reading.timestamp)`, 'timestamp')
            .addSelect('MIN(reading.temperature)', 'temp_min')
            .addSelect('MAX(reading.temperature)', 'temp_max')
            .addSelect('AVG(reading.temperature)', 'temp_avg')
            .addSelect('MIN(reading.humidity)', 'humidity_min')
            .addSelect('MAX(reading.humidity)', 'humidity_max')
            .addSelect('AVG(reading.humidity)', 'humidity_avg')
            .addSelect('MIN(reading.moisture)', 'soil_min')
            .addSelect('MAX(reading.moisture)', 'soil_max')
            .addSelect('AVG(reading.moisture)', 'soil_avg')
            .where('reading.deviceId = :deviceId', { deviceId })
            .andWhere('reading.timestamp BETWEEN :startDate AND :endDate', {
            startDate,
            endDate,
        })
            .groupBy(`DATE_TRUNC('${truncFormat}', reading.timestamp)`)
            .orderBy('timestamp', 'ASC')
            .getRawMany();
        return results.map((row) => ({
            timestamp: row.timestamp,
            temperature: {
                min: parseFloat(row.temp_min),
                max: parseFloat(row.temp_max),
                avg: parseFloat(row.temp_avg),
            },
            humidity: {
                min: parseFloat(row.humidity_min),
                max: parseFloat(row.humidity_max),
                avg: parseFloat(row.humidity_avg),
            },
            soilMoisture: {
                min: parseFloat(row.soil_min),
                max: parseFloat(row.soil_max),
                avg: parseFloat(row.soil_avg),
            },
        }));
    }
    calculateDateRange(range) {
        const endDate = new Date();
        const startDate = new Date();
        switch (range) {
            case chart_query_dto_1.ChartRange.SEVEN_DAYS:
                startDate.setDate(endDate.getDate() - 7);
                break;
            case chart_query_dto_1.ChartRange.THIRTY_DAYS:
                startDate.setDate(endDate.getDate() - 30);
                break;
            case chart_query_dto_1.ChartRange.NINETY_DAYS:
                startDate.setDate(endDate.getDate() - 90);
                break;
        }
        return { startDate, endDate };
    }
    async getFirstReading(deviceId) {
        return this.readingRepository.findOne({
            where: { deviceId },
            order: { timestamp: 'ASC' },
            relations: ['device'],
        });
    }
    async getReadingsForDevice(deviceId, days = 7) {
        console.log('getReadingsForDevice');
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);
        return this.readingRepository.find({
            where: {
                deviceId,
                timestamp: (0, typeorm_2.MoreThanOrEqual)(startDate),
            },
            order: {
                timestamp: 'DESC',
            },
        });
    }
};
exports.SensorReadingsService = SensorReadingsService;
exports.SensorReadingsService = SensorReadingsService = SensorReadingsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sensor_reading_entity_1.SensorReading)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, devices_service_1.DevicesService,
        sensor_verification_service_1.SensorVerificationService,
        user_plant_selections_service_1.UserPlantSelectionsService,
        notifications_service_1.NotificationsService, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], SensorReadingsService);
//# sourceMappingURL=sensor-readings.service.js.map