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
exports.DeviceAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const device_entity_1 = require("../../modules/devices/entities/device.entity");
const bcrypt = require("bcryptjs");
const hash_util_1 = require("../utils/hash.util");
let DeviceAuthGuard = class DeviceAuthGuard {
    constructor(deviceRepository) {
        this.deviceRepository = deviceRepository;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const deviceId = request.headers['x-device-id'];
        const deviceToken = request.headers['x-device-token'];
        console.log('deviceId :', deviceId);
        console.log('deviceToken :', deviceToken);
        if (!deviceId || !deviceToken) {
            throw new common_1.UnauthorizedException('Device credentials required');
        }
        const hashedToken = await hash_util_1.HashUtil.hash(deviceToken);
        console.log("hashedToken", hashedToken);
        const device = await this.deviceRepository
            .createQueryBuilder('device')
            .addSelect('device.tokenHash')
            .where('device.deviceId = :deviceId', { deviceId })
            .leftJoinAndSelect('device.user', 'user')
            .getOne();
        if (!device) {
            throw new common_1.UnauthorizedException('Device not found');
        }
        console.log('deviceToken', deviceToken);
        console.log('hashedToken');
        console.log('hashedToken', hashedToken);
        console.log('device.tokenHah', device.tokenHash);
        console.log('deviceT', device);
        const isValidToken = await bcrypt.compare(deviceToken, device.tokenHash);
        if (!isValidToken) {
            throw new common_1.UnauthorizedException('Invalid device token');
        }
        if (device.status !== 'active') {
            throw new common_1.UnauthorizedException('Device is not active');
        }
        request.device = device;
        return true;
    }
};
exports.DeviceAuthGuard = DeviceAuthGuard;
exports.DeviceAuthGuard = DeviceAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(device_entity_1.Device)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DeviceAuthGuard);
//# sourceMappingURL=device-auth.guard.js.map