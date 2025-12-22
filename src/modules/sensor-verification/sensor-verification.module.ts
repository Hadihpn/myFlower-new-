import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorVerificationService } from './sensor-verification.service';
import { SensorVerification } from './entities/sensor-verification.entity';
import { NotificationsModule } from '@modules/notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SensorVerification]),
    forwardRef(() => NotificationsModule),
  ],
  providers: [SensorVerificationService],
  exports: [SensorVerificationService],
})
export class SensorVerificationModule {}
