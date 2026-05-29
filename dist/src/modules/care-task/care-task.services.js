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
exports.CareTaskService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const care_task_entity_1 = require("./entities/care-task.entity");
const taskStatus_enum_1 = require("./enums/taskStatus.enum");
const care_task_feedback_entity_1 = require("../care-task-feedback/entities/care-task-feedback.entity");
const feedbackAction_enum_1 = require("../care-task-feedback/enums/feedbackAction.enum");
let CareTaskService = class CareTaskService {
    constructor(careTaskRepo, feedbackRepo) {
        this.careTaskRepo = careTaskRepo;
        this.feedbackRepo = feedbackRepo;
    }
    async createTask(task) {
        const entity = this.careTaskRepo.create(task);
        return this.careTaskRepo.save(entity);
    }
    async createMany(tasks) {
        const entities = this.careTaskRepo.create(tasks);
        return this.careTaskRepo.save(entities);
    }
    async findByPlan(carePlanId) {
        return this.careTaskRepo.find({
            where: { carePlanId },
            order: { scheduledDate: 'ASC' },
        });
    }
    async updateStatus(taskId, status) {
        await this.careTaskRepo.update(taskId, { status });
    }
    async cancelPendingTasks(carePlanId) {
        await this.careTaskRepo.update({ carePlanId, status: taskStatus_enum_1.TaskStatus.PENDING }, { status: taskStatus_enum_1.TaskStatus.CANCELLED });
    }
    async findPendingTasks(carePlanId) {
        return this.careTaskRepo.find({
            where: {
                carePlanId,
                status: taskStatus_enum_1.TaskStatus.PENDING,
            },
        });
    }
    async completeTask(taskId, feedback) {
        const task = await this.careTaskRepo.findOne({ where: { id: taskId } });
        if (!task) {
            throw new common_1.NotFoundException(`Task ${taskId} not found`);
        }
        task.status = taskStatus_enum_1.TaskStatus.COMPLETED;
        task.completedAt = new Date();
        await this.careTaskRepo.save(task);
        if (feedback) {
            await this.createFeedback(taskId, feedback, feedbackAction_enum_1.FeedbackAction.COMPLETED);
        }
        return task;
    }
    async skipTask(taskId, reason) {
        const task = await this.careTaskRepo.findOne({ where: { id: taskId } });
        if (!task) {
            throw new common_1.NotFoundException(`Task ${taskId} not found`);
        }
        task.status = taskStatus_enum_1.TaskStatus.SKIPPED;
        await this.careTaskRepo.save(task);
        if (reason) {
            await this.createFeedback(taskId, reason, feedbackAction_enum_1.FeedbackAction.SKIPPED);
        }
        return task;
    }
    async getTodayTasks(userId) {
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('🎯 Protected Route Handler Executed: getTodayTasks');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('User ID from request: ', userId);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        return await this.careTaskRepo
            .createQueryBuilder('task')
            .innerJoin('task.carePlan', 'plan')
            .innerJoin('plan.userPlantSelection', 'selection')
            .innerJoin('selection.user', 'user')
            .where('user.id = :userId', { userId })
            .andWhere('task.scheduledDate >= :today', { today })
            .andWhere('task.scheduledDate < :tomorrow', { tomorrow })
            .andWhere('task.status = :status', { status: taskStatus_enum_1.TaskStatus.PENDING })
            .orderBy('task.optimalTime', 'ASC')
            .addOrderBy('task.scheduledDate', 'ASC')
            .getMany();
    }
    async getTaskUserId(taskId) {
        return await this.careTaskRepo
            .createQueryBuilder('task')
            .innerJoinAndSelect('task.carePlan', 'plan')
            .innerJoinAndSelect('plan.userPlantSelection', 'selection')
            .innerJoinAndSelect('selection.user', 'user')
            .where('task.id = :taskId', { taskId })
            .select('user.id', 'userId')
            .getRawOne();
    }
    async createFeedback(taskId, reason, feedbackAction) {
        const feedback = this.feedbackRepo.create({
            careTaskId: taskId,
            userId: 1,
            action: feedbackAction,
            reason,
            createdAt: new Date(),
        });
        return this.feedbackRepo.save(feedback);
    }
    async getTaskFeedback(taskId) {
        return this.feedbackRepo.find({
            where: { careTaskId: taskId },
            order: { createdAt: 'DESC' },
        });
    }
    async getSkippedTasksForRecalibration(carePlanId) {
        return this.careTaskRepo.find({
            where: {
                carePlanId,
                status: taskStatus_enum_1.TaskStatus.SKIPPED,
            },
            relations: ['feedbacks'],
        });
    }
};
exports.CareTaskService = CareTaskService;
exports.CareTaskService = CareTaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(care_task_entity_1.CareTask)),
    __param(1, (0, typeorm_1.InjectRepository)(care_task_feedback_entity_1.CareTaskFeedback)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CareTaskService);
//# sourceMappingURL=care-task.services.js.map