import { Module } from '@nestjs/common';
import { UsersModule } from '@modules/users/users.module'; // اگر برای پروفایل لازم است
import { WebController } from './web.controller';
import { UserPlantSelectionsModule } from '../user-plant-selections/user-plant-selections.module';
import { CarePlanModule } from '../care-plan/care-plan.module';
import { SensorReadingsModule } from '../sensor-readings/sensor-readings.module';
import { DevicesModule } from '../devices/devices.module';
import { WebService } from './web.service';

@Module({
 imports: [DevicesModule, UserPlantSelectionsModule, CarePlanModule, SensorReadingsModule],
  controllers: [WebController],
  providers: [WebService],
})
export class WebModule {}
