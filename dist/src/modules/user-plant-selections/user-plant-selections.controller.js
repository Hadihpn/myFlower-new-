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
exports.UserPlantSelectionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_plant_selections_service_1 = require("./user-plant-selections.service");
const create_selection_dto_1 = require("./dto/create-selection.dto");
const update_selection_dto_1 = require("./dto/update-selection.dto");
const switch_monitoring_dto_1 = require("./dto/switch-monitoring.dto");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
let UserPlantSelectionsController = class UserPlantSelectionsController {
    constructor(selectionsService) {
        this.selectionsService = selectionsService;
    }
    createSelection(userId, createSelectionDto) {
        return this.selectionsService.createSelection(userId, createSelectionDto);
    }
    getUserSelections(userId) {
        return this.selectionsService.getUserSelections(userId);
    }
    getDeviceSelections(userId, deviceId) {
        return this.selectionsService.getDeviceSelections(userId, deviceId);
    }
    getCurrentlyMonitored(userId, deviceId) {
        return this.selectionsService.getCurrentlyMonitored(userId, deviceId);
    }
    switchMonitoring(userId, deviceId, switchDto) {
        return this.selectionsService.switchMonitoring(userId, deviceId, switchDto.selectionId);
    }
    getSelectionById(userId, id) {
        return this.selectionsService.getSelectionById(userId, id);
    }
    updateSelection(userId, id, updateSelectionDto) {
        return this.selectionsService.updateSelection(userId, id, updateSelectionDto);
    }
    deleteSelection(userId, id) {
        return this.selectionsService.deleteSelection(userId, id);
    }
};
exports.UserPlantSelectionsController = UserPlantSelectionsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create plant selection' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Selection created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Slot limit reached or invalid data' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_selection_dto_1.CreateSelectionDto]),
    __metadata("design:returntype", void 0)
], UserPlantSelectionsController.prototype, "createSelection", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all user selections' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of selections' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserPlantSelectionsController.prototype, "getUserSelections", null);
__decorate([
    (0, common_1.Get)('device/:deviceId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get selections for specific device' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of device selections' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Param)('deviceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], UserPlantSelectionsController.prototype, "getDeviceSelections", null);
__decorate([
    (0, common_1.Get)('device/:deviceId/current'),
    (0, swagger_1.ApiOperation)({ summary: 'Get currently monitored plant' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Currently monitored selection' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Param)('deviceId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], UserPlantSelectionsController.prototype, "getCurrentlyMonitored", null);
__decorate([
    (0, common_1.Post)('device/:deviceId/switch'),
    (0, swagger_1.ApiOperation)({ summary: 'Switch monitoring to different plant' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Monitoring switched successfully' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Param)('deviceId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, switch_monitoring_dto_1.SwitchMonitoringDto]),
    __metadata("design:returntype", void 0)
], UserPlantSelectionsController.prototype, "switchMonitoring", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get selection by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Selection found' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], UserPlantSelectionsController.prototype, "getSelectionById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update selection' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Selection updated successfully' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, update_selection_dto_1.UpdateSelectionDto]),
    __metadata("design:returntype", void 0)
], UserPlantSelectionsController.prototype, "updateSelection", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete selection' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Selection deleted successfully' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], UserPlantSelectionsController.prototype, "deleteSelection", null);
exports.UserPlantSelectionsController = UserPlantSelectionsController = __decorate([
    (0, swagger_1.ApiTags)('User Plant Selections'),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, common_1.Controller)('user-plant-selections'),
    __metadata("design:paramtypes", [user_plant_selections_service_1.UserPlantSelectionsService])
], UserPlantSelectionsController);
//# sourceMappingURL=user-plant-selections.controller.js.map