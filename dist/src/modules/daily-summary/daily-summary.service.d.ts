import { Repository } from 'typeorm';
import { DailySummary } from './entities/daily-summary.entity';
import { SensorReadingsService } from '@modules/sensor-readings/sensor-readings.service';
export declare class DailySummaryService {
    private summaryRepository;
    private sensorReadingsService;
    constructor(summaryRepository: Repository<DailySummary>, sensorReadingsService: SensorReadingsService);
    generateDailySummaries(): Promise<void>;
    getSummary(deviceId: number, date: Date): Promise<DailySummary | null>;
    getDeviceSummaries(deviceId: number, limit?: number): Promise<DailySummary[]>;
}
