import { Test, TestingModule } from '@nestjs/testing';
import { CareTaskFeedbackService } from './care-task-feedback.service';

describe('CareTaskFeedbackService', () => {
  let service: CareTaskFeedbackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CareTaskFeedbackService],
    }).compile();

    service = module.get<CareTaskFeedbackService>(CareTaskFeedbackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
