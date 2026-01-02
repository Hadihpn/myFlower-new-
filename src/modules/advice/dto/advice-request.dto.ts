import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AdviceRequestDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @IsNotEmpty()
  selectionId: number;
}