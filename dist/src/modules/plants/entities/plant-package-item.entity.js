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
exports.PlantPackageItem = void 0;
const typeorm_1 = require("typeorm");
const plant_package_entity_1 = require("./plant-package.entity");
const plant_species_entity_1 = require("./plant-species.entity");
let PlantPackageItem = class PlantPackageItem {
};
exports.PlantPackageItem = PlantPackageItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PlantPackageItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'package_id' }),
    __metadata("design:type", Number)
], PlantPackageItem.prototype, "packageId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'plant_species_id' }),
    __metadata("design:type", Number)
], PlantPackageItem.prototype, "plantSpeciesId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], PlantPackageItem.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], PlantPackageItem.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => plant_package_entity_1.PlantPackage, (pkg) => pkg.items, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'package_id' }),
    __metadata("design:type", plant_package_entity_1.PlantPackage)
], PlantPackageItem.prototype, "package", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => plant_species_entity_1.PlantSpecies, (species) => species.packageItems, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'plant_species_id' }),
    __metadata("design:type", plant_species_entity_1.PlantSpecies)
], PlantPackageItem.prototype, "plantSpecies", void 0);
exports.PlantPackageItem = PlantPackageItem = __decorate([
    (0, typeorm_1.Entity)('plant_package_items'),
    (0, typeorm_1.Unique)(['packageId', 'plantSpeciesId'])
], PlantPackageItem);
//# sourceMappingURL=plant-package-item.entity.js.map