import { Injectable, NotFoundException, Logger, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SensorReading } from './entities/sensor-reading.entity';
import { CreateSensorReadingDto } from './dto/create-sensor-reading.dto';
import { SensorQueryDto } from './dto/sensor-query.dto';
import { DevicesService } from '@modules/devices/devices.service';
import { SensorVerificationService } from '@modules/sensor-verification/sensor-verification.service';
import { ConfigService } from '@nestjs/config';
import { UserPlantSelectionsService } from '../user-plant-selections/user-plant-selections.service';
import { NotificationsService } from '../notifications/notifications.service';
import { DeviceCalibration } from '@modules/devices/types/calibration.interface';
import { ChartInterval, ChartQueryDto, ChartRange } from './dto/chart-query.dto';

@Injectable()
export class SensorReadingsService {
  private readonly logger = new Logger(SensorReadingsService.name);

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
      temperature: this.configService.get<number>('sensor.suddenChange.temperature') ?? 5,
      moisture: this.configService.get<number>('sensor.suddenChange.moisture') ?? 20,
      light: this.configService.get<number>('sensor.suddenChange.light') ?? 300,
    };
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // PUBLIC METHODS
  // ─────────────────────────────────────────────────────────────────────────────

  async createReading(
    deviceId: string,
    createReadingDto: CreateSensorReadingDto,
  ): Promise<SensorReading> {
    // Verify device exists
    const device = await this.devicesService.findDeviceByDeviceId(deviceId);
    if (!device) {
      throw new NotFoundException(`Device with identifier "${deviceId}" not found`);
    }

    // Apply calibration if present
    const calibratedData = this.applyCalibration(createReadingDto, device.calibration ?? null);

    // Persist the reading
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

    // Update device heartbeat
    await this.devicesService.updateLastSeen(deviceId);
console.log("Before threshold")    
    // Post-save checks (fire-and-forget style — errors are caught internally)
    await this.checkPlantThresholds(device.deviceId, device.userId, savedReading);
    await this.checkSuddenChanges(device.id, savedReading);

    return savedReading;
  }

  async getDeviceReadings(deviceId: string, queryDto: SensorQueryDto): Promise<SensorReading[]> {
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

  async getLatestReading(deviceId: string): Promise<SensorReading | null> {
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
      avgTemperature: parseFloat(result?.avgTemperature) || 0,
      avgMoisture: parseFloat(result?.avgMoisture) || 0,
      avgLight: parseFloat(result?.avgLight) || 0,
      avgHumidity: parseFloat(result?.avgHumidity) || 0,
    };
  }

  /**
   * Matches the controller signature:
   *   getDailyStats(deviceId: number, targetDate: Date)
   *
   * Internally derives startOfDay / endOfDay from the single `date` argument.
   */
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

  // ─────────────────────────────────────────────────────────────────────────────
  // PRIVATE HELPERS
  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * Applies device calibration offsets to raw sensor data.
   * `calibration` is typed as `any` to match the loosely-typed Device entity field.
   */
  private applyCalibration(
    data: CreateSensorReadingDto,
    calibration: DeviceCalibration | null, // ← correct type
  ): CreateSensorReadingDto {
    if (!calibration) return data;
    return {
      ...data,
      temperature: data.temperature + (calibration.temperatureOffset ?? 0), // ← direct access
      moisture: data.moisture + (calibration.moistureOffset ?? 0),
      light: data.light + (calibration.lightOffset ?? 0),
    };
  }
  /**
   * Compares successive readings and creates a verification record
   * for any sensor channel that jumped beyond its configured threshold.
   */
  private async checkSuddenChanges(deviceId: number, currentReading: SensorReading): Promise<void> {
    try {
      const previousReading = await this.readingRepository
        .createQueryBuilder('reading')
        .where('reading.deviceId = :deviceId', { deviceId })
        .andWhere('reading.timestamp < :currentTs', { currentTs: currentReading.timestamp })
        .orderBy('reading.timestamp', 'DESC')
        .getOne();

      if (!previousReading) return;

      const tempChange = Math.abs(currentReading.temperature - previousReading.temperature);
      if (tempChange >= this.suddenChangeThresholds.temperature) {
        await this.verificationService.createVerification(
          deviceId,
          currentReading.id,
          'temperature_change',
          tempChange,
        );
      }

      const moistureChange = Math.abs(currentReading.moisture - previousReading.moisture);
      if (moistureChange >= this.suddenChangeThresholds.moisture) {
        await this.verificationService.createVerification(
          deviceId,
          currentReading.id,
          'moisture_change',
          moistureChange,
        );
      }

      const lightChange = Math.abs(currentReading.light - previousReading.light);
      if (lightChange >= this.suddenChangeThresholds.light) {
        await this.verificationService.createVerification(
          deviceId,
          currentReading.id,
          'light_change',
          lightChange,
        );
      }
    } catch (err) {
      this.logger.warn(`checkSuddenChanges failed for device ${deviceId}: ${err.message}`);
    }
  }

  /**
   * Checks the latest reading against the plant thresholds configured for
   * the device's currently-monitored plant (via species or package).
   *
   * Threshold structure (PlantThresholds interface):
   *   { temperature: { min, max }, moisture: { min, max }, light: { min, max } }
   *
   * User email/name are sourced from the eagerly-loaded `selection.user` relation.
   */
  private async checkPlantThresholds(
    deviceId: string,
    userId: number,
    reading: SensorReading,
  ): Promise<void> {
    try {
      
      const selection = await this.userPlantSelectionsService.getCurrentlyMonitored(
        userId,
        deviceId,
      );
      console.log("selection :",selection)
      if (!selection) return;

      // Package thresholds take precedence over species thresholds
      const thresholds =
        selection.package?.thresholds ?? selection.plantSpecies?.thresholds ?? null;

      if (!thresholds) return;

      const messages: string[] = [];

      // ── Temperature ────────────────────────────────────────────────────────
      if (thresholds.temperature) {
        console.log("threshold compare:")
        console.log(reading.temperature)
        console.log(thresholds.temperature)
        if (reading.temperature < thresholds.temperature.min) {
          messages.push(
            `Temperature too low: ${reading.temperature}°C ` +
              `(min ${thresholds.temperature.min}°C)`,
          );
        } else if (reading.temperature > thresholds.temperature.max) {
          messages.push(
            `Temperature too high: ${reading.temperature}°C ` +
              `(max ${thresholds.temperature.max}°C)`,
          );
        }
      }

      // ── Moisture ───────────────────────────────────────────────────────────
      if (thresholds.moisture) {
        if (reading.moisture < thresholds.moisture.min) {
          messages.push(
            `Soil moisture too low: ${reading.moisture}% ` + `(min ${thresholds.moisture.min}%)`,
          );
        } else if (reading.moisture > thresholds.moisture.max) {
          messages.push(
            `Soil moisture too high: ${reading.moisture}% ` + `(max ${thresholds.moisture.max}%)`,
          );
        }
      }

      // ── Light ──────────────────────────────────────────────────────────────
      if (thresholds.light) {
        if (reading.light < thresholds.light.min) {
          messages.push(
            `Light level too low: ${reading.light} lux ` + `(min ${thresholds.light.min} lux)`,
          );
        } else if (reading.light > thresholds.light.max) {
          messages.push(
            `Light level too high: ${reading.light} lux ` + `(max ${thresholds.light.max} lux)`,
          );
        }
      }

      if (messages.length > 0 && selection.user?.email) {
        await this.notificationsService.sendThresholdAlert(
          selection.user.email,
          selection.user.fullName ?? selection.user.email,
          messages,
        );
      }
      console.log("message : ", messages)
    } catch (err) {
      // Never let alerting crash the main request se;epipeline
      this.logger.warn(
        `checkPlantThresholds failed for device ${deviceId} / user ${userId}: ${err.message}`,
      );
    }
  }

  private getDateTruncExpression(interval: ChartInterval): string {
    const field = interval === ChartInterval.HOURLY ? 'hour' : 'day';
    return `DATE_TRUNC('${field}', reading.timestamp) as time_bucket`;
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // Chart Data
  // ─────────────────────────────────────────────────────────────────────────────

  // async verifyDeviceOwnership(deviceId: string, userId: number): Promise<void> {
  //   const device = await this.devicesService.findDeviceByDeviceId(deviceId);

  //   if (!device) {
  //     throw new NotFoundException(`Device with ID ${deviceId} not found`);
  //   }

  //   if (device.userId !== userId) {
  //     throw new ForbiddenException('You do not have access to this device');
  //   }
  // }
  private async verifyDeviceOwnership(deviceId: string, userId: number): Promise<void> {
    const device = await this.devicesService.findDeviceByDeviceId(deviceId);

    if (!device) {
      throw new NotFoundException(`Device with ID ${deviceId} not found`);
    }
    if (device.userId !== userId) {
      throw new ForbiddenException('You do not have access to this device');
    }
  }
  async getChartData(deviceId: string, userId: number, range: ChartRange, interval: ChartInterval) {
    // Verify device ownership
    await this.verifyDeviceOwnership(deviceId, userId);

    // Calculate date range
    const { startDate, endDate } = this.calculateDateRange(range);

    // Aggregate readings
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
  private async aggregateReadings(
  deviceId: string,
  startDate: Date,
  endDate: Date,
  interval: ChartInterval,
): Promise<any[]> {
  let truncFormat: string;

  switch (interval) {
    case ChartInterval.HOURLY:
      truncFormat = 'hour';
      break;
    case ChartInterval.DAILY:
      truncFormat = 'day';
      break;
    case ChartInterval.WEEKLY:
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
  private calculateDateRange(range: ChartRange): {
    startDate: Date;
    endDate: Date;
  } {
    const endDate = new Date();
    const startDate = new Date();

    switch (range) {
      case ChartRange.SEVEN_DAYS:
        startDate.setDate(endDate.getDate() - 7);
        break;
      case ChartRange.THIRTY_DAYS:
        startDate.setDate(endDate.getDate() - 30);
        break;
      case ChartRange.NINETY_DAYS:
        startDate.setDate(endDate.getDate() - 90);
        break;
    }

    return { startDate, endDate };
  }
}
