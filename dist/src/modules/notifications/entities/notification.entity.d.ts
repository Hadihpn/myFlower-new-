import { User } from '../../users/entities/user.entity';
import { Device } from '../../devices/entities/device.entity';
export declare enum NotificationType {
    THRESHOLD_ALERT = "threshold_alert",
    SUDDEN_CHANGE = "sudden_change",
    DEVICE_OFFLINE = "device_offline",
    SYSTEM = "system"
}
export declare enum NotificationSeverity {
    INFO = "info",
    WARNING = "warning",
    CRITICAL = "critical"
}
export declare class Notification {
    id: string;
    userId: number;
    user: User;
    deviceId: string | null;
    device: Device | null;
    type: NotificationType;
    message: string;
    severity: NotificationSeverity;
    isRead: boolean;
    readAt: Date | null;
    createdAt: Date;
}
