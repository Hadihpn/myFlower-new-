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
exports.CareSchedule = exports.CareScheduleStatus = exports.CareTaskType = void 0;
const typeorm_1 = require("typeorm");
var CareTaskType;
(function (CareTaskType) {
    CareTaskType["WATERING"] = "watering";
    CareTaskType["FERTILIZING"] = "fertilizing";
    CareTaskType["PRUNING"] = "pruning";
    CareTaskType["PESTICIDE"] = "pesticide";
})(CareTaskType || (exports.CareTaskType = CareTaskType = {}));
var CareScheduleStatus;
(function (CareScheduleStatus) {
    CareScheduleStatus["PENDING"] = "pending";
    CareScheduleStatus["COMPLETED"] = "completed";
    CareScheduleStatus["SKIPPED"] = "skipped";
    CareScheduleStatus["OVERDUE"] = "overdue";
})(CareScheduleStatus || (exports.CareScheduleStatus = CareScheduleStatus = {}));
let CareSchedule = class CareSchedule {
};
exports.CareSchedule = CareSchedule;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CareSchedule.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'user_id' }),
    __metadata("design:type", Number)
], CareSchedule.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'device_id', nullable: true }),
    __metadata("design:type", String)
], CareSchedule.prototype, "deviceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'plant_species_id' }),
    __metadata("design:type", Number)
], CareSchedule.prototype, "plantSpeciesId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: CareTaskType, name: 'task_type' }),
    __metadata("design:type", String)
], CareSchedule.prototype, "taskType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', name: 'scheduled_at' }),
    __metadata("design:type", Date)
], CareSchedule.prototype, "scheduledAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: CareScheduleStatus,
        name: 'status',
        default: CareScheduleStatus.PENDING,
    }),
    __metadata("design:type", String)
], CareSchedule.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', name: 'completed_at', nullable: true }),
    __metadata("design:type", Date)
], CareSchedule.prototype, "completedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], CareSchedule.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], CareSchedule.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', name: 'last_ai_call_at', nullable: true }),
    __metadata("design:type", Date)
], CareSchedule.prototype, "lastAiCallAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', name: 'care_plan_id', nullable: true }),
    __metadata("design:type", String)
], CareSchedule.prototype, "carePlanId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'product_id', nullable: true }),
    __metadata("design:type", Number)
], CareSchedule.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", String)
], CareSchedule.prototype, "dosage", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], CareSchedule.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], CareSchedule.prototype, "updatedAt", void 0);
exports.CareSchedule = CareSchedule = __decorate([
    (0, typeorm_1.Entity)('care_schedules'),
    (0, typeorm_1.Index)(['userId', 'scheduledAt']),
    (0, typeorm_1.Index)(['deviceId', 'status']),
    (0, typeorm_1.Index)(['carePlanId'])
], CareSchedule);
//# sourceMappingURL=care-schedules.entity.js.map