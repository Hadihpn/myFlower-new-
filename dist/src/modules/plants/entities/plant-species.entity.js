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
exports.PlantSpecies = void 0;
const typeorm_1 = require("typeorm");
const plant_group_entity_1 = require("./plant-group.entity");
const plant_category_enum_1 = require("../types/plant-category.enum");
const plant_difficulty_enum_1 = require("../types/plant-difficulty.enum");
const user_plant_selection_entity_1 = require("../../user-plant-selections/entities/user-plant-selection.entity");
const plant_package_item_entity_1 = require("./plant-package-item.entity");
let PlantSpecies = class PlantSpecies {
};
exports.PlantSpecies = PlantSpecies;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PlantSpecies.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'group_id', nullable: true }),
    __metadata("design:type", Number)
], PlantSpecies.prototype, "groupId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PlantSpecies.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'scientific_name' }),
    __metadata("design:type", String)
], PlantSpecies.prototype, "scientificName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'common_names', type: 'simple-array' }),
    __metadata("design:type", Array)
], PlantSpecies.prototype, "commonNames", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: plant_category_enum_1.PlantCategory,
    }),
    __metadata("design:type", String)
], PlantSpecies.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: plant_difficulty_enum_1.PlantDifficulty,
    }),
    __metadata("design:type", String)
], PlantSpecies.prototype, "difficulty", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json' }),
    __metadata("design:type", Object)
], PlantSpecies.prototype, "thresholds", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json' }),
    __metadata("design:type", Object)
], PlantSpecies.prototype, "watering", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json' }),
    __metadata("design:type", Object)
], PlantSpecies.prototype, "fertilization", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'growth_info', type: 'json' }),
    __metadata("design:type", Object)
], PlantSpecies.prototype, "growthInfo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'harvest_info', type: 'json', nullable: true }),
    __metadata("design:type", Object)
], PlantSpecies.prototype, "harvestInfo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'common_problems', type: 'json' }),
    __metadata("design:type", Array)
], PlantSpecies.prototype, "commonProblems", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'companion_plants', type: 'simple-array' }),
    __metadata("design:type", Array)
], PlantSpecies.prototype, "companionPlants", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'avoid_plants', type: 'simple-array' }),
    __metadata("design:type", Array)
], PlantSpecies.prototype, "avoidPlants", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json' }),
    __metadata("design:type", Object)
], PlantSpecies.prototype, "toxicity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'simple-array' }),
    __metadata("design:type", Array)
], PlantSpecies.prototype, "tips", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'image_url', nullable: true }),
    __metadata("design:type", String)
], PlantSpecies.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], PlantSpecies.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], PlantSpecies.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => plant_group_entity_1.PlantGroup, (group) => group.species),
    (0, typeorm_1.JoinColumn)({ name: 'group_id' }),
    __metadata("design:type", plant_group_entity_1.PlantGroup)
], PlantSpecies.prototype, "group", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => plant_package_item_entity_1.PlantPackageItem, (item) => item.plantSpecies),
    __metadata("design:type", Array)
], PlantSpecies.prototype, "packageItems", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_plant_selection_entity_1.UserPlantSelection, (selection) => selection.plantSpecies),
    __metadata("design:type", Array)
], PlantSpecies.prototype, "userSelections", void 0);
exports.PlantSpecies = PlantSpecies = __decorate([
    (0, typeorm_1.Entity)('plant_species')
], PlantSpecies);
//# sourceMappingURL=plant-species.entity.js.map