import { ApiProperty } from '@nestjs/swagger';

export class SensorReadingResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  deviceId: number;

  @ApiProperty()
  temperature: number;

  @ApiProperty()
  moisture: number;

  @ApiProperty()
  light: number;

  @ApiProperty()
  humidity: number;

  @ApiProperty()
  timestamp: Date;

  @ApiProperty()
  verified: boolean;

  @ApiProperty()
  anomaly: boolean;

  @ApiProperty()
  createdAt: Date;
}