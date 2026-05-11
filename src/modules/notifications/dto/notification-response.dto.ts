import { NotificationType, NotificationSeverity } from '../entities/notification.entity';

export class NotificationResponseDto {
  id: string;
  userId: number ;
  deviceId: number | null;
  type: NotificationType;
  message: string;
  severity: NotificationSeverity;
  isRead: boolean;
  readAt: Date | null;
  createdAt: Date;
}