import { SubscriptionStatus } from '../types/subscription-status.enum';
import { BillingCycle } from '../types/billing-cycle.enum';
export declare class SubscriptionTierResponseDto {
    id: number;
    name: string;
    plantSlotLimit: number;
    price: number;
    billingCycle: BillingCycle;
    features: Record<string, any>;
    active: boolean;
    createdAt: Date;
}
export declare class UserSubscriptionResponseDto {
    id: number;
    userId: number;
    tierId: number;
    status: SubscriptionStatus;
    startDate: Date;
    endDate: Date;
    autoRenew: boolean;
    tier: SubscriptionTierResponseDto;
    createdAt: Date;
    updatedAt: Date;
}
