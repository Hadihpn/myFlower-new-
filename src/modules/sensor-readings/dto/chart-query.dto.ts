import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export enum ChartRange {
  SEVEN_DAYS = '7d',
  THIRTY_DAYS = '30d',
  NINETY_DAYS = '90d',
}

export enum ChartInterval {
  HOURLY = 'hourly',
  DAILY = 'daily',
  WEEKLY = 'weekly',
}

export class ChartQueryDto {
  @ApiProperty({
    enum: ChartRange,
    default: ChartRange.SEVEN_DAYS,
    description: 'Time range for chart data',
    required: false,
  })
  @IsEnum(ChartRange)
  @IsOptional()
  range?: ChartRange = ChartRange.SEVEN_DAYS;

  @ApiProperty({
    enum: ChartInterval,
    default: ChartInterval.DAILY,
    description: 'Data aggregation interval',
    required: false,
  })
  @IsEnum(ChartInterval)
  @IsOptional()
  interval?: ChartInterval = ChartInterval.DAILY;
}
