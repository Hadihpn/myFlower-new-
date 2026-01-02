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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceRegistrationResponseDto = exports.DeviceResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const device_status_enum_1 = require("../types/device-status.enum");
class DeviceResponseDto {
}
exports.DeviceResponseDto = DeviceResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], DeviceResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], DeviceResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DeviceResponseDto.prototype, "deviceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DeviceResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], DeviceResponseDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: device_status_enum_1.DeviceStatus }),
    __metadata("design:type", String)
], DeviceResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], DeviceResponseDto.prototype, "lastSeen", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], DeviceResponseDto.prototype, "calibration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], DeviceResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], DeviceResponseDto.prototype, "updatedAt", void 0);
class DeviceRegistrationResponseDto extends DeviceResponseDto {
}
exports.DeviceRegistrationResponseDto = DeviceRegistrationResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Device token (store securely!)' }),
    __metadata("design:type", String)
], DeviceRegistrationResponseDto.prototype, "token", void 0);
//# sourceMappingURL=device-response.dto.js.map