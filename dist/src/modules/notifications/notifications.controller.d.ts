import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    create(createNotificationDto: CreateNotificationDto): void;
    findAll(): void;
    findOne(id: string): void;
    update(id: string, updateNotificationDto: UpdateNotificationDto): void;
    remove(id: string): void;
}
