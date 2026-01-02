import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { SensorReading } from './entities/sensor-reading.entity';
import { CreateSensorReadingDto } from './dto/create-sensor-reading.dto';
import { SensorQueryDto } from './dto/sensor-query.dto';
import { DevicesService } from '@modules/devices/devices.service';
import { SensorVerificationService } from '@modules/sensor-verification/sensor-verification.service';
import { ConfigService } from '@nestjs/config';
import { UserPlantSelectionsService } from '../user-plant-selections/user-plant-selections.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class SensorReadingsService {
  private readonly suddenChangeThresholds: {
    temperature: number;
    moisture: number;
    light: number;
  };

  constructor(
    @InjectRepository(SensorReading)
    private readingRepository: Repository<SensorReading>,
    private devicesService: DevicesService,
    private verificationService: SensorVerificationService,
    private userPlantSelectionsService: UserPlantSelectionsService,
    private notificationsService: NotificationsService,
    private configService: ConfigService,
  ) {
    this.suddenChangeThresholds = {
      temperature: this.configService.get<number>('sensor.suddenChange.temperature'),
      moisture: this.configService.get<number>('sensor.suddenChange.moisture'),
      light: this.configService.get<number>('sensor.suddenChange.light'),
    };
  }

  async createReading(
    deviceId: string,
    createReadingDto: CreateSensorReadingDto,
  ): Promise<SensorReading> {
    // Verify device exists
    const device = await this.devicesService.findDeviceByDeviceId(deviceId);

    // Apply calibration if exists
    const calibratedData = this.applyCalibration(createReadingDto, device.calibration);

    // Create reading
    const reading = this.readingRepository.create({
      deviceId: device.id,
      temperature: calibratedData.temperature,
      moisture: calibratedData.moisture,
      light: calibratedData.light,
      humidity: calibratedData.humidity,
      timestamp: createReadingDto.timestamp ? new Date(createReadingDto.timestamp) : new Date(),
      verified: true, // Will be updated if verification needed
    });

    const savedReading = await this.readingRepository.save(reading);

    // Update device last seen
    await this.devicesService.updateLastSeen(deviceId);

    // CHECK PLANT THRESHOLDS
    await this.checkPlantThresholds(device.id, device.userId, savedReading);
    // Check for sudden changes
    await this.checkSuddenChanges(device.id, savedReading);

    return savedReading;
  }

  async getDeviceReadings(deviceId: number, queryDto: SensorQueryDto): Promise<SensorReading[]> {
    const { startDate, endDate, limit = 100 } = queryDto;

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

  async getLatestReading(deviceId: number): Promise<SensorReading | null> {
    return this.readingRepository.findOne({
      where: { deviceId },
      order: { timestamp: 'DESC' },
    });
  }

  async getAverageReadings(
    deviceId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<{
    avgTemperature: number;
    avgMoisture: number;
    avgLight: number;
    avgHumidity: number;
  }> {
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
      avgTemperature: parseFloat(result.avgTemperature) || 0,
      avgMoisture: parseFloat(result.avgMoisture) || 0,
      avgLight: parseFloat(result.avgLight) || 0,
      avgHumidity: parseFloat(result.avgHumidity) || 0,
    };
  }

  async getDailyStats(
    deviceId: number,
    date: Date,
  ): Promise<{
    minTemperature: number;
    maxTemperature: number;
    avgTemperature: number;
    minMoisture: number;
    maxMoisture: number;
    avgMoisture: number;
    minLight: number;
    maxLight: number;
    avgLight: number;
  }> {
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
      minTemperature: parseFloat(result.minTemperature) || 0,
      maxTemperature: parseFloat(result.maxTemperature) || 0,
      avgTemperature: parseFloat(result.avgTemperature) || 0,
      minMoisture: parseFloat(result.minMoisture) || 0,
      maxMoisture: parseFloat(result.maxMoisture) || 0,
      avgMoisture: parseFloat(result.avgMoisture) || 0,
      minLight: parseFloat(result.minLight) || 0,
      maxLight: parseFloat(result.maxLight) || 0,
      avgLight: parseFloat(result.avgLight) || 0,
    };
  }

  private applyCalibration(data: CreateSensorReadingDto, calibration: any): CreateSensorReadingDto {
    if (!calibration) return data;

    return {
      ...data,
      temperature: data.temperature + (calibration.temperatureOffset || 0),
      moisture: data.moisture + (calibration.moistureOffset || 0),
      light: data.light + (calibration.lightOffset || 0),
    };
  }

  private async checkSuddenChanges(
    deviceId: number,
    currentReading: SensorReading,
  ): Promise<{ hasSuddenChange: string; message?: string }> {
    const suddenChange = [];
    // Get previous reading
    const previousReading = await this.readingRepository.findOne({
      where: { deviceId },
      order: { timestamp: 'DESC' },
      // skip: 1,
    });

    if (!previousReading) {
      return; // No previous reading to compare
    }

    // Check temperature change
    const tempChange = Math.abs(currentReading.temperature - previousReading.temperature);
    if (tempChange >= this.suddenChangeThresholds.temperature) {
      await this.verificationService.createVerification(
        deviceId,
        currentReading.id,
        'temperature_change',
        tempChange,
      );
    }

    // Check moisture change
    const moistureChange = Math.abs(currentReading.moisture - previousReading.moisture);
    if (moistureChange >= this.suddenChangeThresholds.moisture) {
      await this.verificationService.createVerification(
        deviceId,
        currentReading.id,
        'moisture_change',
        moistureChange,
      );
    }

    // Check light change
    const lightChange = Math.abs(currentReading.light - previousReading.light);
    if (lightChange >= this.suddenChangeThresholds.light) {
      await this.verificationService.createVerification(
        deviceId,
        currentReading.id,
        'light_change',
        lightChange,
      );
    }
    
  }
  private async checkPlantThresholds(
    deviceId: number,
    userId: number,
    reading: SensorReading,
  ): Promise<void> {
    console.log('checkPlantThresholds :', { deviceId, userId, reading });

    const issues = [];
    // Get currently monitored plant for this device
    const currentPlant = await this.userPlantSelectionsService.getCurrentlyMonitored(
      userId,
      deviceId,
    );
    console.log('currentPlant :', currentPlant);

    if (!currentPlant) {
      return; // No plant actively monitored on this device
    }

    // Get thresholds
    const thresholds = currentPlant.package
      ? currentPlant.package.thresholds
      : currentPlant.plantSpecies.thresholds;
    console.log('thresholds :', thresholds);
    console.log('reading :', reading);
    console.log('reading cond:', reading.temperature > thresholds.temperature.max);
    // 🌡️ CHECK TEMPERATURE
    if (reading.temperature < thresholds.temperature.min) {
      issues.push(
        `🥶 temperature is ${reading.temperature}that not suit .its should be atLeast(${thresholds.temperature.min})..Please take necessary actions to warm your plant's environment. `,
      );
    } else if (reading.temperature > thresholds.temperature.max) {
      issues.push(
        ` temperature is ${reading.temperature}that not suit .its should be at most(${thresholds.temperature.max}).Please take necessary actions to cool down your plant's environment.`,
      );
      console.log(issues);
      issues.push(`Please take necessary actions to cool down your plant's environment.`);
    }

    // 💧 CHECK MOISTURE
    if (reading.moisture < thresholds.moisture.min) {
      issues.push(
        `💦 moisture is ${reading.moisture}that not suit .its should be atLeast(${thresholds.moisture.min})`,
      );
    } else if (reading.moisture > thresholds.moisture.max) {
      issues.push(
        `💦 moisture is ${reading.moisture}that not suit .its should be at Most(${thresholds.moisture.max})`,
      );
    }

    // ☀️ CHECK LIGHT
    if (reading.light > thresholds.light.max) {
      issues.push(
        `☀️ light is ${reading.light}that not suit .its should be at most(${thresholds.light.max})`,
      );
    }

    if (issues.length > 0) {
      await this.notificationsService.sendThresholdAlert(
        currentPlant.user.email,
        currentPlant.user.fullName,
        issues,
      );
    }
  }
}
