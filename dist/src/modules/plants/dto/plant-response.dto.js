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
exports.PlantPackageResponseDto = exports.PlantSpeciesResponseDto = exports.PlantGroupResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const plant_category_enum_1 = require("../types/plant-category.enum");
const plant_difficulty_enum_1 = require("../types/plant-difficulty.enum");
class PlantGroupResponseDto {
}
exports.PlantGroupResponseDto = PlantGroupResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PlantGroupResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PlantGroupResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PlantGroupResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: plant_category_enum_1.PlantCategory }),
    __metadata("design:type", String)
], PlantGroupResponseDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: plant_difficulty_enum_1.PlantDifficulty }),
    __metadata("design:type", String)
], PlantGroupResponseDto.prototype, "difficulty", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], PlantGroupResponseDto.prototype, "thresholds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], PlantGroupResponseDto.prototype, "careInstructions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PlantGroupResponseDto.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], PlantGroupResponseDto.prototype, "active", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], PlantGroupResponseDto.prototype, "createdAt", void 0);
class PlantSpeciesResponseDto {
}
exports.PlantSpeciesResponseDto = PlantSpeciesResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PlantSpeciesResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PlantSpeciesResponseDto.prototype, "groupId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PlantSpeciesResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PlantSpeciesResponseDto.prototype, "scientificName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], PlantSpeciesResponseDto.prototype, "commonNames", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: plant_category_enum_1.PlantCategory }),
    __metadata("design:type", String)
], PlantSpeciesResponseDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: plant_difficulty_enum_1.PlantDifficulty }),
    __metadata("design:type", String)
], PlantSpeciesResponseDto.prototype, "difficulty", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], PlantSpeciesResponseDto.prototype, "thresholds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], PlantSpeciesResponseDto.prototype, "watering", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], PlantSpeciesResponseDto.prototype, "fertilization", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], PlantSpeciesResponseDto.prototype, "growthInfo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], PlantSpeciesResponseDto.prototype, "harvestInfo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], PlantSpeciesResponseDto.prototype, "commonProblems", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], PlantSpeciesResponseDto.prototype, "companionPlants", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], PlantSpeciesResponseDto.prototype, "avoidPlants", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], PlantSpeciesResponseDto.prototype, "toxicity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], PlantSpeciesResponseDto.prototype, "tips", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PlantSpeciesResponseDto.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], PlantSpeciesResponseDto.prototype, "active", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], PlantSpeciesResponseDto.prototype, "createdAt", void 0);
class PlantPackageResponseDto {
}
exports.PlantPackageResponseDto = PlantPackageResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PlantPackageResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PlantPackageResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PlantPackageResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: plant_category_enum_1.PlantCategory }),
    __metadata("design:type", String)
], PlantPackageResponseDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: plant_difficulty_enum_1.PlantDifficulty }),
    __metadata("design:type", String)
], PlantPackageResponseDto.prototype, "difficulty", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PlantPackageResponseDto.prototype, "plantCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], PlantPackageResponseDto.prototype, "thresholds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PlantPackageResponseDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PlantPackageResponseDto.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], PlantPackageResponseDto.prototype, "popular", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], PlantPackageResponseDto.prototype, "active", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], PlantPackageResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [PlantSpeciesResponseDto] }),
    __metadata("design:type", Array)
], PlantPackageResponseDto.prototype, "plants", void 0);
//# sourceMappingURL=plant-response.dto.js.map