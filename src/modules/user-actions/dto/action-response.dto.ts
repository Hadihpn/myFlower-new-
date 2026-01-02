import { ApiProperty } from '@nestjs/swagger';
import { ActionType } from '../types/action-type.enum';

export class ActionResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  deviceId: number;

  @ApiProperty()
  selectionId: number;

  @ApiProperty({ enum: ActionType })
  actionType: ActionType;

  @ApiProperty()
  notes: string;

  @ApiProperty()
  actionDate: Date;

  @ApiProperty()
  createdAt: Date;
}