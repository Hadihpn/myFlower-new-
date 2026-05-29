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
exports.CareTaskController = void 0;
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const common_1 = require("@nestjs/common");
const care_task_services_1 = require("./care-task.services");
const complete_task_dto_1 = require("./dto/complete-task.dto");
const skip_task_dto_1 = require("./dto/skip-task.dto");
const update_task_status_dto_1 = require("./dto/update-task-status.dto");
const create_task_feedback_dto_1 = require("./dto/create-task-feedback.dto");
const swagger_1 = require("@nestjs/swagger");
let CareTaskController = class CareTaskController {
    constructor(careTaskService) {
        this.careTaskService = careTaskService;
    }
    async getTodayTasks(req) {
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('🎯 Protected Route Handler Executed: getTodayTasks');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        return this.careTaskService.getTodayTasks(req.user.id);
    }
    async getTasksByPlan(carePlanId) {
        return this.careTaskService.findByPlan(carePlanId);
    }
    async getPendingTasks(carePlanId) {
        return this.careTaskService.findPendingTasks(carePlanId);
    }
    async completeTask(taskId, dto) {
        return this.careTaskService.completeTask(taskId, dto.feedback);
    }
    async skipTask(taskId, dto) {
        return this.careTaskService.skipTask(taskId, dto.reason);
    }
    async updateTaskStatus(taskId, dto) {
        return this.careTaskService.updateStatus(taskId, dto.status);
    }
    async createFeedback(taskId, dto) {
        return this.careTaskService.createFeedback(taskId, dto.reason, dto.action);
    }
    async cancelPendingTasks(carePlanId) {
        await this.careTaskService.cancelPendingTasks(carePlanId);
        return { message: 'Pending tasks cancelled successfully' };
    }
};
exports.CareTaskController = CareTaskController;
__decorate([
    (0, common_1.Get)('today'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CareTaskController.prototype, "getTodayTasks", null);
__decorate([
    (0, common_1.Get)('plan/:carePlanId'),
    __param(0, (0, common_1.Param)('carePlanId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CareTaskController.prototype, "getTasksByPlan", null);
__decorate([
    (0, common_1.Get)('plan/:carePlanId/pending'),
    __param(0, (0, common_1.Param)('carePlanId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CareTaskController.prototype, "getPendingTasks", null);
__decorate([
    (0, common_1.Post)(':id/complete'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, complete_task_dto_1.CompleteTaskDto]),
    __metadata("design:returntype", Promise)
], CareTaskController.prototype, "completeTask", null);
__decorate([
    (0, common_1.Post)(':id/skip'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, skip_task_dto_1.SkipTaskDto]),
    __metadata("design:returntype", Promise)
], CareTaskController.prototype, "skipTask", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_task_status_dto_1.UpdateTaskStatusDto]),
    __metadata("design:returntype", Promise)
], CareTaskController.prototype, "updateTaskStatus", null);
__decorate([
    (0, common_1.Post)(':id/feedback'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_task_feedback_dto_1.CreateTaskFeedbackDto]),
    __metadata("design:returntype", Promise)
], CareTaskController.prototype, "createFeedback", null);
__decorate([
    (0, common_1.Post)('plan/:carePlanId/cancel-pending'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('carePlanId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CareTaskController.prototype, "cancelPendingTasks", null);
exports.CareTaskController = CareTaskController = __decorate([
    (0, common_1.Controller)('care-tasks'),
    (0, swagger_1.ApiTags)('Care Tasks'),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [care_task_services_1.CareTaskService])
], CareTaskController);
//# sourceMappingURL=care-task.controller.js.map