import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDateString,
  IsBoolean,
  ValidateIf,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSelectionDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  deviceId: string;

  @ApiPropertyOptional({ example: 1, description: 'Plant package ID (mutually exclusive with plantSpeciesId)' })
  @IsOptional()
  @IsInt()
  @ValidateIf((o) => !o.plantSpeciesId)
  packageId?: number;

  @ApiPropertyOptional({ example: 1, description: 'Plant species ID (mutually exclusive with packageId)' })
  @IsOptional()
  @IsInt()
  @ValidateIf((o) => !o.packageId)
  plantSpeciesId?: number;

  @ApiProperty({ example: 'My Herb Garden' })
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @ApiPropertyOptional({ example: '2024-12-20' })
  @IsOptional()
  @IsDateString()
  plantedDate?: string;

  @ApiProperty({ example: 'Kitchen Window' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiPropertyOptional({ example: 'Gets morning sunlight' })
  @IsOptional()
  @IsString()
  notes?: string;
}