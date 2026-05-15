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
exports.CreateCareTaskFeedbackDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const feedbackAction_enum_1 = require("../enums/feedbackAction.enum");
class CreateCareTaskFeedbackDto {
}
exports.CreateCareTaskFeedbackDto = CreateCareTaskFeedbackDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Care task ID' }),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateCareTaskFeedbackDto.prototype, "care_task_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'User ID who provided feedback' }),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateCareTaskFeedbackDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: feedbackAction_enum_1.FeedbackAction, description: 'Action taken by user' }),
    (0, class_validator_1.IsEnum)(feedbackAction_enum_1.FeedbackAction),
    __metadata("design:type", String)
], CreateCareTaskFeedbackDto.prototype, "action", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Reason for skipping (if action is skipped)' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCareTaskFeedbackDto.prototype, "reason", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Additional user notes' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCareTaskFeedbackDto.prototype, "note", void 0);
//# sourceMappingURL=create-care-task-feedback.dto.js.map