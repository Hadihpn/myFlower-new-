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
exports.CreateCareTaskDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const taskType_enum_1 = require("../enums/taskType.enum");
const taskStatus_enum_1 = require("../enums/taskStatus.enum");
const optimalType_enum_1 = require("../enums/optimalType.enum");
class CreateCareTaskDto {
}
exports.CreateCareTaskDto = CreateCareTaskDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Care plan ID' }),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateCareTaskDto.prototype, "care_plan_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: taskType_enum_1.TaskType, description: 'Type of care task' }),
    (0, class_validator_1.IsEnum)(taskType_enum_1.TaskType),
    __metadata("design:type", String)
], CreateCareTaskDto.prototype, "task_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Scheduled date (YYYY-MM-DD)' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateCareTaskDto.prototype, "scheduled_date", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: optimalType_enum_1.OptimalTime, description: 'Best time of day to perform task' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(optimalType_enum_1.OptimalTime),
    __metadata("design:type", String)
], CreateCareTaskDto.prototype, "optimal_time", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: taskStatus_enum_1.TaskStatus, default: taskStatus_enum_1.TaskStatus.PENDING }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(taskStatus_enum_1.TaskStatus),
    __metadata("design:type", String)
], CreateCareTaskDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Task instructions for user' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCareTaskDto.prototype, "instructions", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Recommended product type from shop' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCareTaskDto.prototype, "shop_product_type", void 0);
//# sourceMappingURL=create-care-task.dto.js.map