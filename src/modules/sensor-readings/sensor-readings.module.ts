import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorReadingsService } from './sensor-readings.service';
import { SensorReadingsController } from './sensor-readings.controller';
import { SensorReading } from './entities/sensor-reading.entity';
import { DevicesModule } from '@modules/devices/devices.module';
import { SensorVerificationModule } from '@modules/sensor-verification/sensor-verification.module';
import { SubscriptionModule } from '@modules/subscription/subscription.module';
import { PlantsModule } from '@modules/plants/plants.module';
import { Device } from '../devices/entities/device.entity';
import { NotificationsService } from '../notifications/notifications.service';
import { UserPlantSelectionsService } from '../user-plant-selections/user-plant-selections.service';
import { UserPlantSelection } from '../user-plant-selections/entities/user-plant-selection.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SensorReading,Device,UserPlantSelection]),
    DevicesModule,
    forwardRef(() => SensorVerificationModule),
    SubscriptionModule,
    PlantsModule,
  ],
  controllers: [SensorReadingsController],
  providers: [SensorReadingsService,NotificationsService,UserPlantSelectionsService],
  exports: [SensorReadingsService],
})
export class SensorReadingsModule {}
