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
exports.CreateActionDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const action_type_enum_1 = require("../types/action-type.enum");
class CreateActionDto {
}
exports.CreateActionDto = CreateActionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateActionDto.prototype, "selectionId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Device_Id' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateActionDto.prototype, "deviceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: action_type_enum_1.ActionType }),
    (0, class_validator_1.IsEnum)(action_type_enum_1.ActionType),
    __metadata("design:type", String)
], CreateActionDto.prototype, "actionType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Watered thoroughly' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateActionDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2024-12-20T14:30:00Z' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateActionDto.prototype, "actionDate", void 0);
//# sourceMappingURL=create-action.dto.js.map