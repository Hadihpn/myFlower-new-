import { NotificationType, NotificationSeverity } from '../entities/notification.entity';
export declare class NotificationResponseDto {
    id: string;
    userId: number;
    deviceId: string | null;
    type: NotificationType;
    message: string;
    severity: NotificationSeverity;
    isRead: boolean;
    readAt: Date | null;
    createdAt: Date;
}
