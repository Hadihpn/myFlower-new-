import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaymentRequestDto {
  @ApiProperty({ example: 1, description: 'Subscription ID' })
  @IsInt()
  @IsNotEmpty()
  subscriptionId: number;
}