import { Repository } from 'typeorm';
import { DailySummary } from './entities/daily-summary.entity';
import { SensorReading } from '../sensor-readings/entities/sensor-reading.entity';
export declare class DailySummaryService {
    private summaryRepository;
    private sensorReadingRepository;
    constructor(summaryRepository: Repository<DailySummary>, sensorReadingRepository: Repository<SensorReading>);
    generateDailySummaries(): Promise<void>;
    getSummary(deviceId: number, date: Date): Promise<DailySummary | null>;
    getDeviceSummaries(deviceId: number, limit?: number): Promise<DailySummary[]>;
}
