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
exports.Device = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const device_status_enum_1 = require("../types/device-status.enum");
const sensor_reading_entity_1 = require("../../sensor-readings/entities/sensor-reading.entity");
const user_plant_selection_entity_1 = require("../../user-plant-selections/entities/user-plant-selection.entity");
const user_action_entity_1 = require("../../user-actions/entities/user-action.entity");
let Device = class Device {
};
exports.Device = Device;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Device.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", Number)
], Device.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'device_id', unique: true }),
    __metadata("design:type", String)
], Device.prototype, "deviceId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Device.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Device.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: device_status_enum_1.DeviceStatus,
        default: device_status_enum_1.DeviceStatus.ACTIVE,
    }),
    __metadata("design:type", String)
], Device.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'token_hash', select: false }),
    __metadata("design:type", String)
], Device.prototype, "tokenHash", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'last_seen', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Device.prototype, "lastSeen", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], Device.prototype, "calibration", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Device.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Device.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.devices),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Device.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sensor_reading_entity_1.SensorReading, (reading) => reading.device),
    __metadata("design:type", Array)
], Device.prototype, "sensorReadings", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_plant_selection_entity_1.UserPlantSelection, (selection) => selection.device),
    __metadata("design:type", Array)
], Device.prototype, "plantSelections", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_action_entity_1.UserAction, (action) => action.device),
    __metadata("design:type", Array)
], Device.prototype, "actions", void 0);
exports.Device = Device = __decorate([
    (0, typeorm_1.Entity)('devices')
], Device);
//# sourceMappingURL=device.entity.js.map