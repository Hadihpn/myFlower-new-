import {
  IsString,
  IsOptional,
  IsEnum,
  IsObject,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { DeviceStatus } from '../types/device-status.enum';
import { DeviceCalibration } from '../types/calibration.interface';

export class UpdateDeviceDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({ enum: DeviceStatus })
  @IsOptional()
  @IsEnum(DeviceStatus)
  status?: DeviceStatus;

  @ApiPropertyOptional({
    example: {
      temperatureOffset: 0.5,
      moistureOffset: -2.0,
      lightOffset: 0,
    },
  })
  @IsOptional()
  @IsObject()
  calibration?: DeviceCalibration;
}