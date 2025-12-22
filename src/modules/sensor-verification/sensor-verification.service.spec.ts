import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { SensorVerificationService } from './sensor-verification.service';
import { SensorVerification } from './entities/sensor-verification.entity';
import { NotificationsService } from '@modules/notifications/notifications.service';
import { VerificationStatus } from './types/verification-status.enum';
import { ChangeType } from './types/change-type.enum';

describe('SensorVerificationService', () => {
  let service: SensorVerificationService;
  let repository: Repository<SensorVerification>;

  const mockVerification = {
    id: 1,
    deviceId: 1,
    triggerReadingId: 100,
    status: VerificationStatus.PENDING,
    changeType: ChangeType.TEMPERATURE_DROP,
    changeMagnitude: 15.0,
    verificationReadings: [],
    confirmed: false,
    confidence: null,
    requestedAt: new Date(),
    expiresAt: new Date(),
    createdAt: new Date(),
  };

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
  };

  const mockNotificationsService = {
    sendSuddenChangeAlert: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn((key: string) => {
      const config = {
        'sensor.verificationTimeout': 5,
      };
      return config[key];
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SensorVerificationService,
        {
          provide: getRepositoryToken(SensorVerification),
          useValue: mockRepository,
        },
        {
          provide: NotificationsService,
          useValue: mockNotificationsService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<SensorVerificationService>(
      SensorVerificationService,
    );
    repository = module.get<Repository<SensorVerification>>(
      getRepositoryToken(SensorVerification),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createVerification', () => {
    it('should create a verification request', async () => {
      mockRepository.create.mockReturnValue(mockVerification);
      mockRepository.save.mockResolvedValue(mockVerification);

      const result = await service.createVerification(
        1,
        100,
        'temperature_drop',
        15.0,
      );

      expect(result).toBeDefined();
      expect(result.status).toBe(VerificationStatus.PENDING);
      expect(mockRepository.create).toHaveBeenCalled();
    });
  });

  describe('addVerificationReading', () => {
    it('should add reading to pending verification', async () => {
      const reading = {
        temperature: 10.5,
        moisture: 65.0,
        light: 28000,
        timestamp: new Date(),
      };

      mockRepository.find.mockResolvedValue([mockVerification]);
      mockRepository.save.mockResolvedValue(mockVerification);

      await service.addVerificationReading(1, reading);

      expect(mockRepository.save).toHaveBeenCalled();
    });
  });
});