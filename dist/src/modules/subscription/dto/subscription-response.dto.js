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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSubscriptionResponseDto = exports.SubscriptionTierResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const subscription_status_enum_1 = require("../types/subscription-status.enum");
const billing_cycle_enum_1 = require("../types/billing-cycle.enum");
class SubscriptionTierResponseDto {
}
exports.SubscriptionTierResponseDto = SubscriptionTierResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SubscriptionTierResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SubscriptionTierResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SubscriptionTierResponseDto.prototype, "plantSlotLimit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SubscriptionTierResponseDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: billing_cycle_enum_1.BillingCycle }),
    __metadata("design:type", String)
], SubscriptionTierResponseDto.prototype, "billingCycle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], SubscriptionTierResponseDto.prototype, "features", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], SubscriptionTierResponseDto.prototype, "active", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], SubscriptionTierResponseDto.prototype, "createdAt", void 0);
class UserSubscriptionResponseDto {
}
exports.UserSubscriptionResponseDto = UserSubscriptionResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], UserSubscriptionResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], UserSubscriptionResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], UserSubscriptionResponseDto.prototype, "tierId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: subscription_status_enum_1.SubscriptionStatus }),
    __metadata("design:type", String)
], UserSubscriptionResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], UserSubscriptionResponseDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], UserSubscriptionResponseDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], UserSubscriptionResponseDto.prototype, "autoRenew", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => SubscriptionTierResponseDto }),
    __metadata("design:type", SubscriptionTierResponseDto)
], UserSubscriptionResponseDto.prototype, "tier", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], UserSubscriptionResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], UserSubscriptionResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=subscription-response.dto.js.map