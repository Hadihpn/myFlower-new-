"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const subscription_tier_entity_1 = require("./entities/subscription-tier.entity");
const user_subscription_entity_1 = require("./entities/user-subscription.entity");
const subscription_status_enum_1 = require("./types/subscription-status.enum");
const date_util_1 = require("../../common/utils/date.util");
let SubscriptionService = class SubscriptionService {
    constructor(tierRepository, subscriptionRepository) {
        this.tierRepository = tierRepository;
        this.subscriptionRepository = subscriptionRepository;
    }
    async createTier(createTierDto) {
        const existingTier = await this.tierRepository.findOne({
            where: { name: createTierDto.name },
        });
        if (existingTier) {
            throw new common_1.ConflictException('Subscription tier with this name already exists');
        }
        const tier = this.tierRepository.create(createTierDto);
        return this.tierRepository.save(tier);
    }
    async findAllTiers() {
        return this.tierRepository.find({
            where: { active: true },
            order: { price: 'ASC' },
        });
    }
    async findTierById(id) {
        const tier = await this.tierRepository.findOne({
            where: { id },
        });
        if (!tier) {
            throw new common_1.NotFoundException(`Subscription tier with ID ${id} not found`);
        }
        return tier;
    }
    async updateTier(id, updateTierDto) {
        const tier = await this.findTierById(id);
        Object.assign(tier, updateTierDto);
        return this.tierRepository.save(tier);
    }
    async deleteTier(id) {
        const tier = await this.findTierById(id);
        const activeSubscriptions = await this.subscriptionRepository.count({
            where: { tierId: id, status: subscription_status_enum_1.SubscriptionStatus.ACTIVE },
        });
        if (activeSubscriptions > 0) {
            throw new common_1.BadRequestException('Cannot delete tier with active subscriptions');
        }
        await this.tierRepository.remove(tier);
    }
    async subscribe(userId, subscribeDto) {
        const { tierId, autoRenew } = subscribeDto;
        await this.findTierById(tierId);
        const activeSubscription = await this.subscriptionRepository.findOne({
            where: { userId, status: subscription_status_enum_1.SubscriptionStatus.ACTIVE },
        });
        if (activeSubscription) {
            throw new common_1.ConflictException('User already has an active subscription');
        }
        const subscription = this.subscriptionRepository.create({
            userId,
            tierId,
            status: subscription_status_enum_1.SubscriptionStatus.PENDING,
            autoRenew: autoRenew ?? true,
        });
        return this.subscriptionRepository.save(subscription);
    }
    async activateSubscription(subscriptionId) {
        const subscription = await this.subscriptionRepository.findOne({
            where: { id: subscriptionId },
            relations: ['tier'],
        });
        if (!subscription) {
            throw new common_1.NotFoundException('Subscription not found');
        }
        const now = new Date();
        const endDate = date_util_1.DateUtil.addDays(now, 30);
        subscription.status = subscription_status_enum_1.SubscriptionStatus.ACTIVE;
        subscription.startDate = now;
        subscription.endDate = endDate;
        return this.subscriptionRepository.save(subscription);
    }
    async cancelSubscription(userId) {
        const subscription = await this.subscriptionRepository.findOne({
            where: { userId, status: subscription_status_enum_1.SubscriptionStatus.ACTIVE },
        });
        if (!subscription) {
            throw new common_1.NotFoundException('No active subscription found');
        }
        subscription.status = subscription_status_enum_1.SubscriptionStatus.CANCELLED;
        subscription.autoRenew = false;
        await this.subscriptionRepository.save(subscription);
    }
    async getUserSubscription(userId) {
        return this.subscriptionRepository.findOne({
            where: { userId },
            relations: ['tier'],
        });
    }
    async getUserActiveSubscription(userId) {
        return this.subscriptionRepository.findOne({
            where: { userId, status: subscription_status_enum_1.SubscriptionStatus.ACTIVE, endDate: (0, typeorm_2.MoreThanOrEqual)(new Date()) },
            relations: ['tier'],
        });
    }
    async getUserSubscriptionHistory(userId) {
        return this.subscriptionRepository.find({
            where: { userId },
            relations: ['tier'],
            order: { createdAt: 'DESC' },
        });
    }
    async checkUserPlantSlotLimit(userId) {
        const activeSubscription = await this.getUserActiveSubscription(userId);
        if (!activeSubscription) {
            return 0;
        }
        return activeSubscription.tier.plantSlotLimit;
    }
    async updateExpiredSubscriptions() {
        const now = new Date();
        const expiredSubscriptions = await this.subscriptionRepository
            .createQueryBuilder('subscription')
            .where('subscription.status = :status', {
            status: subscription_status_enum_1.SubscriptionStatus.ACTIVE,
        })
            .andWhere('subscription.end_date <= :now', { now })
            .getMany();
        for (const subscription of expiredSubscriptions) {
            subscription.status = subscription_status_enum_1.SubscriptionStatus.EXPIRED;
            await this.subscriptionRepository.save(subscription);
        }
    }
};
exports.SubscriptionService = SubscriptionService;
exports.SubscriptionService = SubscriptionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(subscription_tier_entity_1.SubscriptionTier)),
    __param(1, (0, typeorm_1.InjectRepository)(user_subscription_entity_1.UserSubscription)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SubscriptionService);
//# sourceMappingURL=subscription.service.js.map