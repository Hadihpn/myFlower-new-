import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { NotificationSettings } from './entities/notification-settings.entity';
import { DevicesService } from '../devices/devices.service';
import { UpdateNotificationSettingsDto } from './dto/update-notification-settings.dto';
export declare class NotificationsService {
    private configService;
    private devicesService;
    private settingsRepository;
    private transporter;
    constructor(configService: ConfigService, devicesService: DevicesService, settingsRepository: Repository<NotificationSettings>);
    getSettings(userId: number): Promise<NotificationSettings>;
    updateSettings(userId: number, updateDto: UpdateNotificationSettingsDto): Promise<NotificationSettings>;
    sendEmail(to: string, subject: string, html: string): Promise<void>;
    sendSuddenChangeAlert(deviceId: string, changeType: string, magnitude: number): Promise<void>;
    sendSensorAnomalyNotification(deviceId: string, messages: string[]): Promise<void>;
    sendWelcomeEmail(email: string, name: string): Promise<void>;
    sendThresholdAlert(email: string, name: string, messages: string[]): Promise<void>;
}
