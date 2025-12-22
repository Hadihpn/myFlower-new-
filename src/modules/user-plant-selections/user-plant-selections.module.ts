import { Module } from '@nestjs/common';
import { UserPlantSelectionsService } from './user-plant-selections.service';
import { UserPlantSelectionsController } from './user-plant-selections.controller';

@Module({
  controllers: [UserPlantSelectionsController],
  providers: [UserPlantSelectionsService],
})
export class UserPlantSelectionsModule {}
