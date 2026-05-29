"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CareTaskFeedbackModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const care_task_feedback_controller_1 = require("./care-task-feedback.controller");
const care_task_feedback_service_1 = require("./care-task-feedback.service");
const care_task_feedback_entity_1 = require("./entities/care-task-feedback.entity");
const care_task_entity_1 = require("../care-task/entities/care-task.entity");
const care_task_services_1 = require("../care-task/care-task.services");
let CareTaskFeedbackModule = class CareTaskFeedbackModule {
};
exports.CareTaskFeedbackModule = CareTaskFeedbackModule;
exports.CareTaskFeedbackModule = CareTaskFeedbackModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([care_task_feedback_entity_1.CareTaskFeedback, care_task_entity_1.CareTask]),
        ],
        controllers: [care_task_feedback_controller_1.CareTaskFeedbackController],
        providers: [care_task_feedback_service_1.CareTaskFeedbackService, care_task_services_1.CareTaskService],
        exports: [care_task_feedback_service_1.CareTaskFeedbackService],
    })
], CareTaskFeedbackModule);
//# sourceMappingURL=care-task-feedback.module.js.map