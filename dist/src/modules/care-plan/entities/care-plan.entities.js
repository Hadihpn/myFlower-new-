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
exports.CarePlan = void 0;
const user_plant_selection_entity_1 = require("../../user-plant-selections/entities/user-plant-selection.entity");
const typeorm_1 = require("typeorm");
const carePlanStatus_enum_1 = require("../enums/carePlanStatus.enum");
const generatorType_enum_1 = require("../enums/generatorType.enum");
let CarePlan = class CarePlan {
};
exports.CarePlan = CarePlan;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CarePlan.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_plant_selection_id' }),
    __metadata("design:type", Number)
], CarePlan.prototype, "userPlantSelectionId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: carePlanStatus_enum_1.CarePlanStatus,
        default: carePlanStatus_enum_1.CarePlanStatus.ACTIVE,
    }),
    __metadata("design:type", String)
], CarePlan.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: generatorType_enum_1.GeneratorType,
        name: 'generator_type',
    }),
    __metadata("design:type", String)
], CarePlan.prototype, "generatorType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'start_date', type: 'date' }),
    __metadata("design:type", Date)
], CarePlan.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'end_date', type: 'date' }),
    __metadata("design:type", Date)
], CarePlan.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sensor_snapshot', type: 'json', nullable: true }),
    __metadata("design:type", Object)
], CarePlan.prototype, "sensorSnapshot", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ai_recommendations', type: 'text', nullable: true }),
    __metadata("design:type", String)
], CarePlan.prototype, "aiRecommendations", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], CarePlan.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_plant_selection_entity_1.UserPlantSelection, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'user_plant_selection_id' }),
    __metadata("design:type", user_plant_selection_entity_1.UserPlantSelection)
], CarePlan.prototype, "userPlantSelection", void 0);
exports.CarePlan = CarePlan = __decorate([
    (0, typeorm_1.Entity)('care_plans'),
    (0, typeorm_1.Index)(['userPlantSelectionId']),
    (0, typeorm_1.Index)(['status'])
], CarePlan);
//# sourceMappingURL=care-plan.entities.js.map