import { NotificationType, NotificationSeverity } from '../entities/notification.entity';
export declare class CreateNotificationDto {
    userId: number;
    deviceId?: number;
    type: NotificationType;
    message: string;
    severity: NotificationSeverity;
}
