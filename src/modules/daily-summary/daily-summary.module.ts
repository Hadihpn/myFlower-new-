import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { DailySummaryService } from './daily-summary.service';
import { DailySummaryController } from './daily-summary.controller'; // ADD THIS
import { DailySummary } from './entities/daily-summary.entity';
import { SensorReadingsModule } from '@modules/sensor-readings/sensor-readings.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DailySummary]),
    ScheduleModule.forRoot(),
    SensorReadingsModule,
  ],
  controllers: [DailySummaryController], // ADD THIS
  providers: [DailySummaryService],
  exports: [DailySummaryService],
})
export class DailySummaryModule {}
