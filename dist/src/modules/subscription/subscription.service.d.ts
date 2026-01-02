import { Repository } from 'typeorm';
import { SubscriptionTier } from './entities/subscription-tier.entity';
import { UserSubscription } from './entities/user-subscription.entity';
import { CreateSubscriptionTierDto } from './dto/create-subscription-tier.dto';
import { UpdateSubscriptionTierDto } from './dto/update-subscription-tier.dto';
import { SubscribeDto } from './dto/subscribe.dto';
export declare class SubscriptionService {
    private tierRepository;
    private subscriptionRepository;
    constructor(tierRepository: Repository<SubscriptionTier>, subscriptionRepository: Repository<UserSubscription>);
    createTier(createTierDto: CreateSubscriptionTierDto): Promise<SubscriptionTier>;
    findAllTiers(): Promise<SubscriptionTier[]>;
    findTierById(id: number): Promise<SubscriptionTier>;
    updateTier(id: number, updateTierDto: UpdateSubscriptionTierDto): Promise<SubscriptionTier>;
    deleteTier(id: number): Promise<void>;
    subscribe(userId: number, subscribeDto: SubscribeDto): Promise<UserSubscription>;
    activateSubscription(subscriptionId: number): Promise<UserSubscription>;
    cancelSubscription(userId: number): Promise<void>;
    getUserSubscription(userId: number): Promise<UserSubscription | null>;
    getUserActiveSubscription(userId: number): Promise<UserSubscription | null>;
    getUserSubscriptionHistory(userId: number): Promise<UserSubscription[]>;
    checkUserPlantSlotLimit(userId: number): Promise<number>;
    updateExpiredSubscriptions(): Promise<void>;
}
