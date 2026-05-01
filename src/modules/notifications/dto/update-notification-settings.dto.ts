import { IsBoolean, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateNotificationSettingsDto {
  @ApiPropertyOptional({ description: 'Enable or disable all email notifications' })
  @IsOptional()
  @IsBoolean()
  emailEnabled?: boolean;

  @ApiPropertyOptional({ description: 'Enable or disable sudden change alerts' })
  @IsOptional()
  @IsBoolean()
  suddenChangeAlerts?: boolean;

  @ApiPropertyOptional({ description: 'Enable or disable threshold alerts' })
  @IsOptional()
  @IsBoolean()
  thresholdAlerts?: boolean;

  @ApiPropertyOptional({ description: 'Enable or disable welcome emails' })
  @IsOptional()
  @IsBoolean()
  welcomeEmails?: boolean;
}
