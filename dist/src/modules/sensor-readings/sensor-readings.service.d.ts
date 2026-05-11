import { Repository } from 'typeorm';
import { SensorReading } from './entities/sensor-reading.entity';
import { CreateSensorReadingDto } from './dto/create-sensor-reading.dto';
import { SensorQueryDto } from './dto/sensor-query.dto';
import { DevicesService } from '@modules/devices/devices.service';
import { SensorVerificationService } from '@modules/sensor-verification/sensor-verification.service';
import { ConfigService } from '@nestjs/config';
import { UserPlantSelectionsService } from '../user-plant-selections/user-plant-selections.service';
import { NotificationsService } from '../notifications/notifications.service';
import { ChartInterval, ChartRange } from './dto/chart-query.dto';
export declare class SensorReadingsService {
    private readingRepository;
    private devicesService;
    private verificationService;
    private userPlantSelectionsService;
    private notificationsService;
    private configService;
    private readonly logger;
    private readonly suddenChangeThresholds;
    constructor(readingRepository: Repository<SensorReading>, devicesService: DevicesService, verificationService: SensorVerificationService, userPlantSelectionsService: UserPlantSelectionsService, notificationsService: NotificationsService, configService: ConfigService);
    createReading(deviceId: string, createReadingDto: CreateSensorReadingDto): Promise<SensorReading>;
    getDeviceReadings(deviceId: string, queryDto: SensorQueryDto): Promise<SensorReading[]>;
    getLatestReading(deviceId: string): Promise<SensorReading | null>;
    getAverageReadings(deviceId: number, startDate: Date, endDate: Date): Promise<{
        avgTemperature: number;
        avgMoisture: number;
        avgLight: number;
        avgHumidity: number;
    }>;
    getDailyStats(deviceId: number, date: Date): Promise<{
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
    private applyCalibration;
    private checkSuddenChanges;
    private checkPlantThresholds;
    private getDateTruncExpression;
    private verifyDeviceOwnership;
    getChartData(deviceId: string, userId: number, range: ChartRange, interval: ChartInterval): Promise<{
        deviceId: string;
        range: ChartRange;
        interval: ChartInterval;
        startDate: string;
        endDate: string;
        data: any[];
    }>;
    private aggregateReadings;
    private calculateDateRange;
    getFirstReading(deviceId: string): Promise<SensorReading | null>;
    getReadingsForDevice(deviceId: string, days?: number): Promise<SensorReading[]>;
}
