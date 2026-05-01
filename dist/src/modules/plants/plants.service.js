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
exports.PlantsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const plant_group_entity_1 = require("./entities/plant-group.entity");
const plant_species_entity_1 = require("./entities/plant-species.entity");
const plant_package_entity_1 = require("./entities/plant-package.entity");
const plant_package_item_entity_1 = require("./entities/plant-package-item.entity");
const fs = require("fs");
const path = require("path");
let PlantsService = class PlantsService {
    constructor(groupRepository, speciesRepository, packageRepository, packageItemRepository) {
        this.groupRepository = groupRepository;
        this.speciesRepository = speciesRepository;
        this.packageRepository = packageRepository;
        this.packageItemRepository = packageItemRepository;
    }
    async createGroup(createGroupDto) {
        const group = this.groupRepository.create(createGroupDto);
        return this.groupRepository.save(group);
    }
    async findAllGroups() {
        return this.groupRepository.find({
            where: { active: true },
            order: { name: 'ASC' },
        });
    }
    async findGroupById(id) {
        const group = await this.groupRepository.findOne({
            where: { id },
            relations: ['species'],
        });
        if (!group) {
            throw new common_1.NotFoundException(`Plant group with ID ${id} not found`);
        }
        return group;
    }
    async updateGroup(id, updateGroupDto) {
        const group = await this.findGroupById(id);
        Object.assign(group, updateGroupDto);
        return this.groupRepository.save(group);
    }
    async deleteGroup(id) {
        const group = await this.findGroupById(id);
        await this.groupRepository.remove(group);
    }
    async uploadGroupImage(id, file) {
        const group = await this.findGroupById(id);
        if (group.imageUrl) {
            this.deleteImageFile(group.imageUrl);
        }
        group.imageUrl = `/uploads/plants/${file.filename}`;
        return this.groupRepository.save(group);
    }
    async createSpecies(createSpeciesDto) {
        const species = this.speciesRepository.create(createSpeciesDto);
        return this.speciesRepository.save(species);
    }
    async findAllSpecies() {
        return this.speciesRepository.find({
            where: { active: true },
            relations: ['group'],
            order: { name: 'ASC' },
        });
    }
    async findSpeciesByCategory(category) {
        return this.speciesRepository.find({
            where: { category: category, active: true },
            relations: ['group'],
            order: { name: 'ASC' },
        });
    }
    async findSpeciesById(id) {
        const species = await this.speciesRepository.findOne({
            where: { id },
            relations: ['group'],
        });
        if (!species) {
            throw new common_1.NotFoundException(`Plant species with ID ${id} not found`);
        }
        return species;
    }
    async updateSpecies(id, updateSpeciesDto) {
        const species = await this.findSpeciesById(id);
        Object.assign(species, updateSpeciesDto);
        return this.speciesRepository.save(species);
    }
    async deleteSpecies(id) {
        const species = await this.findSpeciesById(id);
        await this.speciesRepository.remove(species);
    }
    async uploadSpeciesImage(id, file) {
        const species = await this.findSpeciesById(id);
        if (species.imageUrl) {
            this.deleteImageFile(species.imageUrl);
        }
        species.imageUrl = `/uploads/plants/${file.filename}`;
        return this.speciesRepository.save(species);
    }
    async createPackage(createPackageDto) {
        const { items, ...packageData } = createPackageDto;
        for (const item of items) {
            await this.findSpeciesById(item.plantSpeciesId);
        }
        const plantPackage = this.packageRepository.create(packageData);
        const savedPackage = await this.packageRepository.save(plantPackage);
        for (const item of items) {
            const packageItem = this.packageItemRepository.create({
                packageId: savedPackage.id,
                plantSpeciesId: item.plantSpeciesId,
                position: item.position,
            });
            await this.packageItemRepository.save(packageItem);
        }
        return this.findPackageById(savedPackage.id);
    }
    async findAllPackages() {
        return this.packageRepository.find({
            where: { active: true },
            relations: ['items', 'items.plantSpecies'],
            order: { popular: 'DESC', name: 'ASC' },
        });
    }
    async findPopularPackages() {
        return this.packageRepository.find({
            where: { active: true, popular: true },
            relations: ['items', 'items.plantSpecies'],
            order: { name: 'ASC' },
        });
    }
    async findPackageById(id) {
        console.log("findPackageById");
        const plantPackage = await this.packageRepository.findOne({
            where: { id },
            relations: ['items', 'items.plantSpecies'],
        });
        console.log("plantPackage", plantPackage);
        if (!plantPackage) {
            throw new common_1.NotFoundException(`Plant package with ID ${id} not found`);
        }
        return plantPackage;
    }
    async updatePackage(id, updatePackageDto) {
        const { items, ...packageData } = updatePackageDto;
        const plantPackage = await this.findPackageById(id);
        Object.assign(plantPackage, packageData);
        await this.packageRepository.save(plantPackage);
        if (items) {
            await this.packageItemRepository.delete({ packageId: id });
            for (const item of items) {
                await this.findSpeciesById(item.plantSpeciesId);
                const packageItem = this.packageItemRepository.create({
                    packageId: id,
                    plantSpeciesId: item.plantSpeciesId,
                    position: item.position,
                });
                await this.packageItemRepository.save(packageItem);
            }
        }
        return this.findPackageById(id);
    }
    async deletePackage(id) {
        const plantPackage = await this.findPackageById(id);
        await this.packageRepository.remove(plantPackage);
    }
    async uploadPackageImage(id, file) {
        const plantPackage = await this.findPackageById(id);
        if (plantPackage.imageUrl) {
            this.deleteImageFile(plantPackage.imageUrl);
        }
        plantPackage.imageUrl = `/uploads/packages/${file.filename}`;
        return this.packageRepository.save(plantPackage);
    }
    deleteImageFile(imageUrl) {
        try {
            const filePath = path.join(process.cwd(), imageUrl);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }
        catch (error) {
            console.error('Error deleting image file:', error);
        }
    }
};
exports.PlantsService = PlantsService;
exports.PlantsService = PlantsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(plant_group_entity_1.PlantGroup)),
    __param(1, (0, typeorm_1.InjectRepository)(plant_species_entity_1.PlantSpecies)),
    __param(2, (0, typeorm_1.InjectRepository)(plant_package_entity_1.PlantPackage)),
    __param(3, (0, typeorm_1.InjectRepository)(plant_package_item_entity_1.PlantPackageItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PlantsService);
//# sourceMappingURL=plants.service.js.map