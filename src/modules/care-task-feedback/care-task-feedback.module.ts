import { Module } from '@nestjs/common';
import { CareTaskFeedbackService } from './care-task-feedback.service';
import { CareTaskFeedbackController } from './care-task-feedback.controller';

@Module({
  controllers: [CareTaskFeedbackController],
  providers: [CareTaskFeedbackService],
})
export class CareTaskFeedbackModule {}
