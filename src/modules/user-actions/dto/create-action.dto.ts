import { IsEnum, IsNotEmpty, IsString, IsOptional, IsDateString, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ActionType } from '../types/action-type.enum';

export class CreateActionDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  selectionId: number;

  @ApiProperty({ enum: ActionType })
  @IsEnum(ActionType)
  actionType: ActionType;

  @ApiPropertyOptional({ example: 'Watered thoroughly' })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({ example: '2024-12-20T14:30:00Z' })
  @IsOptional()
  @IsDateString()
  actionDate?: string;
}