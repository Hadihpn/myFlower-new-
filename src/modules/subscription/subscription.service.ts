import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubscriptionTier } from './entities/subscription-tier.entity';
import { UserSubscription } from './entities/user-subscription.entity';
import { CreateSubscriptionTierDto } from './dto/create-subscription-tier.dto';
import { UpdateSubscriptionTierDto } from './dto/update-subscription-tier.dto';
import { SubscribeDto } from './dto/subscribe.dto';
import { SubscriptionStatus } from './types/subscription-status.enum';
import { DateUtil } from '@common/utils/date.util';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(SubscriptionTier)
    private tierRepository: Repository<SubscriptionTier>,
    @InjectRepository(UserSubscription)
    private subscriptionRepository: Repository<UserSubscription>,
  ) {}

  // Tier Management (Admin)
  async createTier(
    createTierDto: CreateSubscriptionTierDto,
  ): Promise<SubscriptionTier> {
    const existingTier = await this.tierRepository.findOne({
      where: { name: createTierDto.name },
    });

    if (existingTier) {
      throw new ConflictException('Subscription tier with this name already exists');
    }

    const tier = this.tierRepository.create(createTierDto);
    return this.tierRepository.save(tier);
  }

  async findAllTiers(): Promise<SubscriptionTier[]> {
    return this.tierRepository.find({
      where: { active: true },
      order: { price: 'ASC' },
    });
  }

  async findTierById(id: number): Promise<SubscriptionTier> {
    const tier = await this.tierRepository.findOne({
      where: { id },
    });

    if (!tier) {
      throw new NotFoundException(`Subscription tier with ID ${id} not found`);
    }

    return tier;
  }

  async updateTier(
    id: number,
    updateTierDto: UpdateSubscriptionTierDto,
  ): Promise<SubscriptionTier> {
    const tier = await this.findTierById(id);

    Object.assign(tier, updateTierDto);
    return this.tierRepository.save(tier);
  }

  async deleteTier(id: number): Promise<void> {
    const tier = await this.findTierById(id);

    // Check if tier has active subscriptions
    const activeSubscriptions = await this.subscriptionRepository.count({
      where: { tierId: id, status: SubscriptionStatus.ACTIVE },
    });

    if (activeSubscriptions > 0) {
      throw new BadRequestException(
        'Cannot delete tier with active subscriptions',
      );
    }

    await this.tierRepository.remove(tier);
  }

  // User Subscription Management
  async subscribe(userId: number, subscribeDto: SubscribeDto): Promise<UserSubscription> {
    const { tierId, autoRenew } = subscribeDto;

    // Verify tier exists
    await this.findTierById(tierId);

    // Check if user already has an active subscription
    const activeSubscription = await this.subscriptionRepository.findOne({
      where: { userId, status: SubscriptionStatus.ACTIVE },
    });

    if (activeSubscription) {
      throw new ConflictException('User already has an active subscription');
    }

    // Create pending subscription (will be activated after payment)
    const subscription = this.subscriptionRepository.create({
      userId,
      tierId,
      status: SubscriptionStatus.PENDING,
      autoRenew: autoRenew ?? true,
    });

    return this.subscriptionRepository.save(subscription);
  }

  async activateSubscription(subscriptionId: number): Promise<UserSubscription> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { id: subscriptionId },
      relations: ['tier'],
    });

    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    const now = new Date();
    const endDate = DateUtil.addDays(now, 30); // 30 days for monthly

    subscription.status = SubscriptionStatus.ACTIVE;
    subscription.startDate = now;
    subscription.endDate = endDate;

    return this.subscriptionRepository.save(subscription);
  }

  async cancelSubscription(userId: number): Promise<void> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { userId, status: SubscriptionStatus.ACTIVE },
    });

    if (!subscription) {
      throw new NotFoundException('No active subscription found');
    }

    subscription.status = SubscriptionStatus.CANCELLED;
    subscription.autoRenew = false;

    await this.subscriptionRepository.save(subscription);
  }

  async getUserActiveSubscription(userId: number): Promise<UserSubscription | null> {
    return this.subscriptionRepository.findOne({
      where: { userId, status: SubscriptionStatus.ACTIVE },
      relations: ['tier'],
    });
  }

  async getUserSubscriptionHistory(userId: number): Promise<UserSubscription[]> {
    return this.subscriptionRepository.find({
      where: { userId },
      relations: ['tier'],
      order: { createdAt: 'DESC' },
    });
  }

  async checkUserPlantSlotLimit(userId: number): Promise<number> {
    const activeSubscription = await this.getUserActiveSubscription(userId);

    if (!activeSubscription) {
      return 0; // No subscription, no slots
    }

    return activeSubscription.tier.plantSlotLimit;
  }

  // Cron job to check and update expired subscriptions
  async updateExpiredSubscriptions(): Promise<void> {
    const now = new Date();

    const expiredSubscriptions = await this.subscriptionRepository
      .createQueryBuilder('subscription')
      .where('subscription.status = :status', {
        status: SubscriptionStatus.ACTIVE,
      })
      .andWhere('subscription.end_date <= :now', { now })
      .getMany();

    for (const subscription of expiredSubscriptions) {
      subscription.status = SubscriptionStatus.EXPIRED;
      await this.subscriptionRepository.save(subscription);
    }
  }
}