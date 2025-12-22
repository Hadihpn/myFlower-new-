import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { DailySummaryService } from './daily-summary.service';
import { DailySummary } from './entities/daily-summary.entity';
import { SensorReadingsModule } from '@modules/sensor-readings/sensor-readings.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DailySummary]),
    ScheduleModule.forRoot(),
    SensorReadingsModule,
  ],
  providers: [DailySummaryService],
  exports: [DailySummaryService],
})
export class DailySummaryModule {}