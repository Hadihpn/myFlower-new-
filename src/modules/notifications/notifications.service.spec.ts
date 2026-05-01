import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsService } from './notifications.service';
import { ConfigService } from '@nestjs/config';
import { DevicesService } from '../devices/devices.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotificationSettings } from './entities/notification-settings.entity';
import { Repository } from 'typeorm';
import * as nodemailer from 'nodemailer';
import { NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as handlebars from 'handlebars';

jest.mock('nodemailer');
jest.mock('fs');
jest.mock('handlebars');
jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
  genSalt: jest.fn(),
}));
describe('NotificationsService', () => {
  let service: NotificationsService;
  let settingsRepository: Repository<NotificationSettings>;
  let devicesService: DevicesService;
  let configService: ConfigService;

  const mockTransporter = {
    sendMail: jest.fn(),
  };

  const mockUser = { id: 1, email: 'test@example.com', username: 'testuser' };

  const mockDevice = {
    id: 1,
    deviceId: '123',
    user: mockUser,
  };

  const mockSettings: NotificationSettings = {
    id: 1,
    userId: mockUser.id,
    emailEnabled: true,
    suddenChangeAlerts: true,
    thresholdAlerts: true,
    welcomeEmails: true,
    user: mockUser as any,
    createdAt: new Date(), // <-- این خط را اضافه کنید
    updatedAt: new Date(), // <-- این خط را اضافه کنید
  };
  beforeEach(async () => {
    (nodemailer.createTransport as jest.Mock).mockReturnValue(mockTransporter);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockImplementation((key: string) => {
              if (key === 'email.host') return 'smtp.test.com';
              if (key === 'email.port') return 587;
              if (key === 'email.user') return 'test_user';
              if (key === 'email.pass') return 'test_pass';
              if (key === 'email.from') return 'noreply@test.com';
              if (key === 'app.url') return 'http://localhost:3000';
              if (key === 'appUrl') return 'http://localhost:3000'; // ← این خط را اضافه کن
              return null;
            }),
          },
        },
        {
          provide: DevicesService,
          useValue: {
            findDeviceByDeviceId: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(NotificationSettings),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
    settingsRepository = module.get<Repository<NotificationSettings>>(
      getRepositoryToken(NotificationSettings),
    );
    devicesService = module.get<DevicesService>(DevicesService);
    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // ─── getSettings ────────────────────────────────────────────────────────────

  describe('getSettings', () => {
    it('should return existing settings', async () => {
      jest.spyOn(settingsRepository, 'findOne').mockResolvedValue({ ...mockSettings });

      const result = await service.getSettings(1);

      expect(settingsRepository.findOne).toHaveBeenCalledWith({
        where: { userId: 1 },
      });
      expect(result).toEqual(mockSettings);
    });

    it('should create default settings if none exist', async () => {
      jest.spyOn(settingsRepository, 'findOne').mockResolvedValue(null);
      jest.spyOn(settingsRepository, 'create').mockReturnValue({
        ...mockSettings,
      });
      jest.spyOn(settingsRepository, 'save').mockResolvedValue({ ...mockSettings });

      const result = await service.getSettings(1);

      expect(settingsRepository.create).toHaveBeenCalled();
      expect(settingsRepository.save).toHaveBeenCalled();
      expect(result).toEqual(mockSettings);
    });
  });

  // ─── updateSettings ─────────────────────────────────────────────────────────

  describe('updateSettings', () => {
    it('should update existing settings', async () => {
      const updateDto = { emailEnabled: false, suddenChangeAlerts: false };

      jest.spyOn(settingsRepository, 'findOne').mockResolvedValue({ ...mockSettings });
      jest.spyOn(settingsRepository, 'save').mockResolvedValue({ ...mockSettings, ...updateDto });

      const result = await service.updateSettings(1, updateDto);

      expect(settingsRepository.findOne).toHaveBeenCalledWith({
        where: { userId: 1 },
      });
      expect(settingsRepository.save).toHaveBeenCalledWith({
        ...mockSettings,
        ...updateDto,
      });
      expect(result.emailEnabled).toBe(false);
      expect(result.suddenChangeAlerts).toBe(false);
    });

    it('should create settings if none exist', async () => {
      const updateDto = { emailEnabled: false };
      jest.spyOn(settingsRepository, 'findOne').mockResolvedValue(null);
      jest.spyOn(settingsRepository, 'create').mockReturnValue({
        ...mockSettings,
        ...updateDto,
      });
      jest.spyOn(settingsRepository, 'save').mockResolvedValue({
        ...mockSettings,
        ...updateDto,
      });

      const result = await service.updateSettings(1, updateDto);

      expect(settingsRepository.create).toHaveBeenCalledWith({
        userId: 1,
        ...updateDto,
      });
      expect(settingsRepository.save).toHaveBeenCalled();
      expect(result.emailEnabled).toBe(false);
    });
  });

  // ─── sendEmail (Error Handling) ─────────────────────────────────────────────

  describe('sendEmail', () => {
    it('should throw error if transporter fails', async () => {
      const error = new Error('SMTP Error');
      // حتما از Once استفاده کنید تا روی تست‌های بعدی اثر نگذارد!
      mockTransporter.sendMail.mockRejectedValueOnce(error);

      await expect(service.sendEmail('test@example.com', 'Subject', 'html')).rejects.toThrow(
        'SMTP Error',
      );
    });
  });

  // ─── sendSuddenChangeAlert ──────────────────────────────────────────────────

  describe('sendSuddenChangeAlert', () => {
    it('should send alert when settings are enabled', async () => {
      jest
        .spyOn(devicesService, 'findDeviceByDeviceId')
        .mockResolvedValue({ ...mockDevice } as any);
      jest.spyOn(settingsRepository, 'findOne').mockResolvedValue({
        ...mockSettings,
      });

      await service.sendSuddenChangeAlert('123', 'temperature', 10);

      expect(devicesService.findDeviceByDeviceId).toHaveBeenCalledWith('123');
      expect(settingsRepository.findOne).toHaveBeenCalledWith({
        where: { userId: mockUser.id },
        relations: ['user'],
      });
      expect(mockTransporter.sendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          to: mockUser.email,
          subject: expect.stringContaining('Sudden Change Detected'),
          html: expect.stringContaining('temperature'),
        }),
      );
    });

    it('should throw NotFoundException when device not found', async () => {
      jest.spyOn(devicesService, 'findDeviceByDeviceId').mockResolvedValue(null);

      await expect(service.sendSuddenChangeAlert('invalid', 'temperature', 10)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should not send when emailEnabled is false', async () => {
      jest
        .spyOn(devicesService, 'findDeviceByDeviceId')
        .mockResolvedValue({ ...mockDevice } as any);
      jest.spyOn(settingsRepository, 'findOne').mockResolvedValue({
        ...mockSettings,
        emailEnabled: false,
      });

      await service.sendSuddenChangeAlert('123', 'temperature', 10);
      expect(mockTransporter.sendMail).not.toHaveBeenCalled();
    });

    it('should not send when suddenChangeAlerts is false', async () => {
      jest
        .spyOn(devicesService, 'findDeviceByDeviceId')
        .mockResolvedValue({ ...mockDevice } as any);
      jest.spyOn(settingsRepository, 'findOne').mockResolvedValue({
        ...mockSettings,
        suddenChangeAlerts: false,
      });

      await service.sendSuddenChangeAlert('123', 'temperature', 10);
      expect(mockTransporter.sendMail).not.toHaveBeenCalled();
    });

    it('should not send when settings is null', async () => {
      jest
        .spyOn(devicesService, 'findDeviceByDeviceId')
        .mockResolvedValue({ ...mockDevice } as any);
      jest.spyOn(settingsRepository, 'findOne').mockResolvedValue(null);

      await service.sendSuddenChangeAlert('123', 'temperature', 10);
      expect(mockTransporter.sendMail).not.toHaveBeenCalled();
    });
  });

  // ─── sendSensorAnomalyNotification ──────────────────────────────────────────

  describe('sendSensorAnomalyNotification', () => {
    it('should send notification when threshold alerts are enabled', async () => {
      jest
        .spyOn(devicesService, 'findDeviceByDeviceId')
        .mockResolvedValue({ ...mockDevice } as any);
      jest.spyOn(settingsRepository, 'findOne').mockResolvedValue({
        ...mockSettings,
      });

      await service.sendSensorAnomalyNotification('123', [
        'Temperature too high',
        'Humidity too low',
      ]);

      expect(devicesService.findDeviceByDeviceId).toHaveBeenCalledWith('123');
      expect(settingsRepository.findOne).toHaveBeenCalledWith({
        where: { userId: mockUser.id },
        relations: ['user'],
      });
      expect(mockTransporter.sendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          to: mockUser.email,
          subject: expect.stringContaining('Sensor Anomalies Detected'),
          html: expect.stringContaining('Temperature too high'),
        }),
      );
    });

    it('should throw NotFoundException when device not found', async () => {
      jest.spyOn(devicesService, 'findDeviceByDeviceId').mockResolvedValue(null);

      await expect(service.sendSensorAnomalyNotification('invalid', ['message'])).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should not send when emailEnabled is false', async () => {
      jest
        .spyOn(devicesService, 'findDeviceByDeviceId')
        .mockResolvedValue({ ...mockDevice } as any);
      jest.spyOn(settingsRepository, 'findOne').mockResolvedValue({
        ...mockSettings,
        emailEnabled: false,
      });

      await service.sendSensorAnomalyNotification('123', ['message']);
      expect(mockTransporter.sendMail).not.toHaveBeenCalled();
    });

    it('should not send when thresholdAlerts is false', async () => {
      jest
        .spyOn(devicesService, 'findDeviceByDeviceId')
        .mockResolvedValue({ ...mockDevice } as any);
      jest.spyOn(settingsRepository, 'findOne').mockResolvedValue({
        ...mockSettings,
        thresholdAlerts: false,
      });

      await service.sendSensorAnomalyNotification('123', ['message']);
      expect(mockTransporter.sendMail).not.toHaveBeenCalled();
    });

    it('should not send when settings is null', async () => {
      jest
        .spyOn(devicesService, 'findDeviceByDeviceId')
        .mockResolvedValue({ ...mockDevice } as any);
      jest.spyOn(settingsRepository, 'findOne').mockResolvedValue(null);

      await service.sendSensorAnomalyNotification('123', ['message']);
      expect(mockTransporter.sendMail).not.toHaveBeenCalled();
    });
  });

  // ─── sendWelcomeEmail ───────────────────────────────────────────────────────

  describe('sendWelcomeEmail', () => {
    it('should compile template and send welcome email', async () => {
      const mockTemplate = jest.fn().mockReturnValue('<h1>Welcome Test</h1>');
      (fs.readFileSync as jest.Mock).mockReturnValue('mock-file-content');
      (handlebars.compile as jest.Mock).mockReturnValue(mockTemplate);

      await service.sendWelcomeEmail('user@example.com', 'Test User');

      expect(fs.readFileSync).toHaveBeenCalled();
      expect(handlebars.compile).toHaveBeenCalledWith('mock-file-content');
      expect(mockTemplate).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Test User',
          appUrl: 'http://localhost:3000',
        }),
      );
      expect(mockTransporter.sendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          to: 'user@example.com',
          subject: expect.stringContaining('Welcome'),
          html: '<h1>Welcome Test</h1>',
        }),
      );
    });
  });

  // ─── sendThresholdAlert ─────────────────────────────────────────────────────

  describe('sendThresholdAlert', () => {
    it('should compile template and send threshold alert', async () => {
      const mockTemplate = jest.fn().mockReturnValue('<h1>Alert</h1>');
      (fs.readFileSync as jest.Mock).mockReturnValue('mock-file-content');
      (handlebars.compile as jest.Mock).mockReturnValue(mockTemplate);

      await service.sendThresholdAlert('user@example.com', 'Test User', ['Issue 1']);

      expect(fs.readFileSync).toHaveBeenCalled();
      expect(handlebars.compile).toHaveBeenCalledWith('mock-file-content');
      expect(mockTemplate).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Test User',
          messages: ['Issue 1'],
        }),
      );
      expect(mockTransporter.sendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          to: 'user@example.com',
          subject: 'Unsuitable condition',
          html: '<h1>Alert</h1>',
        }),
      );
    });
  });
});
