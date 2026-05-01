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
exports.DeviceSensorStats = void 0;
const typeorm_1 = require("typeorm");
let DeviceSensorStats = class DeviceSensorStats {
};
exports.DeviceSensorStats = DeviceSensorStats;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DeviceSensorStats.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'device_id', unique: true }),
    __metadata("design:type", String)
], DeviceSensorStats.prototype, "deviceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'temp_count', default: 0 }),
    __metadata("design:type", Number)
], DeviceSensorStats.prototype, "tempCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'temp_mean', type: 'float', default: 0 }),
    __metadata("design:type", Number)
], DeviceSensorStats.prototype, "tempMean", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'temp_m2', type: 'float', default: 0 }),
    __metadata("design:type", Number)
], DeviceSensorStats.prototype, "tempM2", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'moisture_count', default: 0 }),
    __metadata("design:type", Number)
], DeviceSensorStats.prototype, "moistureCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'moisture_mean', type: 'float', default: 0 }),
    __metadata("design:type", Number)
], DeviceSensorStats.prototype, "moistureMean", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'moisture_m2', type: 'float', default: 0 }),
    __metadata("design:type", Number)
], DeviceSensorStats.prototype, "moistureM2", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'light_count', default: 0 }),
    __metadata("design:type", Number)
], DeviceSensorStats.prototype, "lightCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'light_mean', type: 'float', default: 0 }),
    __metadata("design:type", Number)
], DeviceSensorStats.prototype, "lightMean", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'light_m2', type: 'float', default: 0 }),
    __metadata("design:type", Number)
], DeviceSensorStats.prototype, "lightM2", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], DeviceSensorStats.prototype, "updatedAt", void 0);
exports.DeviceSensorStats = DeviceSensorStats = __decorate([
    (0, typeorm_1.Entity)('device_sensor_stats'),
    (0, typeorm_1.Index)(['deviceId'], { unique: true })
], DeviceSensorStats);
//# sourceMappingURL=device-sensor-stats.entity.js.map