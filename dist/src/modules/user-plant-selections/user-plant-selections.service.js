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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPlantSelectionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_plant_selection_entity_1 = require("./entities/user-plant-selection.entity");
const subscription_service_1 = require("../subscription/subscription.service");
const devices_service_1 = require("../devices/devices.service");
const plants_service_1 = require("../plants/plants.service");
let UserPlantSelectionsService = class UserPlantSelectionsService {
    constructor(selectionRepository, subscriptionService, devicesService, plantsService) {
        this.selectionRepository = selectionRepository;
        this.subscriptionService = subscriptionService;
        this.devicesService = devicesService;
        this.plantsService = plantsService;
    }
    async createSelection(userId, createSelectionDto) {
        const { deviceId, packageId, plantSpeciesId, ...selectionData } = createSelectionDto;
        if ((packageId && plantSpeciesId) || (!packageId && !plantSpeciesId)) {
            throw new common_1.BadRequestException('Must select either a package OR a species, not both');
        }
        const device = await this.devicesService.findDeviceById(deviceId);
        if (device.userId !== userId) {
            throw new common_1.BadRequestException('Device does not belong to user');
        }
        console.log("Check subscription slot limit");
        console.log(userId);
        const plantSlotLimit = await this.subscriptionService.checkUserPlantSlotLimit(userId);
        if (plantSlotLimit === 0) {
            throw new common_1.BadRequestException('No active subscription found');
        }
        const activeSelections = await this.selectionRepository.count({
            where: { userId, active: true },
        });
        let alreadyMonitoring;
        if (packageId) {
            await this.plantsService.findPackageById(packageId);
            alreadyMonitoring = await this.selectionRepository.findOne({
                where: { userId, deviceId: device.deviceId, packageId },
            });
        }
        else {
            await this.plantsService.findSpeciesById(plantSpeciesId);
            alreadyMonitoring = await this.selectionRepository.findOne({
                where: { userId, deviceId, plantSpeciesId },
            });
        }
        if (alreadyMonitoring) {
            if (alreadyMonitoring.currentlyMonitoring) {
                throw new common_1.ConflictException(`Device is already monitoring this plant selection`);
            }
            else {
                alreadyMonitoring.currentlyMonitoring = true;
                return this.selectionRepository.save(alreadyMonitoring);
            }
        }
        if (activeSelections >= plantSlotLimit) {
            throw new common_1.BadRequestException(`Plant slot limit reached (${plantSlotLimit} slots)`);
        }
        const selection = this.selectionRepository.create({
            userId,
            deviceId,
            packageId,
            plantSpeciesId,
            ...selectionData,
            currentlyMonitoring: true,
            plantedDate: selectionData.plantedDate ? new Date(selectionData.plantedDate) : null,
        });
        return this.selectionRepository.save(selection);
    }
    async getUserSelections(userId) {
        return this.selectionRepository.find({
            where: { userId, active: true },
            relations: [
                'device',
                'package',
                'package.items',
                'package.items.plantSpecies',
                'plantSpecies',
            ],
            order: { createdAt: 'DESC' },
        });
    }
    async getDeviceSelections(userId, deviceId) {
        const device = await this.devicesService.findDeviceById(deviceId);
        if (device.userId !== userId) {
            throw new common_1.BadRequestException('Device does not belong to user');
        }
        return this.selectionRepository.find({
            where: { deviceId, active: true },
            relations: ['package', 'package.items', 'package.items.plantSpecies', 'plantSpecies'],
            order: { createdAt: 'DESC' },
        });
    }
    async getCurrentlyMonitored(userId, deviceId) {
        const device = await this.devicesService.findDeviceById(deviceId);
        if (device.userId !== userId) {
            throw new common_1.BadRequestException('Device does not belong to user');
        }
        const result = await this.selectionRepository.findOne({
            where: { deviceId, currentlyMonitoring: true, active: true },
            relations: ['user', 'package', 'package.items', 'package.items.plantSpecies', 'plantSpecies'],
        });
        return result;
    }
    async switchMonitoring(userId, deviceId, selectionId) {
        const device = await this.devicesService.findDeviceById(deviceId);
        if (device.userId !== userId) {
            throw new common_1.BadRequestException('Device does not belong to user');
        }
        await this.selectionRepository.update({ deviceId, currentlyMonitoring: true }, { currentlyMonitoring: false });
        const selection = await this.selectionRepository.findOne({
            where: { id: selectionId, deviceId, userId, active: true },
            relations: ['package', 'package.items', 'package.items.plantSpecies', 'plantSpecies'],
        });
        if (!selection) {
            throw new common_1.NotFoundException('Selection not found');
        }
        selection.currentlyMonitoring = true;
        return this.selectionRepository.save(selection);
    }
    async updateSelection(userId, selectionId, updateSelectionDto) {
        const selection = await this.selectionRepository.findOne({
            where: { id: selectionId, userId },
        });
        if (!selection) {
            throw new common_1.NotFoundException('Selection not found');
        }
        if (updateSelectionDto.plantedDate) {
            selection.plantedDate = new Date(updateSelectionDto.plantedDate);
            delete updateSelectionDto.plantedDate;
        }
        Object.assign(selection, updateSelectionDto);
        return this.selectionRepository.save(selection);
    }
    async deleteSelection(userId, selectionId) {
        const selection = await this.selectionRepository.findOne({
            where: { id: selectionId, userId },
        });
        if (!selection) {
            throw new common_1.NotFoundException('Selection not found');
        }
        await this.selectionRepository.remove(selection);
    }
    async getSelectionById(userId, selectionId) {
        const selection = await this.selectionRepository.findOne({
            where: { id: selectionId, userId },
            relations: [
                'device',
                'package',
                'package.items',
                'package.items.plantSpecies',
                'plantSpecies',
            ],
        });
        if (!selection) {
            throw new common_1.NotFoundException('Selection not found');
        }
        return selection;
    }
};
exports.UserPlantSelectionsService = UserPlantSelectionsService;
exports.UserPlantSelectionsService = UserPlantSelectionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_plant_selection_entity_1.UserPlantSelection)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, subscription_service_1.SubscriptionService,
        devices_service_1.DevicesService,
        plants_service_1.PlantsService])
], UserPlantSelectionsService);
//# sourceMappingURL=user-plant-selections.service.js.map