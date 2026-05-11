import { IsOptional, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class GenerateInputDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @IsOptional()
  packageId: number;
  @ApiProperty({ example: 1 })
  @IsInt()
  @IsOptional()
  plantSpeciesId: number;
}
