import { Repository } from 'typeorm';
import { SensorVerification } from './entities/sensor-verification.entity';
import { ConfigService } from '@nestjs/config';
import { NotificationsService } from '@modules/notifications/notifications.service';
export declare class SensorVerificationService {
    private verificationRepository;
    private configService;
    private notificationsService;
    private readonly verificationTimeoutMinutes;
    constructor(verificationRepository: Repository<SensorVerification>, configService: ConfigService, notificationsService: NotificationsService);
    createVerification(deviceId: number, triggerReadingId: number, changeType: string, changeMagnitude: number): Promise<SensorVerification>;
    addVerificationReading(deviceId: number, reading: any): Promise<void>;
    private completeVerification;
    private analyzeReadings;
    getPendingVerifications(deviceId: number): Promise<SensorVerification[]>;
    expireOldVerifications(): Promise<void>;
    getDeviceVerificationHistory(deviceId: number): Promise<SensorVerification[]>;
}
