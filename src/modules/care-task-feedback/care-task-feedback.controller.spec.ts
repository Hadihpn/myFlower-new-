import { Test, TestingModule } from '@nestjs/testing';
import { CareTaskFeedbackController } from './care-task-feedback.controller';
import { CareTaskFeedbackService } from './care-task-feedback.service';

describe('CareTaskFeedbackController', () => {
  let controller: CareTaskFeedbackController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CareTaskFeedbackController],
      providers: [CareTaskFeedbackService],
    }).compile();

    controller = module.get<CareTaskFeedbackController>(CareTaskFeedbackController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
