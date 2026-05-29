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
exports.CareTaskFeedbackController = void 0;
const common_1 = require("@nestjs/common");
const care_task_feedback_service_1 = require("./care-task-feedback.service");
const create_task_feedback_dto_1 = require("./dto/create-task-feedback.dto");
const update_feedback_note_dto_1 = require("./dto/update-feedback-note.dto");
const feedbackAction_enum_1 = require("./enums/feedbackAction.enum");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
let CareTaskFeedbackController = class CareTaskFeedbackController {
    constructor(feedbackService) {
        this.feedbackService = feedbackService;
    }
    async create(createDto, req) {
        console.log("Request user", req.user);
        console.log("userId");
        await this.feedbackService.create(createDto.careTaskId, req.user.id, createDto.action, createDto.reason, createDto.note);
        return;
    }
    async findByTask(careTaskId) {
        return this.feedbackService.findByTask(careTaskId);
    }
    async findByUser(userId) {
        return this.feedbackService.findByUser(userId);
    }
    async findByTaskAndUser(careTaskId, userId) {
        return this.feedbackService.findByTaskAndUser(careTaskId, userId);
    }
    async findByAction(action) {
        return this.feedbackService.findByAction(action);
    }
    async getTaskStats(careTaskId) {
        return this.feedbackService.getTaskFeedbackStats(careTaskId);
    }
    async getUserStats(userId) {
        return this.feedbackService.getUserFeedbackStats(userId);
    }
    async findOne(id) {
        return this.feedbackService.findOne(id);
    }
    async updateNote(id, updateDto) {
        return this.feedbackService.updateNote(id, updateDto.note);
    }
    async delete(id) {
        await this.feedbackService.delete(id);
        return { message: 'Feedback deleted successfully' };
    }
};
exports.CareTaskFeedbackController = CareTaskFeedbackController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Submit feedback for a care task' }),
    (0, swagger_1.ApiBody)({ type: create_task_feedback_dto_1.CreateTaskFeedbackDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Feedback created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input data' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_feedback_dto_1.CreateTaskFeedbackDto, Object]),
    __metadata("design:returntype", Promise)
], CareTaskFeedbackController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('task/:careTaskId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all feedbacks for a specific care task' }),
    (0, swagger_1.ApiParam)({ name: 'careTaskId', type: Number, description: 'Care task ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of feedbacks for the task' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Care task not found' }),
    __param(0, (0, common_1.Param)('careTaskId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CareTaskFeedbackController.prototype, "findByTask", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all feedbacks submitted by a specific user' }),
    (0, swagger_1.ApiParam)({ name: 'userId', type: Number, description: 'User ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of feedbacks by the user' }),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CareTaskFeedbackController.prototype, "findByUser", null);
__decorate([
    (0, common_1.Get)('task/:careTaskId/user/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get feedbacks for a specific task by a specific user' }),
    (0, swagger_1.ApiParam)({ name: 'careTaskId', type: Number, description: 'Care task ID' }),
    (0, swagger_1.ApiParam)({ name: 'userId', type: Number, description: 'User ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Feedback record found' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not found' }),
    __param(0, (0, common_1.Param)('careTaskId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], CareTaskFeedbackController.prototype, "findByTaskAndUser", null);
__decorate([
    (0, common_1.Get)('action/:action'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all feedbacks filtered by action type' }),
    (0, swagger_1.ApiParam)({ name: 'action', enum: feedbackAction_enum_1.FeedbackAction, description: 'Feedback action (e.g. DONE, SKIPPED)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of feedbacks with the given action' }),
    __param(0, (0, common_1.Param)('action')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CareTaskFeedbackController.prototype, "findByAction", null);
__decorate([
    (0, common_1.Get)('task/:careTaskId/stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get feedback statistics for a specific care task' }),
    (0, swagger_1.ApiParam)({ name: 'careTaskId', type: Number, description: 'Care task ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Feedback stats for the task' }),
    __param(0, (0, common_1.Param)('careTaskId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CareTaskFeedbackController.prototype, "getTaskStats", null);
__decorate([
    (0, common_1.Get)('user/:userId/stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get feedback statistics for a specific user' }),
    (0, swagger_1.ApiParam)({ name: 'userId', type: Number, description: 'User ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Feedback stats for the user' }),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CareTaskFeedbackController.prototype, "getUserStats", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a single feedback record by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'Feedback record ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Feedback record found' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Feedback not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CareTaskFeedbackController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/note'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_feedback_note_dto_1.UpdateFeedbackNoteDto]),
    __metadata("design:returntype", Promise)
], CareTaskFeedbackController.prototype, "updateNote", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CareTaskFeedbackController.prototype, "delete", null);
exports.CareTaskFeedbackController = CareTaskFeedbackController = __decorate([
    (0, common_1.Controller)('care-task-feedback'),
    (0, swagger_1.ApiTags)('care-task-feedback'),
    (0, swagger_1.ApiBearerAuth)("JWT"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [care_task_feedback_service_1.CareTaskFeedbackService])
], CareTaskFeedbackController);
//# sourceMappingURL=care-task-feedback.controller.js.map