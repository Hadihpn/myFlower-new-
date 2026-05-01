import { ApiProperty } from '@nestjs/swagger';

export class NotificationSettingsResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  emailEnabled: boolean;

  @ApiProperty()
  suddenChangeAlerts: boolean;

  @ApiProperty()
  thresholdAlerts: boolean;

  @ApiProperty()
  welcomeEmails: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
