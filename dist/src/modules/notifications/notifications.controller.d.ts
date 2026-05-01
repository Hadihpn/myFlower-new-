import { NotificationsService } from './notifications.service';
import { UpdateNotificationSettingsDto } from './dto/update-notification-settings.dto';
import { NotificationSettingsResponseDto } from './dto/notification-settings-response.dto';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    getSettings(req: any): Promise<NotificationSettingsResponseDto>;
    updateSettings(req: any, dto: UpdateNotificationSettingsDto): Promise<NotificationSettingsResponseDto>;
}
