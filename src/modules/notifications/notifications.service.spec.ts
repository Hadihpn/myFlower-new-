import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { NotificationsService } from './notifications.service';

describe('NotificationsService', () => {
  let service: NotificationsService;

  const mockConfigService = {
    get: jest.fn((key: string) => {
      const config = {
        'email.host': 'smtp.gmail.com',
        'email.port': 587,
        'email.secure': false,
        'email.user': 'test@gmail.com',
        'email.password': 'password',
        'email.from': 'noreply@test.com',
      };
      return config[key];
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendEmail', () => {
    it('should send email successfully', async () => {
      // Mock nodemailer transport
      const mockSendMail = jest.fn().mockResolvedValue({ messageId: '123' });
      (service as any).transporter = { sendMail: mockSendMail };

      await service.sendEmail('test@example.com', 'Test Subject', '<p>Test</p>');

      expect(mockSendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          to: 'test@example.com',
          subject: 'Test Subject',
          html: '<p>Test</p>',
        }),
      );
    });

    it('should handle email errors', async () => {
      const mockSendMail = jest.fn().mockRejectedValue(new Error('SMTP Error'));
      (service as any).transporter = { sendMail: mockSendMail };

      await expect(
        service.sendEmail('test@example.com', 'Test', '<p>Test</p>'),
      ).rejects.toThrow();
    });
  });

  describe('sendSuddenChangeAlert', () => {
    it('should send alert email', async () => {
      const mockSendEmail = jest.spyOn(service, 'sendEmail').mockResolvedValue();

      await service.sendSuddenChangeAlert(1, 'temperature_drop', 15);

      expect(mockSendEmail).toHaveBeenCalledWith(
        expect.any(String),
        expect.stringContaining('Alert'),
        expect.stringContaining('temperature_drop'),
      );
    });
  });

  describe('sendWelcomeEmail', () => {
    it('should send welcome email', async () => {
      const mockSendEmail = jest.spyOn(service, 'sendEmail').mockResolvedValue();

      await service.sendWelcomeEmail('test@example.com', 'John Doe');

      expect(mockSendEmail).toHaveBeenCalledWith(
        'test@example.com',
        expect.stringContaining('Welcome'),
        expect.stringContaining('John Doe'),
      );
    });
  });
});
