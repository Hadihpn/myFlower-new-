import { BillingCycle } from '../types/billing-cycle.enum';
export declare class CreateSubscriptionTierDto {
    name: string;
    plantSlotLimit: number;
    price: number;
    billingCycle: BillingCycle;
    features?: Record<string, any>;
    active?: boolean;
}
