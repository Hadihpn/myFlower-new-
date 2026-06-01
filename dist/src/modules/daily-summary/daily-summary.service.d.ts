import { Repository } from 'typeorm';
import { DailySummary } from './entities/daily-summary.entity';
import { SensorReading } from '../sensor-readings/entities/sensor-reading.entity';
import { Device } from '../devices/entities/device.entity';
import { NotificationsService } from '../notifications/notifications.service';
export declare class DailySummaryService {
    private summaryRepository;
    private sensorReadingRepository;
    private deviceRepository;
    private notificationService;
    private readonly logger;
    constructor(summaryRepository: Repository<DailySummary>, sensorReadingRepository: Repository<SensorReading>, deviceRepository: Repository<Device>, notificationService: NotificationsService);
    generateDailySummaries(): Promise<void>;
    getSummary(deviceId: number, date: Date): Promise<DailySummary | null>;
    getDeviceSummaries(deviceId: number, limit?: number): Promise<DailySummary[]>;
    EVERY_DAY_AT_2AM: any;
    notifyDevicesWithoutRecentReadings(): Promise<void>;
}
