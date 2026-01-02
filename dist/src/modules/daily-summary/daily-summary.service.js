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
exports.DailySummaryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const daily_summary_entity_1 = require("./entities/daily-summary.entity");
const sensor_readings_service_1 = require("../sensor-readings/sensor-readings.service");
const schedule_1 = require("@nestjs/schedule");
let DailySummaryService = class DailySummaryService {
    constructor(summaryRepository, sensorReadingsService) {
        this.summaryRepository = summaryRepository;
        this.sensorReadingsService = sensorReadingsService;
    }
    async generateDailySummaries() {
        console.log('Generating daily summaries...');
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
    }
    async getSummary(deviceId, date) {
        return this.summaryRepository.findOne({
            where: { deviceId, date },
        });
    }
    async getDeviceSummaries(deviceId, limit = 30) {
        return this.summaryRepository.find({
            where: { deviceId },
            order: { date: 'DESC' },
            take: limit,
        });
    }
};
exports.DailySummaryService = DailySummaryService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DailySummaryService.prototype, "generateDailySummaries", null);
exports.DailySummaryService = DailySummaryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(daily_summary_entity_1.DailySummary)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        sensor_readings_service_1.SensorReadingsService])
], DailySummaryService);
//# sourceMappingURL=daily-summary.service.js.map