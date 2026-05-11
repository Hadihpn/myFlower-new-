import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CareScheduleService } from './care-schedule.service';
import { CareScheduleController } from './care-schedule.controller';
import { CareSchedule } from './entities/care-schedules.entity';
import { SensorReadingsModule } from '../sensor-readings/sensor-readings.module';
import { DevicesModule } from '../devices/devices.module';
import { AiModule } from '../ai/ai.module'; // ✅ اضافه شد
import { UserAction } from '../user-actions/entities/user-action.entity';
import { UserPlantSelectionsModule } from '../user-plant-selections/user-plant-selections.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CareSchedule,UserAction]),
    SensorReadingsModule,
    UserPlantSelectionsModule,
    DevicesModule,
    AiModule, // ✅ اضافه شد
  ],
  controllers: [CareScheduleController],
  providers: [CareScheduleService],
  exports: [CareScheduleService],
})
export class CareScheduleModule {}
