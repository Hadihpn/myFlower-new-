import { ApiProperty } from '@nestjs/swagger';
import { SubscriptionStatus } from '../types/subscription-status.enum';
import { BillingCycle } from '../types/billing-cycle.enum';

export class SubscriptionTierResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  plantSlotLimit: number;

  @ApiProperty()
  price: number;

  @ApiProperty({ enum: BillingCycle })
  billingCycle: BillingCycle;

  @ApiProperty()
  features: Record<string, any>;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  createdAt: Date;
}

export class UserSubscriptionResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  tierId: number;

  @ApiProperty({ enum: SubscriptionStatus })
  status: SubscriptionStatus;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;

  @ApiProperty()
  autoRenew: boolean;

  @ApiProperty({ type: () => SubscriptionTierResponseDto })
  tier: SubscriptionTierResponseDto;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
