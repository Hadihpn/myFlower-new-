import { Controller, Get, Patch, Body, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { UpdateNotificationSettingsDto } from './dto/update-notification-settings.dto';
import { NotificationSettingsResponseDto } from './dto/notification-settings-response.dto';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';

@ApiTags('notifications')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get('settings')
  @ApiResponse({ status: 200, type: NotificationSettingsResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiOperation({ summary: 'Get user notification settings' })
  async getSettings(@Request() req): Promise<NotificationSettingsResponseDto> {
    const userId = req.user.id;
    return this.notificationsService.getSettings(userId);
  }

  @Patch('settings')
  @ApiResponse({ status: 200, type: NotificationSettingsResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiOperation({ summary: 'Update user notification settings' })
  async updateSettings(
    @Request() req,
    @Body() dto: UpdateNotificationSettingsDto,
  ): Promise<NotificationSettingsResponseDto> {
    const userId = req.user.id;
    return this.notificationsService.updateSettings(userId, dto);
  }
}
