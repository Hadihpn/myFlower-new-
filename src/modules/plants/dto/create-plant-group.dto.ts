import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsObject,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PlantCategory } from '../types/plant-category.enum';
import { PlantDifficulty } from '../types/plant-difficulty.enum';
import { PlantThresholds } from '../types/threshold.interface';

export class CreatePlantGroupDto {
  @ApiProperty({ example: 'Mediterranean Herbs' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Herbs that thrive in Mediterranean climate' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ enum: PlantCategory })
  @IsEnum(PlantCategory)
  category: PlantCategory;

  @ApiProperty({ enum: PlantDifficulty })
  @IsEnum(PlantDifficulty)
  difficulty: PlantDifficulty;

  @ApiProperty({
    example: {
      temperature: { min: 15, max: 30, ideal: { min: 18, max: 25 } },
      moisture: { min: 40, max: 70, ideal: { min: 50, max: 65 } },
      light: { min: 20000, max: 50000, ideal: { min: 25000, max: 40000 } },
    },
  })
  @IsObject()
  thresholds: PlantThresholds;

  @ApiProperty({
    example: { watering: 'Regular', sunlight: 'Full sun', soil: 'Well-drained' },
  })
  @IsObject()
  careInstructions: Record<string, any>;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}