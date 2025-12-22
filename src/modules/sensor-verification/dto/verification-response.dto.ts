import { ApiProperty } from '@nestjs/swagger';
import { VerificationStatus } from '../types/verification-status.enum';
import { ChangeType } from '../types/change-type.enum';
import { Confidence } from '../types/confidence.enum';

export class VerificationResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  deviceId: number;

  @ApiProperty()
  triggerReadingId: number;

  @ApiProperty({ enum: VerificationStatus })
  status: VerificationStatus;

  @ApiProperty({ enum: ChangeType })
  changeType: ChangeType;

  @ApiProperty()
  changeMagnitude: number;

  @ApiProperty()
  verificationReadings: any[];

  @ApiProperty()
  confirmed: boolean;

  @ApiProperty({ enum: Confidence })
  confidence: Confidence;

  @ApiProperty()
  requestedAt: Date;

  @ApiProperty()
  completedAt: Date;

  @ApiProperty()
  expiresAt: Date;
}
