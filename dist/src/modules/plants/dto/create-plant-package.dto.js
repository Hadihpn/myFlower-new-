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
exports.CreatePlantPackageDto = exports.PackageItemDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const plant_category_enum_1 = require("../types/plant-category.enum");
const plant_difficulty_enum_1 = require("../types/plant-difficulty.enum");
class PackageItemDto {
}
exports.PackageItemDto = PackageItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PackageItemDto.prototype, "plantSpeciesId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PackageItemDto.prototype, "position", void 0);
class CreatePlantPackageDto {
}
exports.CreatePlantPackageDto = CreatePlantPackageDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Mediterranean Herb Garden' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePlantPackageDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'A collection of herbs perfect for Mediterranean cooking' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePlantPackageDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: plant_category_enum_1.PlantCategory }),
    (0, class_validator_1.IsEnum)(plant_category_enum_1.PlantCategory),
    __metadata("design:type", String)
], CreatePlantPackageDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: plant_difficulty_enum_1.PlantDifficulty }),
    (0, class_validator_1.IsEnum)(plant_difficulty_enum_1.PlantDifficulty),
    __metadata("design:type", String)
], CreatePlantPackageDto.prototype, "difficulty", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3 }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreatePlantPackageDto.prototype, "plantCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            temperature: { min: 15, max: 30, ideal: { min: 18, max: 25 } },
            moisture: { min: 40, max: 70, ideal: { min: 50, max: 65 } },
            light: { min: 20000, max: 50000, ideal: { min: 25000, max: 40000 } },
        },
    }),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreatePlantPackageDto.prototype, "thresholds", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 15.0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePlantPackageDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePlantPackageDto.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreatePlantPackageDto.prototype, "popular", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreatePlantPackageDto.prototype, "active", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [PackageItemDto],
        example: [
            { plantSpeciesId: 1, position: 1 },
            { plantSpeciesId: 2, position: 2 },
            { plantSpeciesId: 3, position: 3 },
        ],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PackageItemDto),
    __metadata("design:type", Array)
], CreatePlantPackageDto.prototype, "items", void 0);
//# sourceMappingURL=create-plant-package.dto.js.map