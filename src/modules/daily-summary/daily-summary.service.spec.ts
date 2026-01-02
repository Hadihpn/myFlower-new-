import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DailySummaryService } from './daily-summary.service';
import { DailySummary } from './entities/daily-summary.entity';
import { SensorReadingsService } from '@modules/sensor-readings/sensor-readings.service';

describe('DailySummaryService', () => {
  let service: DailySummaryService;
  let repository: Repository<DailySummary>;

  const mockSummary = {
    id: 1,
    deviceId: 1,
    date: new Date('2024-12-20'),
    minTemperature: 18,
    maxTemperature: 28,
    avgTemperature: 23,
    minMoisture: 50,
    maxMoisture: 70,
    avgMoisture: 60,
    minLight: 20000,
    maxLight: 40000,
    avgLight: 30000,
    readingCount: 96,
    createdAt: new Date(),
  };

  const mockRepository = {
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockSensorReadingsService = {
    getDailyStats: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DailySummaryService,
        {
          provide: getRepositoryToken(DailySummary),
          useValue: mockRepository,
        },
        {
          provide: SensorReadingsService,
          useValue: mockSensorReadingsService,
        },
      ],
    }).compile();

    service = module.get<DailySummaryService>(DailySummaryService);
    repository = module.get<Repository<DailySummary>>(
      getRepositoryToken(DailySummary),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getSummary', () => {
    it('should return daily summary', async () => {
      mockRepository.findOne.mockResolvedValue(mockSummary);

      const result = await service.getSummary(1, new Date('2024-12-20'));

      expect(result).toEqual(mockSummary);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { deviceId: 1, date: new Date('2024-12-20') },
      });
    });

    it('should return null if no summary found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      const result = await service.getSummary(1, new Date('2024-12-20'));

      expect(result).toBeNull();
    });
  });

  describe('getDeviceSummaries', () => {
    it('should return device summaries', async () => {
      mockRepository.find.mockResolvedValue([mockSummary]);

      const result = await service.getDeviceSummaries(1, 30);

      expect(result).toEqual([mockSummary]);
      expect(mockRepository.find).toHaveBeenCalledWith({
        where: { deviceId: 1 },
        order: { date: 'DESC' },
        take: 30,
      });
    });

    it('should respect limit parameter', async () => {
      mockRepository.find.mockResolvedValue([mockSummary]);

      await service.getDeviceSummaries(1, 7);

      expect(mockRepository.find).toHaveBeenCalledWith(
        expect.objectContaining({ take: 7 }),
      );
    });
  });
});
