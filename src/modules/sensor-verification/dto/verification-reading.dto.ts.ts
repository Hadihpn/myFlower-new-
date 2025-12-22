import { ApiProperty } from '@nestjs/swagger';

export class VerificationReadingDto {
  @ApiProperty()
  temperature: number;

  @ApiProperty()
  moisture: number;

  @ApiProperty()
  light: number;

  @ApiProperty()
  timestamp: Date;
}