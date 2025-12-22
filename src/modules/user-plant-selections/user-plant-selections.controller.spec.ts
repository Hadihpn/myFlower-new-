import { Test, TestingModule } from '@nestjs/testing';
import { UserPlantSelectionsController } from './user-plant-selections.controller';
import { UserPlantSelectionsService } from './user-plant-selections.service';

describe('UserPlantSelectionsController', () => {
  let controller: UserPlantSelectionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserPlantSelectionsController],
      providers: [UserPlantSelectionsService],
    }).compile();

    controller = module.get<UserPlantSelectionsController>(UserPlantSelectionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
