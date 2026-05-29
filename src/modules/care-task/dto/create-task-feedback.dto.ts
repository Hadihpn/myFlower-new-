// dto/create-task-feedback.dto.ts
import { FeedbackAction } from '@/modules/care-task-feedback/enums/feedbackAction.enum';
import { IsEnum, IsString } from 'class-validator';

export class CreateTaskFeedbackDto {
  @IsEnum(FeedbackAction)
  action: FeedbackAction;

  @IsString()
  reason: string;
}
