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
exports.UserPlantSelection = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const device_entity_1 = require("../../devices/entities/device.entity");
const plant_package_entity_1 = require("../../plants/entities/plant-package.entity");
const plant_species_entity_1 = require("../../plants/entities/plant-species.entity");
const user_action_entity_1 = require("../../user-actions/entities/user-action.entity");
let UserPlantSelection = class UserPlantSelection {
};
exports.UserPlantSelection = UserPlantSelection;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserPlantSelection.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", Number)
], UserPlantSelection.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'device_id' }),
    __metadata("design:type", Number)
], UserPlantSelection.prototype, "deviceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'package_id', nullable: true }),
    __metadata("design:type", Number)
], UserPlantSelection.prototype, "packageId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'plant_species_id', nullable: true }),
    __metadata("design:type", Number)
], UserPlantSelection.prototype, "plantSpeciesId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserPlantSelection.prototype, "nickname", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'planted_date', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], UserPlantSelection.prototype, "plantedDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserPlantSelection.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], UserPlantSelection.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], UserPlantSelection.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'currently_monitoring', default: false }),
    __metadata("design:type", Boolean)
], UserPlantSelection.prototype, "currentlyMonitoring", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], UserPlantSelection.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], UserPlantSelection.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.plantSelections),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], UserPlantSelection.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => device_entity_1.Device, (device) => device.plantSelections),
    (0, typeorm_1.JoinColumn)({ name: 'device_id' }),
    __metadata("design:type", device_entity_1.Device)
], UserPlantSelection.prototype, "device", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => plant_package_entity_1.PlantPackage, (pkg) => pkg.userSelections, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'package_id' }),
    __metadata("design:type", plant_package_entity_1.PlantPackage)
], UserPlantSelection.prototype, "package", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => plant_species_entity_1.PlantSpecies, (species) => species.userSelections, {
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'plant_species_id' }),
    __metadata("design:type", plant_species_entity_1.PlantSpecies)
], UserPlantSelection.prototype, "plantSpecies", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_action_entity_1.UserAction, (action) => action.selection),
    __metadata("design:type", Array)
], UserPlantSelection.prototype, "actions", void 0);
exports.UserPlantSelection = UserPlantSelection = __decorate([
    (0, typeorm_1.Entity)('user_plant_selections'),
    (0, typeorm_1.Check)(`(package_id IS NOT NULL AND plant_species_id IS NULL) OR (package_id IS NULL AND plant_species_id IS NOT NULL)`)
], UserPlantSelection);
//# sourceMappingURL=user-plant-selection.entity.js.map