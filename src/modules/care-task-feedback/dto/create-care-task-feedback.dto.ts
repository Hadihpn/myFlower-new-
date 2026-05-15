// src/care-task-feedbacks/dto/create-care-task-feedback.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsEnum, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { FeedbackAction } from '../enums/feedbackAction.enum';


export class CreateCareTaskFeedbackDto {
  @ApiProperty({ description: 'Care task ID' })
  @IsInt()
  @Type(() => Number)
  care_task_id: number;

  @ApiProperty({ description: 'User ID who provided feedback' })
  @IsInt()
  @Type(() => Number)
  user_id: number;

  @ApiProperty({ enum: FeedbackAction, description: 'Action taken by user' })
  @IsEnum(FeedbackAction)
  action: FeedbackAction;

  @ApiPropertyOptional({ description: 'Reason for skipping (if action is skipped)' })
  @IsOptional()
  @IsString()
  reason?: string;

  @ApiPropertyOptional({ description: 'Additional user notes' })
  @IsOptional()
  @IsString()
  note?: string;
}
