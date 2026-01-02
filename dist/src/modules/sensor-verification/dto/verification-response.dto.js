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
exports.VerificationResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const verification_status_enum_1 = require("../types/verification-status.enum");
const change_type_enum_1 = require("../types/change-type.enum");
const confidence_enum_1 = require("../types/confidence.enum");
class VerificationResponseDto {
}
exports.VerificationResponseDto = VerificationResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], VerificationResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], VerificationResponseDto.prototype, "deviceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], VerificationResponseDto.prototype, "triggerReadingId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: verification_status_enum_1.VerificationStatus }),
    __metadata("design:type", String)
], VerificationResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: change_type_enum_1.ChangeType }),
    __metadata("design:type", String)
], VerificationResponseDto.prototype, "changeType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], VerificationResponseDto.prototype, "changeMagnitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], VerificationResponseDto.prototype, "verificationReadings", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], VerificationResponseDto.prototype, "confirmed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: confidence_enum_1.Confidence }),
    __metadata("design:type", String)
], VerificationResponseDto.prototype, "confidence", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], VerificationResponseDto.prototype, "requestedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], VerificationResponseDto.prototype, "completedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], VerificationResponseDto.prototype, "expiresAt", void 0);
//# sourceMappingURL=verification-response.dto.js.map