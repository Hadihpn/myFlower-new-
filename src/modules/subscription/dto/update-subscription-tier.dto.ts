import { PartialType } from '@nestjs/swagger';
import { CreateSubscriptionTierDto } from './create-subscription-tier.dto';

export class UpdateSubscriptionTierDto extends PartialType(
  CreateSubscriptionTierDto,
) {}