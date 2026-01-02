import { Test, TestingModule } from '@nestjs/testing';
import { AdviceService } from './advice.service';
import { SensorReadingsService } from '@modules/sensor-readings/sensor-readings.service';
import { UserPlantSelectionsService } from '@modules/user-plant-selections/user-plant-selections.service';
import { UserActionsService } from '@modules/user-actions/user-actions.service';
import { HealthStatus } from './types/health-status.enum';
import { AdvicePriority } from './types/advice-priority.enum';

describe('AdviceService', () => {
  let service: AdviceService;

  const mockSensorReadingsService = {
    getLatestReading: jest.fn(),
  };

  const mockSelectionsService = {
    getSelectionById: jest.fn(),
  };

  const mockActionsService = {
    getLastAction: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdviceService,
        {
          provide: SensorReadingsService,
          useValue: mockSensorReadingsService,
        },
        {
          provide: UserPlantSelectionsService,
          useValue: mockSelectionsService,
        },
        {
          provide: UserActionsService,
          useValue: mockActionsService,
        },
      ],
    }).compile();

    service = module.get<AdviceService>(AdviceService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAdviceForSelection', () => {
    it('should generate advice with good conditions', async () => {
      const mockSelection = {
        id: 1,
        deviceId: 1,
        plantSpecies: {
          thresholds: {
            temperature: { min: 15, max: 30, ideal: { min: 18, max: 25 } },
            moisture: { min: 40, max: 70, ideal: { min: 50, max: 65 } },
            light: { min: 20000, max: 50000, ideal: { min: 25000, max: 40000 } },
          },
        },
      };

      const mockReading = {
        temperature: 22,
        moisture: 55,
        light: 30000,
        timestamp: new Date(),
      };

      mockSelectionsService.getSelectionById.mockResolvedValue(mockSelection);
      mockSensorReadingsService.getLatestReading.mockResolvedValue(mockReading);
      mockActionsService.getLastAction.mockResolvedValue(null);

      const result = await service.getAdviceForSelection(1, 1);

      expect(result).toHaveProperty('healthStatus');
      expect(result).toHaveProperty('healthScore');
      expect(result).toHaveProperty('advice');
      expect(result.healthStatus).toBe(HealthStatus.EXCELLENT);
      expect(result.healthScore).toBeGreaterThanOrEqual(90);
    });

    it('should generate warnings for bad conditions', async () => {
      const mockSelection = {
        id: 1,
        deviceId: 1,
        plantSpecies: {
          thresholds: {
            temperature: { min: 15, max: 30, ideal: { min: 18, max: 25 } },
            moisture: { min: 40, max: 70, ideal: { min: 50, max: 65 } },
            light: { min: 20000, max: 50000, ideal: { min: 25000, max: 40000 } },
          },
        },
      };

      const mockReading = {
        temperature: 10, // Too low
        moisture: 30, // Too dry
        light: 15000, // Too dark
        timestamp: new Date(),
      };

      mockSelectionsService.getSelectionById.mockResolvedValue(mockSelection);
      mockSensorReadingsService.getLatestReading.mockResolvedValue(mockReading);
      mockActionsService.getLastAction.mockResolvedValue(null);

      const result = await service.getAdviceForSelection(1, 1);

      expect(result.advice.length).toBeGreaterThan(0);
      expect(result.healthStatus).not.toBe(HealthStatus.EXCELLENT);
      expect(result.advice.some(a => a.priority === AdvicePriority.HIGH)).toBe(true);
    });

    it('should throw error if no sensor data', async () => {
      mockSelectionsService.getSelectionById.mockResolvedValue({ deviceId: 1 });
      mockSensorReadingsService.getLatestReading.mockResolvedValue(null);

      await expect(
        service.getAdviceForSelection(1, 1),
      ).rejects.toThrow('No sensor data available');
    });
  });
});
