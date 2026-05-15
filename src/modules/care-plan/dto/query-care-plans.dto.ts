// src/care-plans/dto/query-care-plans.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { CarePlanStatus } from '../enums/carePlanStatus.enum';

export class QueryCarePlansDto {
  @ApiPropertyOptional({ description: 'Filter by user plant selection ID' })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  user_plant_selection_id?: number;

  @ApiPropertyOptional({ enum: CarePlanStatus, description: 'Filter by status' })
  @IsOptional()
  @IsEnum(CarePlanStatus)
  status?: CarePlanStatus;

  @ApiPropertyOptional({ default: 1, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ default: 10, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;
}
