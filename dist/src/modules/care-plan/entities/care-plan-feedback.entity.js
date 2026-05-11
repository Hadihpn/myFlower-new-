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
exports.CarePlanFeedback = void 0;
const typeorm_1 = require("typeorm");
const care_plan_entity_1 = require("./care-plan.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let CarePlanFeedback = class CarePlanFeedback {
};
exports.CarePlanFeedback = CarePlanFeedback;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CarePlanFeedback.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'care_plan_id' }),
    __metadata("design:type", Number)
], CarePlanFeedback.prototype, "carePlanId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", Number)
], CarePlanFeedback.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], CarePlanFeedback.prototype, "feedback", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'triggered_regeneration', default: false }),
    __metadata("design:type", Boolean)
], CarePlanFeedback.prototype, "triggeredRegeneration", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => care_plan_entity_1.CarePlan),
    (0, typeorm_1.JoinColumn)({ name: 'care_plan_id' }),
    __metadata("design:type", care_plan_entity_1.CarePlan)
], CarePlanFeedback.prototype, "carePlan", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], CarePlanFeedback.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], CarePlanFeedback.prototype, "createdAt", void 0);
exports.CarePlanFeedback = CarePlanFeedback = __decorate([
    (0, typeorm_1.Entity)('care_plan_feedbacks')
], CarePlanFeedback);
//# sourceMappingURL=care-plan-feedback.entity.js.map