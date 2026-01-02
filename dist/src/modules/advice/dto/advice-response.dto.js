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
exports.AdviceResponseDto = exports.AdviceItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const health_status_enum_1 = require("../types/health-status.enum");
const advice_priority_enum_1 = require("../types/advice-priority.enum");
class AdviceItemDto {
}
exports.AdviceItemDto = AdviceItemDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AdviceItemDto.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AdviceItemDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AdviceItemDto.prototype, "reason", void 0);
class AdviceResponseDto {
}
exports.AdviceResponseDto = AdviceResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], AdviceResponseDto.prototype, "selectionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AdviceResponseDto.prototype, "healthStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], AdviceResponseDto.prototype, "healthScore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [AdviceItemDto] }),
    __metadata("design:type", Array)
], AdviceResponseDto.prototype, "advice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], AdviceResponseDto.prototype, "currentConditions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], AdviceResponseDto.prototype, "idealConditions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], AdviceResponseDto.prototype, "lastWatered", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], AdviceResponseDto.prototype, "lastFertilized", void 0);
//# sourceMappingURL=advice-response.dto.js.map