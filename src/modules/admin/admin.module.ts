import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { User } from '@modules/users/entities/user.entity';
import { Device } from '@modules/devices/entities/device.entity';
import { SensorReading } from '@modules/sensor-readings/entities/sensor-reading.entity';
import { UserSubscription } from '@modules/subscription/entities/user-subscription.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Device, SensorReading, UserSubscription])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
