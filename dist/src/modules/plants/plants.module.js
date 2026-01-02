"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlantsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const platform_express_1 = require("@nestjs/platform-express");
const plants_service_1 = require("./plants.service");
const plants_controller_1 = require("./plants.controller");
const plant_group_entity_1 = require("./entities/plant-group.entity");
const plant_species_entity_1 = require("./entities/plant-species.entity");
const plant_package_entity_1 = require("./entities/plant-package.entity");
const plant_package_item_entity_1 = require("./entities/plant-package-item.entity");
let PlantsModule = class PlantsModule {
};
exports.PlantsModule = PlantsModule;
exports.PlantsModule = PlantsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                plant_group_entity_1.PlantGroup,
                plant_species_entity_1.PlantSpecies,
                plant_package_entity_1.PlantPackage,
                plant_package_item_entity_1.PlantPackageItem,
            ]),
            platform_express_1.MulterModule.register({
                dest: './uploads',
            }),
        ],
        controllers: [plants_controller_1.PlantsController],
        providers: [plants_service_1.PlantsService],
        exports: [plants_service_1.PlantsService],
    })
], PlantsModule);
//# sourceMappingURL=plants.module.js.map