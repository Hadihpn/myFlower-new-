import { ApiProperty } from '@nestjs/swagger';
import { PlantCategory } from '../types/plant-category.enum';
import { PlantDifficulty } from '../types/plant-difficulty.enum';
import { PlantThresholds } from '../types/threshold.interface';

export class PlantGroupResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ enum: PlantCategory })
  category: PlantCategory;

  @ApiProperty({ enum: PlantDifficulty })
  difficulty: PlantDifficulty;

  @ApiProperty()
  thresholds: PlantThresholds;

  @ApiProperty()
  careInstructions: Record<string, any>;

  @ApiProperty()
  imageUrl: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  createdAt: Date;
}

export class PlantSpeciesResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  groupId: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  scientificName: string;

  @ApiProperty()
  commonNames: string[];

  @ApiProperty({ enum: PlantCategory })
  category: PlantCategory;

  @ApiProperty({ enum: PlantDifficulty })
  difficulty: PlantDifficulty;

  @ApiProperty()
  thresholds: PlantThresholds;

  @ApiProperty()
  watering: Record<string, any>;

  @ApiProperty()
  fertilization: Record<string, any>;

  @ApiProperty()
  growthInfo: Record<string, any>;

  @ApiProperty()
  harvestInfo: Record<string, any>;

  @ApiProperty()
  commonProblems: any[];

  @ApiProperty()
  companionPlants: string[];

  @ApiProperty()
  avoidPlants: string[];

  @ApiProperty()
  toxicity: Record<string, any>;

  @ApiProperty()
  tips: string[];

  @ApiProperty()
  imageUrl: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  createdAt: Date;
}

export class PlantPackageResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ enum: PlantCategory })
  category: PlantCategory;

  @ApiProperty({ enum: PlantDifficulty })
  difficulty: PlantDifficulty;

  @ApiProperty()
  plantCount: number;

  @ApiProperty()
  thresholds: PlantThresholds;

  @ApiProperty()
  price: number;

  @ApiProperty()
  imageUrl: string;

  @ApiProperty()
  popular: boolean;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ type: [PlantSpeciesResponseDto] })
  plants: PlantSpeciesResponseDto[];
}
