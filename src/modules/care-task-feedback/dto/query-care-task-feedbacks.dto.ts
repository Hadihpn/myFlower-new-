// src/care-task-feedbacks/dto/query-care-task-feedbacks.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { FeedbackAction } from '../enums/feedbackAction.enum';

export class QueryCareTaskFeedbacksDto {
  @ApiPropertyOptional({ description: 'Filter by care task ID' })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  care_task_id?: number;

  @ApiPropertyOptional({ description: 'Filter by user ID' })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  user_id?: number;

  @ApiPropertyOptional({ enum: FeedbackAction, description: 'Filter by action' })
  @IsOptional()
  @IsEnum(FeedbackAction)
  action?: FeedbackAction;

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
