import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SwitchMonitoringDto {
  @ApiProperty({ example: 1, description: 'Selection ID to monitor' })
  @IsInt()
  @IsNotEmpty()
  selectionId: number;
}