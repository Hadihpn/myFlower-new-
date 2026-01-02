import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionTierDto } from './dto/create-subscription-tier.dto';
import { UpdateSubscriptionTierDto } from './dto/update-subscription-tier.dto';
import { SubscribeDto } from './dto/subscribe.dto';
export declare class SubscriptionController {
    private readonly subscriptionService;
    constructor(subscriptionService: SubscriptionService);
    createTier(createTierDto: CreateSubscriptionTierDto): Promise<import("./entities/subscription-tier.entity").SubscriptionTier>;
    findAllTiers(): Promise<import("./entities/subscription-tier.entity").SubscriptionTier[]>;
    findTierById(id: number): Promise<import("./entities/subscription-tier.entity").SubscriptionTier>;
    updateTier(id: number, updateTierDto: UpdateSubscriptionTierDto): Promise<import("./entities/subscription-tier.entity").SubscriptionTier>;
    deleteTier(id: number): Promise<void>;
    subscribe(userId: number, subscribeDto: SubscribeDto): Promise<import("./entities/user-subscription.entity").UserSubscription>;
    getMySubscription(userId: number): Promise<import("./entities/user-subscription.entity").UserSubscription>;
    getMyHistory(userId: number): Promise<import("./entities/user-subscription.entity").UserSubscription[]>;
    cancelSubscription(userId: number): Promise<void>;
    getMyPlantSlots(userId: number): Promise<{
        plantSlots: number;
    }>;
}
