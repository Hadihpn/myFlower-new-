// dto/create-task-feedback.dto.ts
import { IsEnum, IsString, IsOptional, IsNumber } from 'class-validator';
import { FeedbackAction } from '../enums/feedbackAction.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskFeedbackDto {
  @ApiProperty({ description: 'ID of the care task', example: 1 })
  @IsNumber()
  careTaskId: number;

  @ApiProperty({ enum: FeedbackAction, description: 'Action taken on the task' })
  @IsEnum(FeedbackAction)
  action: FeedbackAction;

  @ApiProperty({ description: 'Reason for the feedback', example: 'Plant was already watered' })
  @IsString()
  reason: string;

  @ApiPropertyOptional({ description: 'Optional additional note', example: 'Will water tomorrow' })
  @IsOptional()
  @IsString()
  note?: string;
}
