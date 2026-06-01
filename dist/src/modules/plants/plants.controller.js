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
exports.PlantsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const plants_service_1 = require("./plants.service");
const create_plant_group_dto_1 = require("./dto/create-plant-group.dto");
const update_plant_group_dto_1 = require("./dto/update-plant-group.dto");
const create_plant_species_dto_1 = require("./dto/create-plant-species.dto");
const update_plant_species_dto_1 = require("./dto/update-plant-species.dto");
const create_plant_package_dto_1 = require("./dto/create-plant-package.dto");
const update_plant_package_dto_1 = require("./dto/update-plant-package.dto");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const roles_guard_1 = require("../../common/guards/roles.guard");
const user_role_enum_1 = require("../users/types/user-role.enum");
const public_decorator_1 = require("../../common/decorators/public.decorator");
const multer_config_1 = require("../../config/multer.config");
let PlantsController = class PlantsController {
    constructor(plantsService) {
        this.plantsService = plantsService;
    }
    createGroup(createGroupDto) {
        return this.plantsService.createGroup(createGroupDto);
    }
    findAllGroups() {
        return this.plantsService.findAllGroups();
    }
    findGroupById(id) {
        return this.plantsService.findGroupById(id);
    }
    updateGroup(id, updateGroupDto) {
        return this.plantsService.updateGroup(id, updateGroupDto);
    }
    deleteGroup(id) {
        return this.plantsService.deleteGroup(id);
    }
    uploadGroupImage(id, file) {
        if (!file) {
            throw new common_1.BadRequestException('No image file provided');
        }
        return this.plantsService.uploadGroupImage(id, file);
    }
    createSpecies(createSpeciesDto) {
        return this.plantsService.createSpecies(createSpeciesDto);
    }
    findAllSpecies() {
        return this.plantsService.findAllSpecies();
    }
    findSpeciesByCategory(category) {
        return this.plantsService.findSpeciesByCategory(category);
    }
    findSpeciesById(id) {
        return this.plantsService.findSpeciesById(id);
    }
    updateSpecies(id, updateSpeciesDto) {
        return this.plantsService.updateSpecies(id, updateSpeciesDto);
    }
    deleteSpecies(id) {
        return this.plantsService.deleteSpecies(id);
    }
    uploadSpeciesImage(id, file) {
        if (!file) {
            throw new common_1.BadRequestException('No image file provided');
        }
        return this.plantsService.uploadSpeciesImage(id, file);
    }
    createPackage(createPackageDto) {
        return this.plantsService.createPackage(createPackageDto);
    }
    findAllPackages() {
        return this.plantsService.findAllPackages();
    }
    findPopularPackages() {
        return this.plantsService.findPopularPackages();
    }
    findPackageById(id) {
        return this.plantsService.findPackageById(id);
    }
    updatePackage(id, updatePackageDto) {
        return this.plantsService.updatePackage(id, updatePackageDto);
    }
    deletePackage(id) {
        return this.plantsService.deletePackage(id);
    }
    uploadPackageImage(id, file) {
        if (!file) {
            throw new common_1.BadRequestException('No image file provided');
        }
        return this.plantsService.uploadPackageImage(id, file);
    }
};
exports.PlantsController = PlantsController;
__decorate([
    (0, common_1.Post)('groups'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Create plant group (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Group created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_plant_group_dto_1.CreatePlantGroupDto]),
    __metadata("design:returntype", void 0)
], PlantsController.prototype, "createGroup", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('groups'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all plant groups' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of plant groups' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlantsController.prototype, "findAllGroups", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('groups/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get plant group by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Plant group found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PlantsController.prototype, "findGroupById", null);
__decorate([
    (0, common_1.Patch)('groups/:id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Update plant group (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Group updated successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_plant_group_dto_1.UpdatePlantGroupDto]),
    __metadata("design:returntype", void 0)
], PlantsController.prototype, "updateGroup", null);
__decorate([
    (0, common_1.Delete)('groups/:id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Delete plant group (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Group deleted successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PlantsController.prototype, "deleteGroup", null);
__decorate([
    (0, common_1.Post)('groups/:id/image'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: multer_config_1.plantImageStorage,
        fileFilter: multer_config_1.imageFileFilter,
        limits: { fileSize: multer_config_1.maxFileSize },
    })),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                image: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Upload group image (Admin only)' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], PlantsController.prototype, "uploadGroupImage", null);
__decorate([
    (0, common_1.Post)('species'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Create plant species (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Species created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_plant_species_dto_1.CreatePlantSpeciesDto]),
    __metadata("design:returntype", void 0)
], PlantsController.prototype, "createSpecies", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('species'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all plant species' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of plant species' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlantsController.prototype, "findAllSpecies", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('species/category/:category'),
    (0, swagger_1.ApiOperation)({ summary: 'Get species by category' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of plant species' }),
    __param(0, (0, common_1.Param)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlantsController.prototype, "findSpeciesByCategory", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('species/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get plant species by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Plant species found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PlantsController.prototype, "findSpeciesById", null);
__decorate([
    (0, common_1.Patch)('species/:id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Update plant species (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Species updated successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_plant_species_dto_1.UpdatePlantSpeciesDto]),
    __metadata("design:returntype", void 0)
], PlantsController.prototype, "updateSpecies", null);
__decorate([
    (0, common_1.Delete)('species/:id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Delete plant species (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Species deleted successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PlantsController.prototype, "deleteSpecies", null);
__decorate([
    (0, common_1.Post)('species/:id/image'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: multer_config_1.plantImageStorage,
        fileFilter: multer_config_1.imageFileFilter,
        limits: { fileSize: multer_config_1.maxFileSize },
    })),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                image: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Upload species image (Admin only)' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], PlantsController.prototype, "uploadSpeciesImage", null);
__decorate([
    (0, common_1.Post)('packages'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Create plant package (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Package created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_plant_package_dto_1.CreatePlantPackageDto]),
    __metadata("design:returntype", void 0)
], PlantsController.prototype, "createPackage", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('packages'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all plant packages' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of plant packages' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlantsController.prototype, "findAllPackages", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('packages/popular'),
    (0, swagger_1.ApiOperation)({ summary: 'Get popular plant packages' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of popular packages' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlantsController.prototype, "findPopularPackages", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('packages/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get plant package by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Plant package found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PlantsController.prototype, "findPackageById", null);
__decorate([
    (0, common_1.Patch)('packages/:id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Update plant package (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Package updated successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_plant_package_dto_1.UpdatePlantPackageDto]),
    __metadata("design:returntype", void 0)
], PlantsController.prototype, "updatePackage", null);
__decorate([
    (0, common_1.Delete)('packages/:id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Delete plant package (Admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Package deleted successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PlantsController.prototype, "deletePackage", null);
__decorate([
    (0, common_1.Post)('packages/:id/image'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: multer_config_1.packageImageStorage,
        fileFilter: multer_config_1.imageFileFilter,
        limits: { fileSize: multer_config_1.maxFileSize },
    })),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                image: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Upload package image (Admin only)' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], PlantsController.prototype, "uploadPackageImage", null);
exports.PlantsController = PlantsController = __decorate([
    (0, swagger_1.ApiTags)('Plants'),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, common_1.Controller)('plants'),
    __metadata("design:paramtypes", [plants_service_1.PlantsService])
], PlantsController);
//# sourceMappingURL=plants.controller.js.map