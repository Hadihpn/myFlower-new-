import { User } from '@/modules/users/entities/user.entity';
export declare class NotificationSettings {
    id: number;
    userId: number;
    user: User;
    emailEnabled: boolean;
    suddenChangeAlerts: boolean;
    thresholdAlerts: boolean;
    welcomeEmails: boolean;
    createdAt: Date;
    updatedAt: Date;
}
