import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DevicesService } from './devices.service';
import { Device } from './entities/device.entity';
import { DeviceStatus } from './types/device-status.enum';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('DevicesService', () => {
  let service: DevicesService;
  let repository: Repository<Device>;

  const mockDevice = {
    id: 1,
    userId: 1,
    deviceId: 'DEVICE_12345',
    name: 'Test Device',
    location: 'Backyard',
    status: DeviceStatus.ACTIVE,
    tokenHash: 'hashedToken',
    lastSeen: new Date(),
    calibration: {},
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockRepository = {
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
    update: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
      addSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      getOne: jest.fn(),
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DevicesService,
        {
          provide: getRepositoryToken(Device),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<DevicesService>(DevicesService);
    repository = module.get<Repository<Device>>(getRepositoryToken(Device));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('registerDevice', () => {
    it('should register a new device successfully', async () => {
      const registerDto = {
        deviceId: 'DEVICE_NEW',
        name: 'New Device',
        location: 'Garden',
      };

      mockRepository.findOne.mockResolvedValue(null);
      mockRepository.create.mockReturnValue(mockDevice);
      mockRepository.save.mockResolvedValue(mockDevice);

      const result = await service.registerDevice(1, registerDto);

      expect(result).toHaveProperty('device');
      expect(result).toHaveProperty('token');
      expect(mockRepository.create).toHaveBeenCalled();
    });

    it('should throw ConflictException if device exists', async () => {
      const registerDto = {
        deviceId: 'DEVICE_EXISTING',
        name: 'Existing Device',
        location: 'Garden',
      };

      mockRepository.findOne.mockResolvedValue(mockDevice);

      await expect(service.registerDevice(1, registerDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('findUserDevices', () => {
    it('should return user devices', async () => {
      mockRepository.find.mockResolvedValue([mockDevice]);

      const result = await service.findUserDevices(1);

      expect(result).toHaveLength(1);
      expect(result[0].deviceId).toBe('DEVICE_12345');
    });
  });

  describe('findDeviceById', () => {
    it('should return device by ID', async () => {
      mockRepository.findOne.mockResolvedValue(mockDevice);

      const result = await service.findDeviceById(1);

      expect(result.id).toBe(1);
    });

    it('should throw NotFoundException when device not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findDeviceById(999)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});