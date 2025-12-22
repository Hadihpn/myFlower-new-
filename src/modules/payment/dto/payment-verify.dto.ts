import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaymentVerifyDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  authority: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  status: string;
}
