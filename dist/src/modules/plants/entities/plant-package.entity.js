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
exports.PlantPackage = void 0;
const typeorm_1 = require("typeorm");
const plant_category_enum_1 = require("../types/plant-category.enum");
const plant_difficulty_enum_1 = require("../types/plant-difficulty.enum");
const user_plant_selection_entity_1 = require("../../user-plant-selections/entities/user-plant-selection.entity");
const plant_package_item_entity_1 = require("./plant-package-item.entity");
let PlantPackage = class PlantPackage {
};
exports.PlantPackage = PlantPackage;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PlantPackage.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PlantPackage.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], PlantPackage.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: plant_category_enum_1.PlantCategory,
    }),
    __metadata("design:type", String)
], PlantPackage.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: plant_difficulty_enum_1.PlantDifficulty,
    }),
    __metadata("design:type", String)
], PlantPackage.prototype, "difficulty", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'plant_count', type: 'int' }),
    __metadata("design:type", Number)
], PlantPackage.prototype, "plantCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json' }),
    __metadata("design:type", Object)
], PlantPackage.prototype, "thresholds", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], PlantPackage.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'image_url', nullable: true }),
    __metadata("design:type", String)
], PlantPackage.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], PlantPackage.prototype, "popular", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], PlantPackage.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], PlantPackage.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => plant_package_item_entity_1.PlantPackageItem, (item) => item.package),
    __metadata("design:type", Array)
], PlantPackage.prototype, "items", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_plant_selection_entity_1.UserPlantSelection, (selection) => selection.package),
    __metadata("design:type", Array)
], PlantPackage.prototype, "userSelections", void 0);
exports.PlantPackage = PlantPackage = __decorate([
    (0, typeorm_1.Entity)('plant_packages')
], PlantPackage);
//# sourceMappingURL=plant-package.entity.js.map