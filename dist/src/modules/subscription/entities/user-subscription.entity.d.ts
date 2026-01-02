import { User } from '@modules/users/entities/user.entity';
import { SubscriptionTier } from './subscription-tier.entity';
import { SubscriptionStatus } from '../types/subscription-status.enum';
export declare class UserSubscription {
    id: number;
    userId: number;
    tierId: number;
    status: SubscriptionStatus;
    startDate: Date;
    endDate: Date;
    autoRenew: boolean;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    tier: SubscriptionTier;
}
