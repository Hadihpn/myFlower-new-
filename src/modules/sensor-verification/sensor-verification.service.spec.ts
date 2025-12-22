import { Test, TestingModule } from '@nestjs/testing';
import { SensorVerificationService } from './sensor-verification.service';

describe('SensorVerificationService', () => {
  let service: SensorVerificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SensorVerificationService],
    }).compile();

    service = module.get<SensorVerificationService>(SensorVerificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
