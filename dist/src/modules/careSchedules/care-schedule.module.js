"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CareScheduleModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const care_schedule_service_1 = require("./care-schedule.service");
const care_schedule_controller_1 = require("./care-schedule.controller");
const care_schedules_entity_1 = require("./entities/care-schedules.entity");
const sensor_readings_module_1 = require("../sensor-readings/sensor-readings.module");
const devices_module_1 = require("../devices/devices.module");
const ai_module_1 = require("../ai/ai.module");
const user_action_entity_1 = require("../user-actions/entities/user-action.entity");
const user_plant_selections_module_1 = require("../user-plant-selections/user-plant-selections.module");
let CareScheduleModule = class CareScheduleModule {
};
exports.CareScheduleModule = CareScheduleModule;
exports.CareScheduleModule = CareScheduleModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([care_schedules_entity_1.CareSchedule, user_action_entity_1.UserAction]),
            sensor_readings_module_1.SensorReadingsModule,
            user_plant_selections_module_1.UserPlantSelectionsModule,
            devices_module_1.DevicesModule,
            ai_module_1.AiModule,
        ],
        controllers: [care_schedule_controller_1.CareScheduleController],
        providers: [care_schedule_service_1.CareScheduleService],
        exports: [care_schedule_service_1.CareScheduleService],
    })
], CareScheduleModule);
//# sourceMappingURL=care-schedule.module.js.map