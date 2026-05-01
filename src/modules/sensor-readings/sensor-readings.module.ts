// sensor-readings.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorReadingsService } from './sensor-readings.service';
import { SensorReadingsController } from './sensor-readings.controller';
import { SensorReading } from './entities/sensor-reading.entity';
import { DeviceSensorStats } from './entities/device-sensor-stats.entity';
import { DevicesModule } from '@modules/devices/devices.module';
import { SensorVerificationModule } from '@modules/sensor-verification/sensor-verification.module';
import { UserPlantSelectionsModule } from '@modules/user-plant-selections/user-plant-selections.module';
import { NotificationsModule } from '@modules/notifications/notifications.module';
import { Device } from '@modules/devices/entities/device.entity';
import { DeviceAuthGuard } from '@common/guards/device-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([SensorReading, DeviceSensorStats, Device]), // Device اضافه شد
    DevicesModule,
    SensorVerificationModule,
    UserPlantSelectionsModule,
    NotificationsModule,
  ],
  controllers: [SensorReadingsController],
  providers: [SensorReadingsService, DeviceAuthGuard], // Guard اضافه شد
  exports: [SensorReadingsService],
})
export class SensorReadingsModule {}
