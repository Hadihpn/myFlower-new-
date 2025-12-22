import { IsNumber, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSensorReadingDto {
  @ApiProperty({ example: 24.5 })
  @IsNumber()
  @IsNotEmpty()
  temperature: number;

  @ApiProperty({ example: 65.3 })
  @IsNumber()
  @IsNotEmpty()
  moisture: number;

  @ApiProperty({ example: 28000 })
  @IsNumber()
  @IsNotEmpty()
  light: number;

  @ApiPropertyOptional({ example: 55.0 })
  @IsOptional()
  @IsNumber()
  humidity?: number;

  @ApiPropertyOptional({ example: '2024-12-20T10:00:00Z' })
  @IsOptional()
  @IsDateString()
  timestamp?: string;
}
