import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsObject,
  IsInt,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { PlantCategory } from '../types/plant-category.enum';
import { PlantDifficulty } from '../types/plant-difficulty.enum';
import { PlantThresholds } from '../types/threshold.interface';

export class PackageItemDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  plantSpeciesId: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  position: number;
}

export class CreatePlantPackageDto {
  @ApiProperty({ example: 'Mediterranean Herb Garden' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'A collection of herbs perfect for Mediterranean cooking' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ enum: PlantCategory })
  @IsEnum(PlantCategory)
  category: PlantCategory;

  @ApiProperty({ enum: PlantDifficulty })
  @IsEnum(PlantDifficulty)
  difficulty: PlantDifficulty;

  @ApiProperty({ example: 3 })
  @IsInt()
  plantCount: number;

  @ApiProperty({
    example: {
      temperature: { min: 15, max: 30, ideal: { min: 18, max: 25 } },
      moisture: { min: 40, max: 70, ideal: { min: 50, max: 65 } },
      light: { min: 20000, max: 50000, ideal: { min: 25000, max: 40000 } },
    },
  })
  @IsObject()
  thresholds: PlantThresholds;

  @ApiPropertyOptional({ example: 15.0 })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  popular?: boolean;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @ApiProperty({
    type: [PackageItemDto],
    example: [
      { plantSpeciesId: 1, position: 1 },
      { plantSpeciesId: 2, position: 2 },
      { plantSpeciesId: 3, position: 3 },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PackageItemDto)
  items: PackageItemDto[];
}
