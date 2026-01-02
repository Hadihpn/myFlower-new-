import { User } from '@modules/users/entities/user.entity';
import { DeviceStatus } from '../types/device-status.enum';
import { DeviceCalibration } from '../types/calibration.interface';
import { SensorReading } from '@modules/sensor-readings/entities/sensor-reading.entity';
import { UserPlantSelection } from '@modules/user-plant-selections/entities/user-plant-selection.entity';
import { UserAction } from '@modules/user-actions/entities/user-action.entity';
export declare class Device {
    id: number;
    userId: number;
    deviceId: string;
    name: string;
    location: string;
    status: DeviceStatus;
    tokenHash: string;
    lastSeen: Date;
    calibration: DeviceCalibration;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    sensorReadings: SensorReading[];
    plantSelections: UserPlantSelection[];
    actions: UserAction[];
}
