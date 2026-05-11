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
exports.CarePlan = exports.CarePlanStatus = void 0;
const typeorm_1 = require("typeorm");
var CarePlanStatus;
(function (CarePlanStatus) {
    CarePlanStatus["ACTIVE"] = "active";
    CarePlanStatus["REPLACED"] = "replaced";
    CarePlanStatus["ARCHIVED"] = "archived";
})(CarePlanStatus || (exports.CarePlanStatus = CarePlanStatus = {}));
let CarePlan = class CarePlan {
};
exports.CarePlan = CarePlan;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CarePlan.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'user_id' }),
    __metadata("design:type", Number)
], CarePlan.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'device_id' }),
    __metadata("design:type", String)
], CarePlan.prototype, "deviceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'plant_species_id' }),
    __metadata("design:type", Number)
], CarePlan.prototype, "plantSpeciesId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'watering_frequency_days' }),
    __metadata("design:type", Number)
], CarePlan.prototype, "wateringFrequencyDays", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'fertilizing_frequency_days', nullable: true }),
    __metadata("design:type", Number)
], CarePlan.prototype, "fertilizingFrequencyDays", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', name: 'fertilizer_schedule', nullable: true }),
    __metadata("design:type", Array)
], CarePlan.prototype, "fertilizerSchedule", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'jsonb', name: 'pesticide_schedule', nullable: true }),
    __metadata("design:type", Array)
], CarePlan.prototype, "pesticideSchedule", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'skip_count', default: 0 }),
    __metadata("design:type", Number)
], CarePlan.prototype, "skipCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: CarePlanStatus, default: CarePlanStatus.ACTIVE }),
    __metadata("design:type", String)
], CarePlan.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], CarePlan.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', name: 'replaced_by_plan_id', nullable: true }),
    __metadata("design:type", String)
], CarePlan.prototype, "replacedByPlanId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], CarePlan.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], CarePlan.prototype, "updatedAt", void 0);
exports.CarePlan = CarePlan = __decorate([
    (0, typeorm_1.Entity)('care_plans'),
    (0, typeorm_1.Index)(['userId', 'deviceId', 'status']),
    (0, typeorm_1.Index)(['plantSpeciesId', 'status'])
], CarePlan);
//# sourceMappingURL=care-plan.entity.js.map