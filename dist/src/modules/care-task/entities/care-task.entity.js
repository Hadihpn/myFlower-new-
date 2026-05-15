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
exports.CareTask = void 0;
const typeorm_1 = require("typeorm");
const taskType_enum_1 = require("../enums/taskType.enum");
const optimalType_enum_1 = require("../enums/optimalType.enum");
const taskStatus_enum_1 = require("../enums/taskStatus.enum");
const care_plan_entity_1 = require("../../care-plan/entities/care-plan.entity");
const care_task_feedback_entity_1 = require("../../care-task-feedback/entities/care-task-feedback.entity");
let CareTask = class CareTask {
};
exports.CareTask = CareTask;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CareTask.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'care_plan_id' }),
    __metadata("design:type", Number)
], CareTask.prototype, "carePlanId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: taskType_enum_1.TaskType,
        name: 'task_type',
    }),
    __metadata("design:type", String)
], CareTask.prototype, "taskType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'scheduled_date', type: 'date' }),
    __metadata("design:type", Date)
], CareTask.prototype, "scheduledDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: optimalType_enum_1.OptimalTime,
        name: 'optimal_time',
        nullable: true,
    }),
    __metadata("design:type", String)
], CareTask.prototype, "optimalTime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: taskStatus_enum_1.TaskStatus,
        default: taskStatus_enum_1.TaskStatus.PENDING,
    }),
    __metadata("design:type", String)
], CareTask.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], CareTask.prototype, "instructions", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'shop_product_type', nullable: true }),
    __metadata("design:type", String)
], CareTask.prototype, "shopProductType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'completed_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], CareTask.prototype, "completedAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], CareTask.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => care_plan_entity_1.CarePlan, (plan) => plan.tasks, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'care_plan_id' }),
    __metadata("design:type", care_plan_entity_1.CarePlan)
], CareTask.prototype, "carePlan", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => care_task_feedback_entity_1.CareTaskFeedback, (feedback) => feedback.careTask),
    __metadata("design:type", Array)
], CareTask.prototype, "feedbacks", void 0);
exports.CareTask = CareTask = __decorate([
    (0, typeorm_1.Entity)('care_tasks'),
    (0, typeorm_1.Index)(['carePlanId']),
    (0, typeorm_1.Index)(['scheduledDate']),
    (0, typeorm_1.Index)(['status'])
], CareTask);
//# sourceMappingURL=care-task.entity.js.map