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
exports.SensorVerification = void 0;
const typeorm_1 = require("typeorm");
const device_entity_1 = require("../../devices/entities/device.entity");
const sensor_reading_entity_1 = require("../../sensor-readings/entities/sensor-reading.entity");
const verification_status_enum_1 = require("../types/verification-status.enum");
const change_type_enum_1 = require("../types/change-type.enum");
const confidence_enum_1 = require("../types/confidence.enum");
let SensorVerification = class SensorVerification {
};
exports.SensorVerification = SensorVerification;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SensorVerification.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'device_id' }),
    __metadata("design:type", Number)
], SensorVerification.prototype, "deviceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'trigger_reading_id' }),
    __metadata("design:type", Number)
], SensorVerification.prototype, "triggerReadingId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: verification_status_enum_1.VerificationStatus,
        default: verification_status_enum_1.VerificationStatus.PENDING,
    }),
    __metadata("design:type", String)
], SensorVerification.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'change_type',
        type: 'enum',
        enum: change_type_enum_1.ChangeType,
    }),
    __metadata("design:type", String)
], SensorVerification.prototype, "changeType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'change_magnitude', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], SensorVerification.prototype, "changeMagnitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'verification_readings', type: 'json' }),
    __metadata("design:type", Array)
], SensorVerification.prototype, "verificationReadings", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], SensorVerification.prototype, "confirmed", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: confidence_enum_1.Confidence,
        nullable: true,
    }),
    __metadata("design:type", String)
], SensorVerification.prototype, "confidence", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'requested_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], SensorVerification.prototype, "requestedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'completed_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], SensorVerification.prototype, "completedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expires_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], SensorVerification.prototype, "expiresAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], SensorVerification.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => device_entity_1.Device),
    (0, typeorm_1.JoinColumn)({ name: 'device_id' }),
    __metadata("design:type", device_entity_1.Device)
], SensorVerification.prototype, "device", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sensor_reading_entity_1.SensorReading),
    (0, typeorm_1.JoinColumn)({ name: 'trigger_reading_id' }),
    __metadata("design:type", sensor_reading_entity_1.SensorReading)
], SensorVerification.prototype, "triggerReading", void 0);
exports.SensorVerification = SensorVerification = __decorate([
    (0, typeorm_1.Entity)('sensor_verifications')
], SensorVerification);
//# sourceMappingURL=sensor-verification.entity.js.map