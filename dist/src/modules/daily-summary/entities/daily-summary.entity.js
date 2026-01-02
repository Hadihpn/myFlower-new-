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
exports.DailySummary = void 0;
const typeorm_1 = require("typeorm");
const device_entity_1 = require("../../devices/entities/device.entity");
let DailySummary = class DailySummary {
};
exports.DailySummary = DailySummary;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DailySummary.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'device_id' }),
    __metadata("design:type", Number)
], DailySummary.prototype, "deviceId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], DailySummary.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'min_temperature', type: 'decimal', precision: 5, scale: 2 }),
    __metadata("design:type", Number)
], DailySummary.prototype, "minTemperature", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'max_temperature', type: 'decimal', precision: 5, scale: 2 }),
    __metadata("design:type", Number)
], DailySummary.prototype, "maxTemperature", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'avg_temperature', type: 'decimal', precision: 5, scale: 2 }),
    __metadata("design:type", Number)
], DailySummary.prototype, "avgTemperature", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'min_moisture', type: 'decimal', precision: 5, scale: 2 }),
    __metadata("design:type", Number)
], DailySummary.prototype, "minMoisture", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'max_moisture', type: 'decimal', precision: 5, scale: 2 }),
    __metadata("design:type", Number)
], DailySummary.prototype, "maxMoisture", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'avg_moisture', type: 'decimal', precision: 5, scale: 2 }),
    __metadata("design:type", Number)
], DailySummary.prototype, "avgMoisture", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'min_light', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], DailySummary.prototype, "minLight", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'max_light', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], DailySummary.prototype, "maxLight", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'avg_light', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], DailySummary.prototype, "avgLight", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reading_count', type: 'int' }),
    __metadata("design:type", Number)
], DailySummary.prototype, "readingCount", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], DailySummary.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => device_entity_1.Device),
    (0, typeorm_1.JoinColumn)({ name: 'device_id' }),
    __metadata("design:type", device_entity_1.Device)
], DailySummary.prototype, "device", void 0);
exports.DailySummary = DailySummary = __decorate([
    (0, typeorm_1.Entity)('daily_summaries'),
    (0, typeorm_1.Unique)(['deviceId', 'date']),
    (0, typeorm_1.Index)(['deviceId', 'date'])
], DailySummary);
//# sourceMappingURL=daily-summary.entity.js.map