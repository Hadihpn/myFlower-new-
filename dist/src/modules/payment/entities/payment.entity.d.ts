import { User } from '@modules/users/entities/user.entity';
import { UserSubscription } from '@modules/subscription/entities/user-subscription.entity';
import { PaymentStatus } from '../types/payment-status.enum';
export declare class Payment {
    id: number;
    userId: number;
    subscriptionId: number;
    amount: number;
    status: PaymentStatus;
    authority: string;
    refId: string;
    cardPan: string;
    metadata: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    subscription: UserSubscription;
}
