import { ApiProperty } from '@nestjs/swagger';
import { HealthStatus } from '../types/health-status.enum';
import { AdvicePriority } from '../types/advice-priority.enum';

export class AdviceItemDto {
  @ApiProperty()
  priority: AdvicePriority;

  @ApiProperty()
  message: string;

  @ApiProperty()
  reason: string;
}

export class AdviceResponseDto {
  @ApiProperty()
  selectionId: number;

  @ApiProperty()
  healthStatus: HealthStatus;

  @ApiProperty()
  healthScore: number;

  @ApiProperty({ type: [AdviceItemDto] })
  advice: AdviceItemDto[];

  @ApiProperty()
  currentConditions: {
    temperature: number;
    moisture: number;
    light: number;
  };

  @ApiProperty()
  idealConditions: any;

  @ApiProperty()
  lastWatered: Date;

  @ApiProperty()
  lastFertilized: Date;
}
