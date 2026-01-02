export declare class SensorReadingResponseDto {
    id: number;
    deviceId: number;
    temperature: number;
    moisture: number;
    light: number;
    humidity: number;
    timestamp: Date;
    verified: boolean;
    anomaly: boolean;
    createdAt: Date;
}
