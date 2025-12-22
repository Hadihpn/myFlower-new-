import { Module } from '@nestjs/common';
import { SensorVerificationService } from './sensor-verification.service';
import { SensorVerificationController } from './sensor-verification.controller';

@Module({
  controllers: [SensorVerificationController],
  providers: [SensorVerificationService],
})
export class SensorVerificationModule {}
