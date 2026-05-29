import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarePlanController } from './care-plan.controller';
import { CarePlan } from './entities/care-plan.entity';
import { UserPlantSelection } from '../user-plant-selections/entities/user-plant-selection.entity';
import { SensorReadingsModule } from '../sensor-readings/sensor-readings.module';
import { AiModule } from '../ai/ai.module';
import { CareTask } from '../care-task/entities/care-task.entity';
import { CareTaskFeedback } from '../care-task-feedback/entities/care-task-feedback.entity';
import { CareTaskController } from '../care-task/care-task.controller';
import { CareTaskFeedbackController } from '../care-task-feedback/care-task-feedback.controller';
import { CarePlanService } from './care-plan.services';
import { CareTaskService } from '../care-task/care-task.services';
import { CareTaskFeedbackService } from '../care-task-feedback/care-task-feedback.service';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationsModule } from '../notifications/notifications.module';
import { Notification } from '../notifications/entities/notification.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CarePlan,
      CareTask,
      CareTaskFeedback,
      UserPlantSelection,
      Notification
    ]),
     NotificationsModule,
    SensorReadingsModule,
    AiModule,
  ],
  controllers: [
    CarePlanController,
    CareTaskController,
    CareTaskFeedbackController,
  ],
  providers: [
    CarePlanService,
    CareTaskService,
    CareTaskFeedbackService,
  ],
  exports: [
    CarePlanService,
    CareTaskService,
    CareTaskFeedbackService,
  ],
})
export class CarePlanModule {}
