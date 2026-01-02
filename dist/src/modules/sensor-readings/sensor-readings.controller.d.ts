import { SensorReadingsService } from './sensor-readings.service';
import { CreateSensorReadingDto } from './dto/create-sensor-reading.dto';
import { SensorQueryDto } from './dto/sensor-query.dto';
export declare class SensorReadingsController {
    private readonly sensorReadingsService;
    constructor(sensorReadingsService: SensorReadingsService);
    createReading(deviceId: string, createReadingDto: CreateSensorReadingDto): Promise<import("./entities/sensor-reading.entity").SensorReading>;
    getDeviceReadings(deviceId: number, queryDto: SensorQueryDto): Promise<import("./entities/sensor-reading.entity").SensorReading[]>;
    getLatestReading(deviceId: number): Promise<import("./entities/sensor-reading.entity").SensorReading>;
    getDailyStats(deviceId: number, date: string): Promise<{
        minTemperature: number;
        maxTemperature: number;
        avgTemperature: number;
        minMoisture: number;
        maxMoisture: number;
        avgMoisture: number;
        minLight: number;
        maxLight: number;
        avgLight: number;
    }>;
}
