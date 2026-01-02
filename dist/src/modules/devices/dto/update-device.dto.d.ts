import { DeviceStatus } from '../types/device-status.enum';
import { DeviceCalibration } from '../types/calibration.interface';
export declare class UpdateDeviceDto {
    name?: string;
    location?: string;
    status?: DeviceStatus;
    calibration?: DeviceCalibration;
}
