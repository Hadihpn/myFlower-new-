import { DeviceStatus } from '../types/device-status.enum';
import { DeviceCalibration } from '../types/calibration.interface';
export declare class DeviceResponseDto {
    id: number;
    userId: number;
    deviceId: string;
    name: string;
    location: string;
    status: DeviceStatus;
    lastSeen: Date;
    calibration: DeviceCalibration;
    createdAt: Date;
    updatedAt: Date;
}
export declare class DeviceRegistrationResponseDto extends DeviceResponseDto {
    token: string;
}
