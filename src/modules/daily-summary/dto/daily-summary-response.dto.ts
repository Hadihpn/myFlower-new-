import { ApiProperty } from '@nestjs/swagger';

export class DailySummaryResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  deviceId: number;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  minTemperature: number;

  @ApiProperty()
  maxTemperature: number;

  @ApiProperty()
  avgTemperature: number;

  @ApiProperty()
  minMoisture: number;

  @ApiProperty()
  maxMoisture: number;

  @ApiProperty()
  avgMoisture: number;

  @ApiProperty()
  minLight: number;

  @ApiProperty()
  maxLight: number;

  @ApiProperty()
  avgLight: number;

  @ApiProperty()
  readingCount: number;

  @ApiProperty()
  createdAt: Date;
}
