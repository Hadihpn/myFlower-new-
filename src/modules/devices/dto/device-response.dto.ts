import { ApiProperty } from '@nestjs/swagger';
import { DeviceStatus } from '../types/device-status.enum';
import { DeviceCalibration } from '../types/calibration.interface';

export class DeviceResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  deviceId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  location: string;

  @ApiProperty({ enum: DeviceStatus })
  status: DeviceStatus;

  @ApiProperty()
  lastSeen: Date;

  @ApiProperty()
  calibration: DeviceCalibration;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class DeviceRegistrationResponseDto extends DeviceResponseDto {
  @ApiProperty({ description: 'Device token (store securely!)' })
  token: string;
}