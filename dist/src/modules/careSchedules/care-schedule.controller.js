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
exports.CareScheduleController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const care_schedule_service_1 = require("./care-schedule.service");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
let CareScheduleController = class CareScheduleController {
    constructor(careScheduleService) {
        this.careScheduleService = careScheduleService;
    }
    async generateSchedule(req, deviceId) {
        return this.careScheduleService.generateAdaptiveSchedule(req.user.id, deviceId);
    }
    async getLatestSchedule(req, deviceId) {
        return this.careScheduleService.getLatestSchedule(req.user.id, deviceId);
    }
};
exports.CareScheduleController = CareScheduleController;
__decorate([
    (0, common_1.Post)('generate'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'تولید برنامه مراقبت هوشمند',
        description: 'اگر بیش از 10 UserAction وجود داشته باشد، از AI استفاده می‌شود، در غیر این صورت از قوانین پایه'
    }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            required: ['deviceId'],
            properties: {
                deviceId: {
                    type: 'string',
                    description: 'شناسه دستگاه سنسور',
                    example: 'test-device-001',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'برنامه مراقبت با موفقیت تولید شد',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'دستگاه یافت نشد یا انتخاب گیاه فعالی برای این دستگاه وجود ندارد'
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'عدم احراز هویت' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)('deviceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CareScheduleController.prototype, "generateSchedule", null);
__decorate([
    (0, common_1.Get)('latest/:deviceId'),
    (0, swagger_1.ApiOperation)({
        summary: 'دریافت آخرین برنامه مراقبت فعال',
        description: 'آخرین برنامه مراقبت با وضعیت ACTIVE برای دستگاه مشخص شده'
    }),
    (0, swagger_1.ApiParam)({
        name: 'deviceId',
        type: String,
        description: 'شناسه دستگاه سنسور',
        example: 'test-device-001',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'آخرین برنامه مراقبت فعال',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'دستگاه یافت نشد یا برنامه مراقبت فعالی وجود ندارد'
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'عدم احراز هویت' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('deviceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CareScheduleController.prototype, "getLatestSchedule", null);
exports.CareScheduleController = CareScheduleController = __decorate([
    (0, swagger_1.ApiTags)('Care Schedules'),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, common_1.Controller)('care-schedules'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [care_schedule_service_1.CareScheduleService])
], CareScheduleController);
//# sourceMappingURL=care-schedule.controller.js.map