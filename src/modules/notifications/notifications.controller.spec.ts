import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { UpdateNotificationSettingsDto } from './dto/update-notification-settings.dto';
import { NotificationSettings } from './entities/notification-settings.entity';

describe('NotificationsController', () => {
  let controller: NotificationsController;
  let service: NotificationsService;

  const mockSettings = {
  id: 1,
  userId: 1,
  user: {
    id: 1,
    email: 'test@example.com',
    fullName: 'Test User',
  },
  emailEnabled: true,
  suddenChangeAlerts: true,
  thresholdAlerts: true,
  welcomeEmails: true,
  createdAt: new Date(),
  updatedAt: new Date(),
} as NotificationSettings;

  const mockRequest = {
    user: {
      id: 1,
      email: 'test@example.com',
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationsController],
      providers: [
        {
          provide: NotificationsService,
          useValue: {
            getSettings: jest.fn(),
            updateSettings: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<NotificationsController>(NotificationsController);
    service = module.get<NotificationsService>(NotificationsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getSettings', () => {
    it('should return user notification settings', async () => {
      jest.spyOn(service, 'getSettings').mockResolvedValue(mockSettings);

      const result = await controller.getSettings(mockRequest);

      expect(service.getSettings).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockSettings);
    });

    it('should handle service errors', async () => {
      jest.spyOn(service, 'getSettings').mockRejectedValue(new Error('Database error'));

      await expect(controller.getSettings(mockRequest)).rejects.toThrow('Database error');
    });
  });

  describe('updateSettings', () => {
    it('should update notification settings', async () => {
      const updateDto: UpdateNotificationSettingsDto = {
        emailEnabled: false,
        thresholdAlerts: false,
      };

      const updatedSettings = { ...mockSettings, ...updateDto };
      jest.spyOn(service, 'updateSettings').mockResolvedValue(updatedSettings);

      const result = await controller.updateSettings(mockRequest, updateDto);

      expect(service.updateSettings).toHaveBeenCalledWith(1, updateDto);
      expect(result.emailEnabled).toBe(false);
      expect(result.thresholdAlerts).toBe(false);
    });

    it('should update partial settings', async () => {
      const updateDto: UpdateNotificationSettingsDto = {
        suddenChangeAlerts: false,
      };

      const updatedSettings = { ...mockSettings, suddenChangeAlerts: false };
      jest.spyOn(service, 'updateSettings').mockResolvedValue(updatedSettings);

      const result = await controller.updateSettings(mockRequest, updateDto);

      expect(service.updateSettings).toHaveBeenCalledWith(1, updateDto);
      expect(result.suddenChangeAlerts).toBe(false);
      expect(result.emailEnabled).toBe(true); // unchanged
    });

    it('should handle validation errors', async () => {
      const invalidDto = { emailEnabled: 'not-a-boolean' } as any;

      // در واقعیت ValidationPipe این رو می‌گیره، اما برای تست:
      jest.spyOn(service, 'updateSettings').mockRejectedValue(
        new Error('Validation failed'),
      );

      await expect(
        controller.updateSettings(mockRequest, invalidDto),
      ).rejects.toThrow('Validation failed');
    });

    it('should handle service errors', async () => {
      const updateDto: UpdateNotificationSettingsDto = {
        emailEnabled: false,
      };

      jest.spyOn(service, 'updateSettings').mockRejectedValue(
        new Error('Database error'),
      );

      await expect(
        controller.updateSettings(mockRequest, updateDto),
      ).rejects.toThrow('Database error');
    });
  });
});
