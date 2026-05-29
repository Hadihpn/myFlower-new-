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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DailySummaryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const daily_summary_entity_1 = require("./entities/daily-summary.entity");
const schedule_1 = require("@nestjs/schedule");
const sensor_reading_entity_1 = require("../sensor-readings/entities/sensor-reading.entity");
let DailySummaryService = class DailySummaryService {
    constructor(summaryRepository, sensorReadingRepository) {
        this.summaryRepository = summaryRepository;
        this.sensorReadingRepository = sensorReadingRepository;
    }
    async generateDailySummaries() {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const dateStr = yesterday.toISOString().split('T')[0];
        const devices = await this.sensorReadingRepository
            .createQueryBuilder('r')
            .select('DISTINCT r.device_id', 'deviceId')
            .where('DATE(r.timestamp) = :date', { date: dateStr })
            .getRawMany();
        if (!devices.length)
            return;
        for (const { deviceId } of devices) {
            const agg = await this.sensorReadingRepository
                .createQueryBuilder('r')
                .select('MIN(r.temperature)', 'minTemperature')
                .addSelect('MAX(r.temperature)', 'maxTemperature')
                .addSelect('AVG(r.temperature)', 'avgTemperature')
                .addSelect('MIN(r.moisture)', 'minMoisture')
                .addSelect('MAX(r.moisture)', 'maxMoisture')
                .addSelect('AVG(r.moisture)', 'avgMoisture')
                .addSelect('MIN(r.light)', 'minLight')
                .addSelect('MAX(r.light)', 'maxLight')
                .addSelect('AVG(r.light)', 'avgLight')
                .addSelect('COUNT(r.id)', 'readingCount')
                .where('r.device_id = :deviceId', { deviceId })
                .andWhere('DATE(r.timestamp) = :date', { date: dateStr })
                .getRawOne();
            if (!agg || !agg.readingCount)
                continue;
            await this.summaryRepository
                .createQueryBuilder()
                .insert()
                .into(daily_summary_entity_1.DailySummary)
                .values({
                deviceId,
                date: new Date(dateStr),
                minTemperature: parseFloat(agg.minTemperature),
                maxTemperature: parseFloat(agg.maxTemperature),
                avgTemperature: parseFloat(agg.avgTemperature),
                minMoisture: parseFloat(agg.minMoisture),
                maxMoisture: parseFloat(agg.maxMoisture),
                avgMoisture: parseFloat(agg.avgMoisture),
                minLight: parseFloat(agg.minLight),
                maxLight: parseFloat(agg.maxLight),
                avgLight: parseFloat(agg.avgLight),
                readingCount: parseInt(agg.readingCount),
            })
                .orUpdate([
                'min_temperature',
                'max_temperature',
                'avg_temperature',
                'min_moisture',
                'max_moisture',
                'avg_moisture',
                'min_light',
                'max_light',
                'avg_light',
                'reading_count',
            ], ['device_id', 'date'])
                .execute();
        }
        console.log(`Daily summaries generated for ${devices.length} devices on ${dateStr}`);
    }
    async getSummary(deviceId, date) {
        return this.summaryRepository.findOne({
            where: { deviceId, date },
        });
    }
    async getDeviceSummaries(deviceId, limit = 30) {
        return this.summaryRepository.find({
            where: { deviceId },
            order: { date: 'DESC' },
            take: limit,
        });
    }
};
exports.DailySummaryService = DailySummaryService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DailySummaryService.prototype, "generateDailySummaries", null);
exports.DailySummaryService = DailySummaryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(daily_summary_entity_1.DailySummary)),
    __param(1, (0, typeorm_1.InjectRepository)(sensor_reading_entity_1.SensorReading)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object])
], DailySummaryService);
//# sourceMappingURL=daily-summary.service.js.map