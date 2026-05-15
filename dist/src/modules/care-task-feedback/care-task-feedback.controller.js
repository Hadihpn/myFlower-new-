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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CareTaskFeedbackController = void 0;
const common_1 = require("@nestjs/common");
const care_task_feedback_service_1 = require("./care-task-feedback.service");
const create_care_task_feedback_dto_1 = require("./dto/create-care-task-feedback.dto");
const update_care_task_feedback_dto_1 = require("./dto/update-care-task-feedback.dto");
let CareTaskFeedbackController = class CareTaskFeedbackController {
    constructor(careTaskFeedbackService) {
        this.careTaskFeedbackService = careTaskFeedbackService;
    }
    create(createCareTaskFeedbackDto) {
        return this.careTaskFeedbackService.create(createCareTaskFeedbackDto);
    }
    findAll() {
        return this.careTaskFeedbackService.findAll();
    }
    findOne(id) {
        return this.careTaskFeedbackService.findOne(+id);
    }
    update(id, updateCareTaskFeedbackDto) {
        return this.careTaskFeedbackService.update(+id, updateCareTaskFeedbackDto);
    }
    remove(id) {
        return this.careTaskFeedbackService.remove(+id);
    }
};
exports.CareTaskFeedbackController = CareTaskFeedbackController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_care_task_feedback_dto_1.CreateCareTaskFeedbackDto]),
    __metadata("design:returntype", void 0)
], CareTaskFeedbackController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CareTaskFeedbackController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CareTaskFeedbackController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_care_task_feedback_dto_1.UpdateCareTaskFeedbackDto]),
    __metadata("design:returntype", void 0)
], CareTaskFeedbackController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CareTaskFeedbackController.prototype, "remove", null);
exports.CareTaskFeedbackController = CareTaskFeedbackController = __decorate([
    (0, common_1.Controller)('care-task-feedback'),
    __metadata("design:paramtypes", [care_task_feedback_service_1.CareTaskFeedbackService])
], CareTaskFeedbackController);
//# sourceMappingURL=care-task-feedback.controller.js.map