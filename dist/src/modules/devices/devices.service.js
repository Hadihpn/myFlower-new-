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
exports.DevicesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const device_entity_1 = require("./entities/device.entity");
const hash_util_1 = require("../../common/utils/hash.util");
let DevicesService = class DevicesService {
    constructor(deviceRepository) {
        this.deviceRepository = deviceRepository;
    }
    async registerDevice(userId, registerDeviceDto) {
        const { deviceId, name, location } = registerDeviceDto;
        const existingDevice = await this.deviceRepository.findOne({
            where: { deviceId },
        });
        if (existingDevice) {
            throw new common_1.ConflictException('Device with this ID already exists');
        }
        const token = hash_util_1.HashUtil.generateRandomToken(32);
        const tokenHash = await hash_util_1.HashUtil.hash(token);
        const device = this.deviceRepository.create({
            userId,
            deviceId,
            name,
            location,
            tokenHash,
        });
        const savedDevice = await this.deviceRepository.save(device);
        return { device: savedDevice, token };
    }
    async findUserDevices(userId) {
        return this.deviceRepository.find({
            where: { userId },
            order: { createdAt: 'DESC' },
        });
    }
    async findDeviceById(id) {
        const device = await this.deviceRepository.findOne({
            where: { id },
            relations: ['user'],
        });
        if (!device) {
            throw new common_1.NotFoundException(`Device with ID ${id} not found`);
        }
        return device;
    }
    async findDeviceByDeviceId(deviceId) {
        const device = await this.deviceRepository.findOne({
            where: { deviceId },
            relations: ['user'],
        });
        if (!device) {
            throw new common_1.NotFoundException(`Device with ID ${deviceId} not found`);
        }
        return device;
    }
    async updateDevice(id, userId, updateDeviceDto) {
        const device = await this.findDeviceById(id);
        if (device.userId !== userId) {
            throw new common_1.UnauthorizedException('You do not own this device');
        }
        Object.assign(device, updateDeviceDto);
        return this.deviceRepository.save(device);
    }
    async deleteDevice(id, userId) {
        const device = await this.findDeviceById(id);
        if (device.userId !== userId) {
            throw new common_1.UnauthorizedException('You do not own this device');
        }
        await this.deviceRepository.remove(device);
    }
    async updateLastSeen(deviceId) {
        await this.deviceRepository.update({ deviceId }, { lastSeen: new Date() });
    }
    async verifyDeviceToken(deviceId, token) {
        const device = await this.deviceRepository
            .createQueryBuilder('device')
            .addSelect('device.tokenHash')
            .where('device.deviceId = :deviceId', { deviceId })
            .getOne();
        if (!device) {
            return null;
        }
        const isValidToken = await hash_util_1.HashUtil.compare(token, device.tokenHash);
        if (!isValidToken) {
            return null;
        }
        return device;
    }
    async calibrateDevice(id, userId, calibration) {
        const device = await this.findDeviceById(id);
        if (device.userId !== userId) {
            throw new common_1.UnauthorizedException('You do not own this device');
        }
        device.calibration = { ...device.calibration, ...calibration };
        return this.deviceRepository.save(device);
    }
};
exports.DevicesService = DevicesService;
exports.DevicesService = DevicesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(device_entity_1.Device)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DevicesService);
//# sourceMappingURL=devices.service.js.map