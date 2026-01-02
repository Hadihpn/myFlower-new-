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
exports.DailySummaryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const daily_summary_service_1 = require("./daily-summary.service");
const summary_query_dto_1 = require("./dto/summary-query.dto");
let DailySummaryController = class DailySummaryController {
    constructor(summaryService) {
        this.summaryService = summaryService;
    }
    getDeviceSummaries(deviceId, query) {
        const limit = query.limit ? parseInt(query.limit) : 30;
        return this.summaryService.getDeviceSummaries(deviceId, limit);
    }
    getSummaryByDate(deviceId, date) {
        return this.summaryService.getSummary(deviceId, new Date(date));
    }
};
exports.DailySummaryController = DailySummaryController;
__decorate([
    (0, common_1.Get)('device/:deviceId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get daily summaries for device' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of daily summaries' }),
    __param(0, (0, common_1.Param)('deviceId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, summary_query_dto_1.SummaryQueryDto]),
    __metadata("design:returntype", void 0)
], DailySummaryController.prototype, "getDeviceSummaries", null);
__decorate([
    (0, common_1.Get)('device/:deviceId/date/:date'),
    (0, swagger_1.ApiOperation)({ summary: 'Get summary for specific date' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Daily summary' }),
    __param(0, (0, common_1.Param)('deviceId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], DailySummaryController.prototype, "getSummaryByDate", null);
exports.DailySummaryController = DailySummaryController = __decorate([
    (0, swagger_1.ApiTags)('Daily Summary'),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, common_1.Controller)('daily-summary'),
    __metadata("design:paramtypes", [daily_summary_service_1.DailySummaryService])
], DailySummaryController);
//# sourceMappingURL=daily-summary.controller.js.map