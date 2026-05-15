// src/care-tasks/dto/query-care-tasks.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsInt, IsDateString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { TaskType } from '../enums/taskType.enum';
import { TaskStatus } from '../enums/taskStatus.enum';

export class QueryCareTasksDto {
  @ApiPropertyOptional({ description: 'Filter by care plan ID' })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  care_plan_id?: number;

  @ApiPropertyOptional({ enum: TaskType, description: 'Filter by task type' })
  @IsOptional()
  @IsEnum(TaskType)
  task_type?: TaskType;

  @ApiPropertyOptional({ enum: TaskStatus, description: 'Filter by status' })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiPropertyOptional({ description: 'Filter by scheduled date (YYYY-MM-DD)' })
  @IsOptional()
  @IsDateString()
  scheduled_date?: string;

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
