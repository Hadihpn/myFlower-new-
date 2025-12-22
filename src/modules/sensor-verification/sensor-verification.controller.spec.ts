import { Test, TestingModule } from '@nestjs/testing';
import { SensorVerificationController } from './sensor-verification.controller';
import { SensorVerificationService } from './sensor-verification.service';

describe('SensorVerificationController', () => {
  let controller: SensorVerificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SensorVerificationController],
      providers: [SensorVerificationService],
    }).compile();

    controller = module.get<SensorVerificationController>(SensorVerificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
