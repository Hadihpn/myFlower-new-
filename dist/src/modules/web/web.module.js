"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebModule = void 0;
const common_1 = require("@nestjs/common");
const web_controller_1 = require("./web.controller");
const user_plant_selections_module_1 = require("../user-plant-selections/user-plant-selections.module");
const care_plan_module_1 = require("../care-plan/care-plan.module");
const sensor_readings_module_1 = require("../sensor-readings/sensor-readings.module");
const devices_module_1 = require("../devices/devices.module");
const web_service_1 = require("./web.service");
let WebModule = class WebModule {
};
exports.WebModule = WebModule;
exports.WebModule = WebModule = __decorate([
    (0, common_1.Module)({
        imports: [devices_module_1.DevicesModule, user_plant_selections_module_1.UserPlantSelectionsModule, care_plan_module_1.CarePlanModule, sensor_readings_module_1.SensorReadingsModule],
        controllers: [web_controller_1.WebController],
        providers: [web_service_1.WebService],
    })
], WebModule);
//# sourceMappingURL=web.module.js.map