import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPlantSelectionsService } from './user-plant-selections.service';
import { UserPlantSelectionsController } from './user-plant-selections.controller';
import { UserPlantSelection } from './entities/user-plant-selection.entity';
import { SubscriptionModule } from '@modules/subscription/subscription.module';
import { DevicesModule } from '@modules/devices/devices.module';
import { PlantsModule } from '@modules/plants/plants.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserPlantSelection]),
    SubscriptionModule,
    DevicesModule,
    PlantsModule,
  ],
  controllers: [UserPlantSelectionsController],
  providers: [UserPlantSelectionsService],
  exports: [UserPlantSelectionsService],
})
export class UserPlantSelectionsModule {}