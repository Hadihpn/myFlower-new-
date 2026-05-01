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
const device_sensor_stats_entity_1 = require("./entities/device-sensor-stats.entity");
const devices_module_1 = require("../devices/devices.module");
const sensor_verification_module_1 = require("../sensor-verification/sensor-verification.module");
const user_plant_selections_module_1 = require("../user-plant-selections/user-plant-selections.module");
const notifications_module_1 = require("../notifications/notifications.module");
const device_entity_1 = require("../devices/entities/device.entity");
const device_auth_guard_1 = require("../../common/guards/device-auth.guard");
let SensorReadingsModule = class SensorReadingsModule {
};
exports.SensorReadingsModule = SensorReadingsModule;
exports.SensorReadingsModule = SensorReadingsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([sensor_reading_entity_1.SensorReading, device_sensor_stats_entity_1.DeviceSensorStats, device_entity_1.Device]),
            devices_module_1.DevicesModule,
            sensor_verification_module_1.SensorVerificationModule,
            user_plant_selections_module_1.UserPlantSelectionsModule,
            notifications_module_1.NotificationsModule,
        ],
        controllers: [sensor_readings_controller_1.SensorReadingsController],
        providers: [sensor_readings_service_1.SensorReadingsService, device_auth_guard_1.DeviceAuthGuard],
        exports: [sensor_readings_service_1.SensorReadingsService],
    })
], SensorReadingsModule);
//# sourceMappingURL=sensor-readings.module.js.map