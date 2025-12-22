import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus } from '../types/payment-status.enum';

export class PaymentResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  subscriptionId: number;

  @ApiProperty()
  amount: number;

  @ApiProperty({ enum: PaymentStatus })
  status: PaymentStatus;

  @ApiProperty()
  authority: string;

  @ApiProperty()
  refId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class PaymentUrlResponseDto {
  @ApiProperty()
  paymentUrl: string;

  @ApiProperty()
  authority: string;
}