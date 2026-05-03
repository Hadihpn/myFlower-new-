import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { NotificationSettings } from './entities/notification-settings.entity';
import { Notification } from './entities/notification.entity';
import { DevicesService } from '../devices/devices.service';
import { UpdateNotificationSettingsDto } from './dto/update-notification-settings.dto';
import { GetNotificationsQueryDto } from './dto/get-notifications-query.dto';
import { NotificationResponseDto } from './dto/notification-response.dto';
import { CreateNotificationDto } from './dto/create-notification.dto';
export declare class NotificationsService {
    private configService;
    private devicesService;
    private settingsRepository;
    private notificationRepository;
    private transporter;
    constructor(configService: ConfigService, devicesService: DevicesService, settingsRepository: Repository<NotificationSettings>, notificationRepository: Repository<Notification>);
    getSettings(userId: number): Promise<NotificationSettings>;
    updateSettings(userId: number, updateDto: UpdateNotificationSettingsDto): Promise<NotificationSettings>;
    sendEmail(to: string, subject: string, html: string): Promise<void>;
    sendSuddenChangeAlert(deviceId: string, changeType: string, magnitude: number): Promise<void>;
    sendSensorAnomalyNotification(deviceId: string, messages: string[]): Promise<void>;
    sendWelcomeEmail(email: string, name: string): Promise<void>;
    sendThresholdAlert(email: string, name: string, messages: string[]): Promise<void>;
    createNotification(dto: CreateNotificationDto): Promise<Notification>;
    getNotifications(userId: string, query: GetNotificationsQueryDto): Promise<{
        data: NotificationResponseDto[];
        total: number;
        page: number;
        limit: number;
    }>;
    getUnreadCount(userId: number): Promise<number>;
    getUnreadNotifications(userId: number): Promise<NotificationResponseDto[]>;
    markAsRead(userId: number, notificationId: string): Promise<NotificationResponseDto>;
    markAllAsRead(userId: string): Promise<{
        affected: number;
    }>;
    deleteNotification(userId: number, notificationId: string): Promise<void>;
    private toResponseDto;
}
