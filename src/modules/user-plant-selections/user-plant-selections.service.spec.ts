import { Test, TestingModule } from '@nestjs/testing';
import { UserPlantSelectionsService } from './user-plant-selections.service';

describe('UserPlantSelectionsService', () => {
  let service: UserPlantSelectionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserPlantSelectionsService],
    }).compile();

    service = module.get<UserPlantSelectionsService>(UserPlantSelectionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
