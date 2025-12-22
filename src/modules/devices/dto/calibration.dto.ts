import { IsNumber, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CalibrationDto {
  @ApiPropertyOptional({ example: 0.5 })
  @IsOptional()
  @IsNumber()
  temperatureOffset?: number;

  @ApiPropertyOptional({ example: -2.0 })
  @IsOptional()
  @IsNumber()
  moistureOffset?: number;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  lightOffset?: number;
}