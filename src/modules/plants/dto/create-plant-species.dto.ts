import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsObject,
  IsArray,
  IsOptional,
  IsBoolean,
  IsInt,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PlantCategory } from '../types/plant-category.enum';
import { PlantDifficulty } from '../types/plant-difficulty.enum';
import { PlantThresholds } from '../types/threshold.interface';

export class CreatePlantSpeciesDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  groupId?: number;

  @ApiProperty({ example: 'Basil' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Ocimum basilicum' })
  @IsString()
  @IsNotEmpty()
  scientificName: string;

  @ApiProperty({ example: ['Sweet Basil', 'Thai Basil'] })
  @IsArray()
  @IsString({ each: true })
  commonNames: string[];

  @ApiProperty({ enum: PlantCategory })
  @IsEnum(PlantCategory)
  category: PlantCategory;

  @ApiProperty({ enum: PlantDifficulty })
  @IsEnum(PlantDifficulty)
  difficulty: PlantDifficulty;

  @ApiProperty({
    example: {
      temperature: { min: 18, max: 27, ideal: { min: 20, max: 25 } },
      moisture: { min: 50, max: 70, ideal: { min: 55, max: 65 } },
      light: { min: 25000, max: 45000, ideal: { min: 30000, max: 40000 } },
    },
  })
  @IsObject()
  thresholds: PlantThresholds;

  @ApiProperty({
    example: { frequency: 'Every 2-3 days', amount: 'Moderate', method: 'Soil watering' },
  })
  @IsObject()
  watering: Record<string, any>;

  @ApiProperty({
    example: { frequency: 'Every 2 weeks', type: 'Balanced liquid fertilizer' },
  })
  @IsObject()
  fertilization: Record<string, any>;

  @ApiProperty({
    example: { height: '30-60cm', spread: '20-30cm', growthRate: 'Fast' },
  })
  @IsObject()
  growthInfo: Record<string, any>;

  @ApiPropertyOptional({
    example: { time: '60-90 days', method: 'Cut leaves as needed' },
  })
  @IsOptional()
  @IsObject()
  harvestInfo?: Record<string, any>;

  @ApiProperty({
    example: [
      { problem: 'Aphids', solution: 'Spray with neem oil' },
      { problem: 'Powdery mildew', solution: 'Improve air circulation' },
    ],
  })
  @IsArray()
  commonProblems: any[];

  @ApiProperty({ example: ['Tomatoes', 'Peppers'] })
  @IsArray()
  @IsString({ each: true })
  companionPlants: string[];

  @ApiProperty({ example: ['Rue', 'Sage'] })
  @IsArray()
  @IsString({ each: true })
  avoidPlants: string[];

  @ApiProperty({
    example: { pets: 'Safe', humans: 'Safe' },
  })
  @IsObject()
  toxicity: Record<string, any>;

  @ApiProperty({
    example: ['Pinch tips for bushier growth', 'Harvest before flowering'],
  })
  @IsArray()
  @IsString({ each: true })
  tips: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
