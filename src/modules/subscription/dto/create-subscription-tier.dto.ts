import {
  IsString,
  IsNotEmpty,
  IsInt,
  Min,
  IsNumber,
  IsEnum,
  IsOptional,
  IsBoolean,
  IsObject,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BillingCycle } from '../types/billing-cycle.enum';

export class CreateSubscriptionTierDto {
  @ApiProperty({ example: 'Bronze' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 3, description: 'Number of plant slots allowed' })
  @IsInt()
  @Min(1)
  plantSlotLimit: number;

  @ApiProperty({ example: 5.0 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ enum: BillingCycle, default: BillingCycle.MONTHLY })
  @IsEnum(BillingCycle)
  billingCycle: BillingCycle;

  @ApiPropertyOptional({
    example: { support: '24/7', analytics: true },
  })
  @IsOptional()
  @IsObject()
  features?: Record<string, any>;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
