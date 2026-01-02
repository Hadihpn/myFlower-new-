"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorReadingsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const sensor_readings_service_1 = require("./sensor-readings.service");
const sensor_readings_controller_1 = require("./sensor-readings.controller");
const sensor_reading_entity_1 = require("./entities/sensor-reading.entity");
const devices_module_1 = require("../devices/devices.module");
const sensor_verification_module_1 = require("../sensor-verification/sensor-verification.module");
const subscription_module_1 = require("../subscription/subscription.module");
const plants_module_1 = require("../plants/plants.module");
const device_entity_1 = require("../devices/entities/device.entity");
const notifications_service_1 = require("../notifications/notifications.service");
const user_plant_selections_service_1 = require("../user-plant-selections/user-plant-selections.service");
const user_plant_selection_entity_1 = require("../user-plant-selections/entities/user-plant-selection.entity");
let SensorReadingsModule = class SensorReadingsModule {
};
exports.SensorReadingsModule = SensorReadingsModule;
exports.SensorReadingsModule = SensorReadingsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([sensor_reading_entity_1.SensorReading, device_entity_1.Device, user_plant_selection_entity_1.UserPlantSelection]),
            devices_module_1.DevicesModule,
            (0, common_1.forwardRef)(() => sensor_verification_module_1.SensorVerificationModule),
            subscription_module_1.SubscriptionModule,
            plants_module_1.PlantsModule,
        ],
        controllers: [sensor_readings_controller_1.SensorReadingsController],
        providers: [sensor_readings_service_1.SensorReadingsService, notifications_service_1.NotificationsService, user_plant_selections_service_1.UserPlantSelectionsService],
        exports: [sensor_readings_service_1.SensorReadingsService],
    })
], SensorReadingsModule);
//# sourceMappingURL=sensor-readings.module.js.map