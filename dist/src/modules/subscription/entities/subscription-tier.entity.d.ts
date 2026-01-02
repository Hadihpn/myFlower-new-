import { BillingCycle } from '../types/billing-cycle.enum';
import { UserSubscription } from './user-subscription.entity';
export declare class SubscriptionTier {
    id: number;
    name: string;
    plantSlotLimit: number;
    price: number;
    billingCycle: BillingCycle;
    features: Record<string, any>;
    active: boolean;
    createdAt: Date;
    subscriptions: UserSubscription[];
}
