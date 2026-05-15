// src/care-tasks/dto/create-care-task.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsEnum, IsDateString, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { TaskType } from '../enums/taskType.enum';
import { TaskStatus } from '../enums/taskStatus.enum';
import { OptimalTime } from '../enums/optimalType.enum';


export class CreateCareTaskDto {
  @ApiProperty({ description: 'Care plan ID' })
  @IsInt()
  @Type(() => Number)
  care_plan_id: number;

  @ApiProperty({ enum: TaskType, description: 'Type of care task' })
  @IsEnum(TaskType)
  task_type: TaskType;

  @ApiProperty({ description: 'Scheduled date (YYYY-MM-DD)' })
  @IsDateString()
  scheduled_date: string;

  @ApiPropertyOptional({ enum: OptimalTime, description: 'Best time of day to perform task' })
  @IsOptional()
  @IsEnum(OptimalTime)
  optimal_time?: OptimalTime;

  @ApiPropertyOptional({ enum: TaskStatus, default: TaskStatus.PENDING })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiProperty({ description: 'Task instructions for user' })
  @IsString()
  instructions: string;

  @ApiPropertyOptional({ description: 'Recommended product type from shop' })
  @IsOptional()
  @IsString()
  shop_product_type?: string;
}
