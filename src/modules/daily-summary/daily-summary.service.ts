import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DailySummary } from './entities/daily-summary.entity';
import { SensorReadingsService } from '@modules/sensor-readings/sensor-readings.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class DailySummaryService {
  constructor(
    @InjectRepository(DailySummary)
    private summaryRepository: Repository<DailySummary>,
    private sensorReadingsService: SensorReadingsService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async generateDailySummaries(): Promise<void> {
    console.log('Generating daily summaries...');
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    // In production, get all active devices and generate summaries
    // This is a placeholder implementation
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