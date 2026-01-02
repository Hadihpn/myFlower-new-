"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPlantSelectionsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_plant_selections_service_1 = require("./user-plant-selections.service");
const user_plant_selections_controller_1 = require("./user-plant-selections.controller");
const user_plant_selection_entity_1 = require("./entities/user-plant-selection.entity");
const subscription_module_1 = require("../subscription/subscription.module");
const devices_module_1 = require("../devices/devices.module");
const plants_module_1 = require("../plants/plants.module");
let UserPlantSelectionsModule = class UserPlantSelectionsModule {
};
exports.UserPlantSelectionsModule = UserPlantSelectionsModule;
exports.UserPlantSelectionsModule = UserPlantSelectionsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_plant_selection_entity_1.UserPlantSelection]),
            subscription_module_1.SubscriptionModule,
            devices_module_1.DevicesModule,
            plants_module_1.PlantsModule,
        ],
        controllers: [user_plant_selections_controller_1.UserPlantSelectionsController],
        providers: [user_plant_selections_service_1.UserPlantSelectionsService],
        exports: [user_plant_selections_service_1.UserPlantSelectionsService],
    })
], UserPlantSelectionsModule);
//# sourceMappingURL=user-plant-selections.module.js.map