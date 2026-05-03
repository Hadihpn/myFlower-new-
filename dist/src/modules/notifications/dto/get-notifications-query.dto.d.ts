import { NotificationType, NotificationSeverity } from '../entities/notification.entity';
export declare class GetNotificationsQueryDto {
    page?: number;
    limit?: number;
    type?: NotificationType;
    severity?: NotificationSeverity;
}
