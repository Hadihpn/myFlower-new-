import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SensorReadingsService } from './sensor-readings.service';
import { SensorReadingsController } from './sensor-readings.controller';
import { SensorReading } from './entities/sensor-reading.entity';
import { DevicesModule } from '@modules/devices/devices.module';
import { SensorVerificationModule } from '@modules/sensor-verification/sensor-verification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SensorReading]),
    DevicesModule,
    forwardRef(() => SensorVerificationModule),
  ],
  controllers: [SensorReadingsController],
  providers: [SensorReadingsService],
  exports: [SensorReadingsService],
})
export class SensorReadingsModule {}
