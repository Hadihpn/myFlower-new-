import { Injectable } from '@nestjs/common';
import { CreateSensorVerificationDto } from './dto/create-sensor-verification.dto';
import { UpdateSensorVerificationDto } from './dto/update-sensor-verification.dto';

@Injectable()
export class SensorVerificationService {
  create(createSensorVerificationDto: CreateSensorVerificationDto) {
    return 'This action adds a new sensorVerification';
  }

  findAll() {
    return `This action returns all sensorVerification`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sensorVerification`;
  }

  update(id: number, updateSensorVerificationDto: UpdateSensorVerificationDto) {
    return `This action updates a #${id} sensorVerification`;
  }

  remove(id: number) {
    return `This action removes a #${id} sensorVerification`;
  }
}
