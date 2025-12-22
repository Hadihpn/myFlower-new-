import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { PlantsService } from './plants.service';
import { PlantsController } from './plants.controller';
import { PlantGroup } from './entities/plant-group.entity';
import { PlantSpecies } from './entities/plant-species.entity';
import { PlantPackage } from './entities/plant-package.entity';
import { PlantPackageItem } from './entities/plant-package-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PlantGroup,
      PlantSpecies,
      PlantPackage,
      PlantPackageItem,
    ]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [PlantsController],
  providers: [PlantsService],
  exports: [PlantsService],
})
export class PlantsModule {}