import { Device } from '@modules/devices/entities/device.entity';
export declare class SensorReading {
    id: number;
    deviceId: string;
    temperature: number;
    moisture: number;
    light: number;
    humidity: number;
    timestamp: Date;
    verified: boolean;
    anomaly: boolean;
    createdAt: Date;
    device: Device;
}
