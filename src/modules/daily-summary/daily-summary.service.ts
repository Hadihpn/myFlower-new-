import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DailySummary } from './entities/daily-summary.entity';
import { SensorReadingsService } from '@modules/sensor-readings/sensor-readings.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SensorReading } from '../sensor-readings/entities/sensor-reading.entity';

@Injectable()
export class DailySummaryService {
  constructor(
    @InjectRepository(DailySummary)
    private summaryRepository: Repository<DailySummary>,
    @InjectRepository(SensorReading)
    private sensorReadingRepository: Repository<SensorReading>,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async generateDailySummaries(): Promise<void> {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const dateStr = yesterday.toISOString().split('T')[0]; // 'YYYY-MM-DD'

    // get all distinct deviceIds that have readings yesterday
    const devices = await this.sensorReadingRepository
      .createQueryBuilder('r')
      .select('DISTINCT r.device_id', 'deviceId')
      .where('DATE(r.timestamp) = :date', { date: dateStr })
      .getRawMany<{ deviceId: number }>();

    if (!devices.length) return;

    for (const { deviceId } of devices) {
      // aggregate in one query
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

      if (!agg || !agg.readingCount) continue;

      // upsert: اگر قبلاً ثبت شده (مثلاً cron دوبار اجرا شد) آپدیت کن
      await this.summaryRepository
        .createQueryBuilder()
        .insert()
        .into(DailySummary)
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
        .orUpdate(
          [
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
          ],
          ['device_id', 'date'],
        )
        .execute();
    }

    console.log(`Daily summaries generated for ${devices.length} devices on ${dateStr}`);
  }

  async getSummary(deviceId: number, date: Date): Promise<DailySummary | null> {
    return this.summaryRepository.findOne({
      where: { deviceId, date },
    });
  }

  async getDeviceSummaries(deviceId: number, limit: number = 30): Promise<DailySummary[]> {
    return this.summaryRepository.find({
      where: { deviceId },
      order: { date: 'DESC' },
      take: limit,
    });
  }
}
