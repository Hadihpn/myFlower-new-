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
exports.PlantGroup = void 0;
const typeorm_1 = require("typeorm");
const plant_category_enum_1 = require("../types/plant-category.enum");
const plant_difficulty_enum_1 = require("../types/plant-difficulty.enum");
const plant_species_entity_1 = require("./plant-species.entity");
let PlantGroup = class PlantGroup {
};
exports.PlantGroup = PlantGroup;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PlantGroup.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PlantGroup.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], PlantGroup.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: plant_category_enum_1.PlantCategory,
    }),
    __metadata("design:type", String)
], PlantGroup.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: plant_difficulty_enum_1.PlantDifficulty,
    }),
    __metadata("design:type", String)
], PlantGroup.prototype, "difficulty", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json' }),
    __metadata("design:type", Object)
], PlantGroup.prototype, "thresholds", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'care_instructions', type: 'json' }),
    __metadata("design:type", Object)
], PlantGroup.prototype, "careInstructions", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'image_url', nullable: true }),
    __metadata("design:type", String)
], PlantGroup.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], PlantGroup.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], PlantGroup.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => plant_species_entity_1.PlantSpecies, (species) => species.group),
    __metadata("design:type", Array)
], PlantGroup.prototype, "species", void 0);
exports.PlantGroup = PlantGroup = __decorate([
    (0, typeorm_1.Entity)('plant_groups')
], PlantGroup);
//# sourceMappingURL=plant-group.entity.js.map