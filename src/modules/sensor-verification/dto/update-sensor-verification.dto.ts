import { PartialType } from '@nestjs/mapped-types';
import { CreateSensorVerificationDto } from './create-sensor-verification.dto';

export class UpdateSensorVerificationDto extends PartialType(CreateSensorVerificationDto) {}
