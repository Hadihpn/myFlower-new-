import { Module } from '@nestjs/common';
import { AdviceService } from './advice.service';
import { AdviceController } from './advice.controller';
import { SensorReadingsModule } from '@modules/sensor-readings/sensor-readings.module';
import { UserPlantSelectionsModule } from '@modules/user-plant-selections/user-plant-selections.module';
import { UserActionsModule } from '@modules/user-actions/user-actions.module';

@Module({
  imports: [SensorReadingsModule, UserPlantSelectionsModule, UserActionsModule],
  controllers: [AdviceController],
  providers: [AdviceService],
  exports: [AdviceService],
})
export class AdviceModule {}