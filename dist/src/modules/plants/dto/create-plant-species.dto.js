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
exports.CreatePlantSpeciesDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const plant_category_enum_1 = require("../types/plant-category.enum");
const plant_difficulty_enum_1 = require("../types/plant-difficulty.enum");
class CreatePlantSpeciesDto {
}
exports.CreatePlantSpeciesDto = CreatePlantSpeciesDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreatePlantSpeciesDto.prototype, "groupId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Basil' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePlantSpeciesDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ocimum basilicum' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePlantSpeciesDto.prototype, "scientificName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['Sweet Basil', 'Thai Basil'] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreatePlantSpeciesDto.prototype, "commonNames", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: plant_category_enum_1.PlantCategory }),
    (0, class_validator_1.IsEnum)(plant_category_enum_1.PlantCategory),
    __metadata("design:type", String)
], CreatePlantSpeciesDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: plant_difficulty_enum_1.PlantDifficulty }),
    (0, class_validator_1.IsEnum)(plant_difficulty_enum_1.PlantDifficulty),
    __metadata("design:type", String)
], CreatePlantSpeciesDto.prototype, "difficulty", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            temperature: { min: 18, max: 27, ideal: { min: 20, max: 25 } },
            moisture: { min: 50, max: 70, ideal: { min: 55, max: 65 } },
            light: { min: 25000, max: 45000, ideal: { min: 30000, max: 40000 } },
        },
    }),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreatePlantSpeciesDto.prototype, "thresholds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: { frequency: 'Every 2-3 days', amount: 'Moderate', method: 'Soil watering' },
    }),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreatePlantSpeciesDto.prototype, "watering", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: { frequency: 'Every 2 weeks', type: 'Balanced liquid fertilizer' },
    }),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreatePlantSpeciesDto.prototype, "fertilization", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: { height: '30-60cm', spread: '20-30cm', growthRate: 'Fast' },
    }),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreatePlantSpeciesDto.prototype, "growthInfo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: { time: '60-90 days', method: 'Cut leaves as needed' },
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreatePlantSpeciesDto.prototype, "harvestInfo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [
            { problem: 'Aphids', solution: 'Spray with neem oil' },
            { problem: 'Powdery mildew', solution: 'Improve air circulation' },
        ],
    }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreatePlantSpeciesDto.prototype, "commonProblems", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['Tomatoes', 'Peppers'] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreatePlantSpeciesDto.prototype, "companionPlants", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['Rue', 'Sage'] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreatePlantSpeciesDto.prototype, "avoidPlants", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: { pets: 'Safe', humans: 'Safe' },
    }),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreatePlantSpeciesDto.prototype, "toxicity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['Pinch tips for bushier growth', 'Harvest before flowering'],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreatePlantSpeciesDto.prototype, "tips", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePlantSpeciesDto.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreatePlantSpeciesDto.prototype, "active", void 0);
//# sourceMappingURL=create-plant-species.dto.js.map