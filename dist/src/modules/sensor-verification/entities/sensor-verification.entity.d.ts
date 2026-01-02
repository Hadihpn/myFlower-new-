import { Device } from '@modules/devices/entities/device.entity';
import { SensorReading } from '@modules/sensor-readings/entities/sensor-reading.entity';
import { VerificationStatus } from '../types/verification-status.enum';
import { ChangeType } from '../types/change-type.enum';
import { Confidence } from '../types/confidence.enum';
export declare class SensorVerification {
    id: number;
    deviceId: number;
    triggerReadingId: number;
    status: VerificationStatus;
    changeType: ChangeType;
    changeMagnitude: number;
    verificationReadings: any[];
    confirmed: boolean;
    confidence: Confidence;
    requestedAt: Date;
    completedAt: Date;
    expiresAt: Date;
    createdAt: Date;
    device: Device;
    triggerReading: SensorReading;
}
