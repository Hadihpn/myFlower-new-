import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { SensorReadingsService } from './sensor-readings.service';
import { SensorReading } from './entities/sensor-reading.entity';
import { DevicesService } from '@modules/devices/devices.service';
import { SensorVerificationService } from '@modules/sensor-verification/sensor-verification.service';

describe('SensorReadingsService', () => {
  let service: SensorReadingsService;
  let repository: Repository<SensorReading>;

  const mockReading = {
    id: 1,
    deviceId: 1,
    temperature: 24.5,
    moisture: 65.3,
    light: 28000,
    humidity: 55.0,
    timestamp: new Date(),
    verified: true,
    anomaly: false,
    createdAt: new Date(),
  };

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      getMany: jest.fn(),
      getRawOne: jest.fn(),
    })),
  };

  const mockDevicesService = {
    findDeviceByDeviceId: jest.fn(),
    updateLastSeen: jest.fn(),
  };

  const mockVerificationService = {
    createVerification: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn((key: string) => {
      const config = {
        'sensor.suddenChange.temperature': 10,
        'sensor.suddenChange.moisture': 20,
        'sensor.suddenChange.light': 5000,
      };
      return config[key];
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SensorReadingsService,
        {
          provide: getRepositoryToken(SensorReading),
          useValue: mockRepository,
        },
        {
          provide: DevicesService,
          useValue: mockDevicesService,
        },
        {
          provide: SensorVerificationService,
          useValue: mockVerificationService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<SensorReadingsService>(SensorReadingsService);
    repository = module.get<Repository<SensorReading>>(
      getRepositoryToken(SensorReading),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createReading', () => {
    it('should create a sensor reading successfully', async () => {
      const createDto = {
        temperature: 24.5,
        moisture: 65.3,
        light: 28000,
      };

      const mockDevice = {
        id: 1,
        deviceId: 'DEVICE_123',
        calibration: null,
      };

      mockDevicesService.findDeviceByDeviceId.mockResolvedValue(mockDevice);
      mockRepository.create.mockReturnValue(mockReading);
      mockRepository.save.mockResolvedValue(mockReading);
      mockRepository.findOne.mockResolvedValue(null);

      const result = await service.createReading('DEVICE_123', createDto);

      expect(result).toBeDefined();
      expect(mockDevicesService.updateLastSeen).toHaveBeenCalledWith('DEVICE_123');
    });
  });

  describe('getLatestReading', () => {
    it('should return latest reading for device', async () => {
      mockRepository.findOne.mockResolvedValue(mockReading);

      const result = await service.getLatestReading(1);

      expect(result).toEqual(mockReading);
    });
  });
});
