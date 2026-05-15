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
exports.CareTaskFeedback = void 0;
const care_task_entity_1 = require("../../care-task/entities/care-task.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
const feedbackAction_enum_1 = require("../enums/feedbackAction.enum");
let CareTaskFeedback = class CareTaskFeedback {
};
exports.CareTaskFeedback = CareTaskFeedback;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CareTaskFeedback.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'care_task_id' }),
    __metadata("design:type", Number)
], CareTaskFeedback.prototype, "careTaskId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", Number)
], CareTaskFeedback.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: feedbackAction_enum_1.FeedbackAction,
    }),
    __metadata("design:type", String)
], CareTaskFeedback.prototype, "action", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CareTaskFeedback.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], CareTaskFeedback.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], CareTaskFeedback.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => care_task_entity_1.CareTask, (task) => task.feedbacks, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'care_task_id' }),
    __metadata("design:type", care_task_entity_1.CareTask)
], CareTaskFeedback.prototype, "careTask", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], CareTaskFeedback.prototype, "user", void 0);
exports.CareTaskFeedback = CareTaskFeedback = __decorate([
    (0, typeorm_1.Entity)('care_task_feedbacks'),
    (0, typeorm_1.Index)(['careTaskId']),
    (0, typeorm_1.Index)(['userId'])
], CareTaskFeedback);
//# sourceMappingURL=care-task-feedback.entity.js.map