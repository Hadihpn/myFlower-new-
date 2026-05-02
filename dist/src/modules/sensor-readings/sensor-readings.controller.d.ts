import { SensorReadingsService } from './sensor-readings.service';
import { CreateSensorReadingDto } from './dto/create-sensor-reading.dto';
import { SensorQueryDto } from './dto/sensor-query.dto';
import { ChartInterval, ChartQueryDto, ChartRange } from './dto/chart-query.dto';
export declare class SensorReadingsController {
    private readonly sensorReadingsService;
    constructor(sensorReadingsService: SensorReadingsService);
    createReading(deviceId: string, createReadingDto: CreateSensorReadingDto): Promise<import("./entities/sensor-reading.entity").SensorReading>;
    getDeviceReadings(deviceId: string, queryDto: SensorQueryDto): Promise<import("./entities/sensor-reading.entity").SensorReading[]>;
    getLatestReading(deviceId: string): Promise<import("./entities/sensor-reading.entity").SensorReading>;
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
    getChartData(deviceId: string, query: ChartQueryDto, req: any): Promise<{
        deviceId: string;
        range: ChartRange;
        interval: ChartInterval;
        startDate: string;
        endDate: string;
        data: {
            timestamp: any;
            temperature: number;
            humidity: number;
            soilMoisture: number;
            lightLevel: number;
            readingsCount: number;
        }[];
    }>;
}
