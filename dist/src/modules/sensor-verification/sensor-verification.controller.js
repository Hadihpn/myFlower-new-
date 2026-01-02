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
exports.SensorVerificationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const sensor_verification_service_1 = require("./sensor-verification.service");
let SensorVerificationController = class SensorVerificationController {
    constructor(verificationService) {
        this.verificationService = verificationService;
    }
    getPendingVerifications(deviceId) {
        return this.verificationService.getPendingVerifications(deviceId);
    }
    getVerificationHistory(deviceId) {
        return this.verificationService.getDeviceVerificationHistory(deviceId);
    }
};
exports.SensorVerificationController = SensorVerificationController;
__decorate([
    (0, common_1.Get)('device/:deviceId/pending'),
    (0, swagger_1.ApiOperation)({ summary: 'Get pending verifications for device' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of pending verifications' }),
    __param(0, (0, common_1.Param)('deviceId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SensorVerificationController.prototype, "getPendingVerifications", null);
__decorate([
    (0, common_1.Get)('device/:deviceId/history'),
    (0, swagger_1.ApiOperation)({ summary: 'Get verification history for device' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Verification history' }),
    __param(0, (0, common_1.Param)('deviceId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SensorVerificationController.prototype, "getVerificationHistory", null);
exports.SensorVerificationController = SensorVerificationController = __decorate([
    (0, swagger_1.ApiTags)('Sensor Verification'),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, common_1.Controller)('sensor-verification'),
    __metadata("design:paramtypes", [sensor_verification_service_1.SensorVerificationService])
], SensorVerificationController);
//# sourceMappingURL=sensor-verification.controller.js.map