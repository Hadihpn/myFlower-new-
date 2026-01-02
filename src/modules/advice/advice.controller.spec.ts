import { Test, TestingModule } from '@nestjs/testing';
import { AdviceController } from './advice.controller';
import { AdviceService } from './advice.service';
import { HealthStatus } from './types/health-status.enum';

describe('AdviceController', () => {
  let controller: AdviceController;
  let service: AdviceService;

  const mockAdvice = {
    selectionId: 1,
    healthStatus: HealthStatus.GOOD,
    healthScore: 85,
    advice: [],
    currentConditions: { temperature: 22, moisture: 55, light: 30000 },
    idealConditions: {},
    lastWatered: new Date(),
    lastFertilized: null,
  };

  const mockService = {
    getAdviceForSelection: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdviceController],
      providers: [
        {
          provide: AdviceService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<AdviceController>(AdviceController);
    service = module.get<AdviceService>(AdviceService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAdviceForSelection', () => {
    it('should return advice', async () => {
      mockService.getAdviceForSelection.mockResolvedValue(mockAdvice);

      const result = await controller.getAdviceForSelection(1, 1);

      expect(result).toEqual(mockAdvice);
      expect(service.getAdviceForSelection).toHaveBeenCalledWith(1, 1);
    });
  });
});
