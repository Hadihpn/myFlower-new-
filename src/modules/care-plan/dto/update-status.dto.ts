// src/modules/care-plan/dto/update-status.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { CarePlanStatus } from '../enums/carePlanStatus.enum';

export class UpdateStatusDto {
  @ApiProperty({
    enum: CarePlanStatus,
    description: 'New status for the care plan',
    example: CarePlanStatus.COMPLETED,
  })
  @IsEnum(CarePlanStatus)
  status: CarePlanStatus;
}
