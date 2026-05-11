import { IsNotEmpty, IsNumber, IsOptional, IsUUID, IsEnum, IsString } from 'class-validator';
import { NotificationType, NotificationSeverity } from '../entities/notification.entity';

export class CreateNotificationDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsOptional()
  deviceId?: number;

  @IsNotEmpty()
  @IsEnum(NotificationType)
  type: NotificationType;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsEnum(NotificationSeverity)
  severity: NotificationSeverity;
}