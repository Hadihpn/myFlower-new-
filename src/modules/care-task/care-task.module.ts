import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CareTaskController } from './care-task.controller';
import { CareTaskService } from './care-task.services';
import { CareTask } from './entities/care-task.entity';
import { UserPlantSelection } from '../user-plant-selections/entities/user-plant-selection.entity';
import { SensorReadingsModule } from '../sensor-readings/sensor-readings.module';
import { AiModule } from '../ai/ai.module';
import { CareTaskFeedback } from '../care-task-feedback/entities/care-task-feedback.entity';
import { CarePlan } from '../care-plan/entities/care-plan.entity';
import { CareTaskFeedbackService } from '../care-task-feedback/care-task-feedback.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CareTask,
      CareTaskFeedback,
      CarePlan,
      UserPlantSelection,
    ]),
    SensorReadingsModule,
    AiModule,
  ],
  controllers: [CareTaskController],
  providers: [CareTaskService, CareTaskFeedbackService],
  exports: [CareTaskService, CareTaskFeedbackService],
})
export class CareTaskModule {}
