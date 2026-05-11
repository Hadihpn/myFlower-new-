import { CarePlan } from './care-plan.entity';
import { User } from '@/modules/users/entities/user.entity';
export declare class CarePlanFeedback {
    id: number;
    carePlanId: number;
    userId: number;
    feedback: string;
    triggeredRegeneration: boolean;
    carePlan: CarePlan;
    user: User;
    createdAt: Date;
}
