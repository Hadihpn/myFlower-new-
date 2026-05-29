import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CareTaskFeedbackController } from './care-task-feedback.controller';
import { CareTaskFeedbackService } from './care-task-feedback.service';
import { CareTaskFeedback } from './entities/care-task-feedback.entity';
import { CareTask } from '../care-task/entities/care-task.entity';
import { CareTaskService } from '../care-task/care-task.services';

@Module({
  imports: [
    TypeOrmModule.forFeature([CareTaskFeedback,CareTask]),
  ],
  controllers: [CareTaskFeedbackController],
  providers: [CareTaskFeedbackService,CareTaskService],
  exports: [CareTaskFeedbackService],
})
export class CareTaskFeedbackModule {}
