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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const device_entity_1 = require("../devices/entities/device.entity");
const sensor_reading_entity_1 = require("../sensor-readings/entities/sensor-reading.entity");
const user_subscription_entity_1 = require("../subscription/entities/user-subscription.entity");
const device_status_enum_1 = require("../devices/types/device-status.enum");
const subscription_status_enum_1 = require("../subscription/types/subscription-status.enum");
let AdminService = class AdminService {
    constructor(userRepository, deviceRepository, readingRepository, subscriptionRepository) {
        this.userRepository = userRepository;
        this.deviceRepository = deviceRepository;
        this.readingRepository = readingRepository;
        this.subscriptionRepository = subscriptionRepository;
    }
    async getDashboardStats() {
        const totalUsers = await this.userRepository.count();
        const totalDevices = await this.deviceRepository.count();
        const activeDevices = await this.deviceRepository.count({ where: { status: device_status_enum_1.DeviceStatus.ACTIVE } });
        const totalReadings = await this.readingRepository.count();
        const activeSubscriptions = await this.subscriptionRepository.count({ where: { status: subscription_status_enum_1.SubscriptionStatus.ACTIVE } });
        return {
            totalUsers,
            totalDevices,
            activeDevices,
            totalReadings,
            activeSubscriptions,
            timestamp: new Date(),
        };
    }
    async getRecentUsers(limit = 10) {
        return this.userRepository.find({
            order: { createdAt: 'DESC' },
            take: limit,
        });
    }
    async getSystemHealth() {
        const offlineDevices = await this.deviceRepository.count({ where: { status: device_status_enum_1.DeviceStatus.OFFLINE } });
        const maintenanceDevices = await this.deviceRepository.count({ where: { status: device_status_enum_1.DeviceStatus.MAINTENANCE } });
        return {
            status: offlineDevices > 5 ? 'warning' : 'healthy',
            offlineDevices,
            maintenanceDevices,
        };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(device_entity_1.Device)),
    __param(2, (0, typeorm_1.InjectRepository)(sensor_reading_entity_1.SensorReading)),
    __param(3, (0, typeorm_1.InjectRepository)(user_subscription_entity_1.UserSubscription)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AdminService);
//# sourceMappingURL=admin.service.js.map