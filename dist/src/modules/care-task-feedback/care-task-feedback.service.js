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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CareTaskFeedbackService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const care_task_feedback_entity_1 = require("./entities/care-task-feedback.entity");
const feedbackAction_enum_1 = require("./enums/feedbackAction.enum");
const care_task_services_1 = require("../care-task/care-task.services");
const taskStatus_enum_1 = require("../care-task/enums/taskStatus.enum");
let CareTaskFeedbackService = class CareTaskFeedbackService {
    constructor(feedbackRepository, careTaskService) {
        this.feedbackRepository = feedbackRepository;
        this.careTaskService = careTaskService;
    }
    async create(careTaskId, userId, action, reason, note) {
        console.log("task task create");
        const taskUserId = await this.careTaskService.getTaskUserId(careTaskId);
        console.log("task taskUserId : ", taskUserId);
        console.log("task userId : ", userId);
        if (!taskUserId || taskUserId != userId) {
            throw new common_1.UnauthorizedException('شما فقط مجاز به ثبت رخدادهای دستگاه خود میباشید.');
        }
        const feedback = this.feedbackRepository.create({
            careTaskId,
            userId,
            action,
            reason,
            note,
            createdAt: new Date(),
        });
        await this.careTaskService.updateStatus(careTaskId, taskStatus_enum_1.TaskStatus.COMPLETED);
        return this.feedbackRepository.save(feedback);
    }
    async findByTask(careTaskId) {
        return this.feedbackRepository.find({
            where: { careTaskId },
            relations: ['user', 'careTask'],
            order: { createdAt: 'DESC' },
        });
    }
    async findByUser(userId) {
        return this.feedbackRepository.find({
            where: { userId },
            relations: ['careTask'],
            order: { createdAt: 'DESC' },
        });
    }
    async findByTaskAndUser(careTaskId, userId) {
        return this.feedbackRepository.find({
            where: { careTaskId, userId },
            order: { createdAt: 'DESC' },
        });
    }
    async findByAction(action) {
        return this.feedbackRepository.find({
            where: { action },
            relations: ['careTask', 'user'],
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const feedback = await this.feedbackRepository.findOne({
            where: { id },
            relations: ['careTask', 'user'],
        });
        if (!feedback) {
            throw new common_1.NotFoundException(`Feedback with ID ${id} not found`);
        }
        return feedback;
    }
    async updateNote(id, note) {
        const feedback = await this.findOne(id);
        feedback.note = note;
        return this.feedbackRepository.save(feedback);
    }
    async delete(id) {
        const result = await this.feedbackRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Feedback with ID ${id} not found`);
        }
    }
    async getTaskFeedbackStats(careTaskId) {
        const feedbacks = await this.findByTask(careTaskId);
        const stats = {
            total: feedbacks.length,
            completed: feedbacks.filter((f) => f.action === feedbackAction_enum_1.FeedbackAction.COMPLETED).length,
            skipped: feedbacks.filter((f) => f.action === feedbackAction_enum_1.FeedbackAction.SKIPPED).length,
            byAction: {},
        };
        feedbacks.forEach((f) => {
            stats.byAction[f.action] = (stats.byAction[f.action] || 0) + 1;
        });
        return stats;
    }
    async getUserFeedbackStats(userId) {
        const feedbacks = await this.findByUser(userId);
        const stats = {
            total: feedbacks.length,
            completed: feedbacks.filter((f) => f.action === feedbackAction_enum_1.FeedbackAction.COMPLETED).length,
            skipped: feedbacks.filter((f) => f.action === feedbackAction_enum_1.FeedbackAction.SKIPPED).length,
            byAction: {},
        };
        feedbacks.forEach((f) => {
            stats.byAction[f.action] = (stats.byAction[f.action] || 0) + 1;
        });
        return stats;
    }
};
exports.CareTaskFeedbackService = CareTaskFeedbackService;
exports.CareTaskFeedbackService = CareTaskFeedbackService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(care_task_feedback_entity_1.CareTaskFeedback)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, care_task_services_1.CareTaskService])
], CareTaskFeedbackService);
//# sourceMappingURL=care-task-feedback.service.js.map