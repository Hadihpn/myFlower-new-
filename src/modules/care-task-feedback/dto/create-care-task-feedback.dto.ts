// dto/create-task-feedback.dto.ts
import { IsEnum, IsString, IsOptional, IsInt } from 'class-validator';
import { FeedbackAction } from '../enums/feedbackAction.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskFeedbackDto {
  @IsInt()
  @ApiProperty({ description: 'ID of the care task', example: 1 })
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
