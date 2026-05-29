"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CareTaskModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const care_task_controller_1 = require("./care-task.controller");
const care_task_services_1 = require("./care-task.services");
const care_task_entity_1 = require("./entities/care-task.entity");
const user_plant_selection_entity_1 = require("../user-plant-selections/entities/user-plant-selection.entity");
const sensor_readings_module_1 = require("../sensor-readings/sensor-readings.module");
const ai_module_1 = require("../ai/ai.module");
const care_task_feedback_entity_1 = require("../care-task-feedback/entities/care-task-feedback.entity");
const care_plan_entity_1 = require("../care-plan/entities/care-plan.entity");
const care_task_feedback_service_1 = require("../care-task-feedback/care-task-feedback.service");
let CareTaskModule = class CareTaskModule {
};
exports.CareTaskModule = CareTaskModule;
exports.CareTaskModule = CareTaskModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                care_task_entity_1.CareTask,
                care_task_feedback_entity_1.CareTaskFeedback,
                care_plan_entity_1.CarePlan,
                user_plant_selection_entity_1.UserPlantSelection,
            ]),
            sensor_readings_module_1.SensorReadingsModule,
            ai_module_1.AiModule,
        ],
        controllers: [care_task_controller_1.CareTaskController],
        providers: [care_task_services_1.CareTaskService, care_task_feedback_service_1.CareTaskFeedbackService],
        exports: [care_task_services_1.CareTaskService, care_task_feedback_service_1.CareTaskFeedbackService],
    })
], CareTaskModule);
//# sourceMappingURL=care-task.module.js.map