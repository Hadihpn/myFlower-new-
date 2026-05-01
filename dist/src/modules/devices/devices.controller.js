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
exports.DevicesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const devices_service_1 = require("./devices.service");
const register_device_dto_1 = require("./dto/register-device.dto");
const update_device_dto_1 = require("./dto/update-device.dto");
const calibration_dto_1 = require("./dto/calibration.dto");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
let DevicesController = class DevicesController {
    constructor(devicesService) {
        this.devicesService = devicesService;
    }
    async registerDevice(userId, registerDeviceDto) {
        const { device, token } = await this.devicesService.registerDevice(userId, registerDeviceDto);
        return {
            message: 'Device registered successfully. Save this token securely!',
            device,
            token,
        };
    }
    findUserDevices(userId) {
        return this.devicesService.findUserDevices(userId);
    }
    findDeviceById(id) {
        return this.devicesService.findDeviceById(id);
    }
    updateDevice(id, userId, updateDeviceDto) {
        return this.devicesService.updateDevice(id, userId, updateDeviceDto);
    }
    deleteDevice(id, userId) {
        return this.devicesService.deleteDevice(id, userId);
    }
    calibrateDevice(id, userId, calibrationDto) {
        return this.devicesService.calibrateDevice(id, userId, calibrationDto);
    }
};
exports.DevicesController = DevicesController;
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({ summary: 'Register a new IoT device' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Device registered successfully. Save the token securely!',
    }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Device already exists' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, register_device_dto_1.RegisterDeviceDto]),
    __metadata("design:returntype", Promise)
], DevicesController.prototype, "registerDevice", null);
__decorate([
    (0, common_1.Get)('my-devices'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all user devices' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of user devices' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DevicesController.prototype, "findUserDevices", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get device by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Device found' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Device not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DevicesController.prototype, "findDeviceById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update device' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Device updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Device not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, update_device_dto_1.UpdateDeviceDto]),
    __metadata("design:returntype", void 0)
], DevicesController.prototype, "updateDevice", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete device' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Device deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Device not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], DevicesController.prototype, "deleteDevice", null);
__decorate([
    (0, common_1.Post)(':id/calibrate'),
    (0, swagger_1.ApiOperation)({ summary: 'Calibrate device sensors' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Device calibrated successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, calibration_dto_1.CalibrationDto]),
    __metadata("design:returntype", void 0)
], DevicesController.prototype, "calibrateDevice", null);
exports.DevicesController = DevicesController = __decorate([
    (0, swagger_1.ApiTags)('Devices'),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, common_1.Controller)('devices'),
    __metadata("design:paramtypes", [devices_service_1.DevicesService])
], DevicesController);
//# sourceMappingURL=devices.controller.js.map