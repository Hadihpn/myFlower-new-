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
var CarePlanController_1;
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarePlanController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const care_plan_entity_1 = require("./entities/care-plan.entity");
const care_plan_services_1 = require("./care-plan.services");
const express_1 = require("express");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
let CarePlanController = CarePlanController_1 = class CarePlanController {
    constructor(carePlanService) {
        this.carePlanService = carePlanService;
        this.logger = new common_1.Logger(CarePlanController_1.name);
    }
    async createInitialCarePlan(req, userPlantSelectionId) {
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('🎯 Protected Route Handler Executed');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        if (!req.user) {
            console.error('❌ CRITICAL: req.user is undefined!');
            console.error('   - This should never happen if Guard works correctly');
            throw new common_1.UnauthorizedException('Authentication failed');
        }
        console.log('✅ Authenticated user attached to request:');
        console.debug(JSON.stringify(req.user, null, 2));
        console.debug(`   - Full Name: ${req.user}`);
        return this.carePlanService.createInitialPlan(userPlantSelectionId);
    }
    async recalibratePlan(carePlanId) {
        console.log(`Triggering AI recalibration for care plan ${carePlanId}`);
        return this.carePlanService.triggerAiRecalibration(carePlanId);
    }
    async cancelPlan(userPlantSelectionId) {
        this.logger.log(`Cancelling care plan for user plant selection ${userPlantSelectionId}`);
        await this.carePlanService.cancelCurrentPlan(userPlantSelectionId);
        return { message: 'Care plan cancelled successfully' };
    }
};
exports.CarePlanController = CarePlanController;
__decorate([
    (0, common_1.Post)(':userPlantSelectionId/initial'),
    (0, swagger_1.ApiOperation)({
        summary: 'Create initial care plan',
        description: 'Creates an initial care plan for a user plant selection. Uses AI if device has 7+ days of sensor data, otherwise uses rule-based generation.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'userPlantSelectionId',
        type: 'number',
        description: 'ID of the user plant selection',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Care plan created successfully', type: care_plan_entity_1.CarePlan }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'UserPlantSelection not found' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('userPlantSelectionId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _a : Object, Number]),
    __metadata("design:returntype", Promise)
], CarePlanController.prototype, "createInitialCarePlan", null);
__decorate([
    (0, common_1.Post)(':carePlanId/recalibrate'),
    (0, swagger_1.ApiOperation)({
        summary: 'Trigger AI recalibration',
        description: 'Cancels current plan and generates a new AI-based plan with user feedback from skipped tasks.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'carePlanId',
        type: 'number',
        description: 'ID of the care plan to recalibrate',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Care plan recalibrated successfully', type: care_plan_entity_1.CarePlan }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Care plan not found' }),
    __param(0, (0, common_1.Param)('carePlanId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CarePlanController.prototype, "recalibratePlan", null);
__decorate([
    (0, common_1.Post)(':userPlantSelectionId/cancel'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Cancel current care plan',
        description: 'Cancels the active care plan for a user plant selection.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'userPlantSelectionId',
        type: 'number',
        description: 'ID of the user plant selection',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Care plan cancelled successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'No active care plan found' }),
    __param(0, (0, common_1.Param)('userPlantSelectionId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CarePlanController.prototype, "cancelPlan", null);
exports.CarePlanController = CarePlanController = CarePlanController_1 = __decorate([
    (0, swagger_1.ApiTags)('care-plans'),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, common_1.Controller)('care-plans'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [care_plan_services_1.CarePlanService])
], CarePlanController);
//# sourceMappingURL=care-plan.controller.js.map