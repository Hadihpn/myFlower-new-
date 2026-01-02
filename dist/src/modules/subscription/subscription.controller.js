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
exports.SubscriptionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const subscription_service_1 = require("./subscription.service");
const create_subscription_tier_dto_1 = require("./dto/create-subscription-tier.dto");
const update_subscription_tier_dto_1 = require("./dto/update-subscription-tier.dto");
const subscribe_dto_1 = require("./dto/subscribe.dto");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const roles_guard_1 = require("../../common/guards/roles.guard");
const user_role_enum_1 = require("../users/types/user-role.enum");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const public_decorator_1 = require("../../common/decorators/public.decorator");
let SubscriptionController = class SubscriptionController {
    constructor(subscriptionService) {
        this.subscriptionService = subscriptionService;
    }
    createTier(createTierDto) {
        return this.subscriptionService.createTier(createTierDto);
    }
    findAllTiers() {
        return this.subscriptionService.findAllTiers();
    }
    findTierById(id) {
        return this.subscriptionService.findTierById(id);
    }
    updateTier(id, updateTierDto) {
        return this.subscriptionService.updateTier(id, updateTierDto);
    }
    deleteTier(id) {
        return this.subscriptionService.deleteTier(id);
    }
    subscribe(userId, subscribeDto) {
        return this.subscriptionService.subscribe(userId, subscribeDto);
    }
    getMySubscription(userId) {
        return this.subscriptionService.getUserActiveSubscription(userId);
    }
    getMyHistory(userId) {
        return this.subscriptionService.getUserSubscriptionHistory(userId);
    }
    cancelSubscription(userId) {
        return this.subscriptionService.cancelSubscription(userId);
    }
    async getMyPlantSlots(userId) {
        const slots = await this.subscriptionService.checkUserPlantSlotLimit(userId);
        return { plantSlots: slots };
    }
};
exports.SubscriptionController = SubscriptionController;
__decorate([
    (0, common_1.Post)('tiers'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Create subscription tier (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Tier created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_subscription_tier_dto_1.CreateSubscriptionTierDto]),
    __metadata("design:returntype", void 0)
], SubscriptionController.prototype, "createTier", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('tiers'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active subscription tiers' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of tiers' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SubscriptionController.prototype, "findAllTiers", null);
__decorate([
    (0, common_1.Get)('tiers/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get subscription tier by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Tier found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SubscriptionController.prototype, "findTierById", null);
__decorate([
    (0, common_1.Patch)('tiers/:id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Update subscription tier (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Tier updated successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_subscription_tier_dto_1.UpdateSubscriptionTierDto]),
    __metadata("design:returntype", void 0)
], SubscriptionController.prototype, "updateTier", null);
__decorate([
    (0, common_1.Delete)('tiers/:id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Delete subscription tier (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Tier deleted successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SubscriptionController.prototype, "deleteTier", null);
__decorate([
    (0, common_1.Post)('subscribe'),
    (0, swagger_1.ApiOperation)({ summary: 'Subscribe to a tier' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Subscription created (pending payment)',
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, subscribe_dto_1.SubscribeDto]),
    __metadata("design:returntype", void 0)
], SubscriptionController.prototype, "subscribe", null);
__decorate([
    (0, common_1.Get)('my-subscription'),
    (0, swagger_1.ApiOperation)({ summary: 'Get current active subscription' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Active subscription details' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SubscriptionController.prototype, "getMySubscription", null);
__decorate([
    (0, common_1.Get)('my-history'),
    (0, swagger_1.ApiOperation)({ summary: 'Get subscription history' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Subscription history' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SubscriptionController.prototype, "getMyHistory", null);
__decorate([
    (0, common_1.Post)('cancel'),
    (0, swagger_1.ApiOperation)({ summary: 'Cancel active subscription' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Subscription cancelled' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SubscriptionController.prototype, "cancelSubscription", null);
__decorate([
    (0, common_1.Get)('my-plant-slots'),
    (0, swagger_1.ApiOperation)({ summary: 'Get available plant slots' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Number of available plant slots' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SubscriptionController.prototype, "getMyPlantSlots", null);
exports.SubscriptionController = SubscriptionController = __decorate([
    (0, swagger_1.ApiTags)('Subscription'),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, common_1.Controller)('subscription'),
    __metadata("design:paramtypes", [subscription_service_1.SubscriptionService])
], SubscriptionController);
//# sourceMappingURL=subscription.controller.js.map