// src/care-plans/dto/create-care-plan.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsEnum, IsDateString, IsOptional, IsString, IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { CarePlanStatus } from '../enums/carePlanStatus.enum';
import { GeneratorType } from '../enums/generatorType.enum';



export class CreateCarePlanDto {
  @ApiProperty({ description: 'User plant selection ID' })
  @IsInt()
  @Type(() => Number)
  user_plant_selection_id: number;

  @ApiPropertyOptional({ enum: CarePlanStatus, default: CarePlanStatus.ACTIVE })
  @IsOptional()
  @IsEnum(CarePlanStatus)
  status?: CarePlanStatus;

  @ApiProperty({ enum: GeneratorType, description: 'How the plan was generated' })
  @IsEnum(GeneratorType)
  generator_type: GeneratorType;

  @ApiProperty({ description: 'Plan start date (YYYY-MM-DD)' })
  @IsDateString()
  start_date: string;

  @ApiProperty({ description: 'Plan end date (YYYY-MM-DD)' })
  @IsDateString()
  end_date: string;

  @ApiPropertyOptional({ description: 'Sensor data snapshot at plan creation', type: 'object' })
  @IsOptional()
  @IsObject()
  sensor_snapshot?: Record<string, any>;

  @ApiPropertyOptional({ description: 'AI-generated recommendations text' })
  @IsOptional()
  @IsString()
  ai_recommendations?: string;
}
