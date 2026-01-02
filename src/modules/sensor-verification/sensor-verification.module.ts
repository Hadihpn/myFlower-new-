import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorVerificationService } from './sensor-verification.service';
import { SensorVerificationController } from './sensor-verification.controller'; // ADD THIS
import { SensorVerification } from './entities/sensor-verification.entity';
import { NotificationsModule } from '@modules/notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SensorVerification]),
    forwardRef(() => NotificationsModule),
  ],
  controllers: [SensorVerificationController], // ADD THIS
  providers: [SensorVerificationService],
  exports: [SensorVerificationService],
})
export class SensorVerificationModule {}
