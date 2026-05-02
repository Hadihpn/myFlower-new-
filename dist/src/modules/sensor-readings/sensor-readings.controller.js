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
exports.SensorReadingsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const sensor_readings_service_1 = require("./sensor-readings.service");
const create_sensor_reading_dto_1 = require("./dto/create-sensor-reading.dto");
const sensor_query_dto_1 = require("./dto/sensor-query.dto");
const device_auth_guard_1 = require("../../common/guards/device-auth.guard");
const device_auth_decorator_1 = require("../../common/decorators/device-auth.decorator");
const public_decorator_1 = require("../../common/decorators/public.decorator");
const DeviceRateLimitGuard_guard_1 = require("../../common/guards/DeviceRateLimitGuard.guard");
const UserRateLimitGuard_guard_1 = require("../../common/guards/UserRateLimitGuard.guard");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const chart_query_dto_1 = require("./dto/chart-query.dto");
let SensorReadingsController = class SensorReadingsController {
    constructor(sensorReadingsService) {
        this.sensorReadingsService = sensorReadingsService;
    }
    async createReading(deviceId, createReadingDto) {
        return this.sensorReadingsService.createReading(deviceId, createReadingDto);
    }
    async getDeviceReadings(deviceId, queryDto) {
        return this.sensorReadingsService.getDeviceReadings(deviceId, queryDto);
    }
    async getLatestReading(deviceId) {
        return this.sensorReadingsService.getLatestReading(deviceId);
    }
    async getDailyStats(deviceId, date) {
        const targetDate = date ? new Date(date) : new Date();
        return this.sensorReadingsService.getDailyStats(deviceId, targetDate);
    }
    async getChartData(deviceId, query, req) {
        const userId = req.user.id;
        return this.sensorReadingsService.getChartData(deviceId, userId, query.range, query.interval);
    }
};
exports.SensorReadingsController = SensorReadingsController;
__decorate([
    (0, common_1.Post)(),
    (0, public_decorator_1.Public)(),
    (0, common_1.UseGuards)(device_auth_guard_1.DeviceAuthGuard, DeviceRateLimitGuard_guard_1.DeviceRateLimitGuard),
    (0, swagger_1.ApiSecurity)('DeviceId'),
    (0, swagger_1.ApiSecurity)('DeviceToken'),
    (0, swagger_1.ApiOperation)({ summary: 'Submit sensor reading (Device Auth)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Reading recorded successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Invalid device credentials' }),
    __param(0, (0, device_auth_decorator_1.CurrentDevice)('deviceId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_sensor_reading_dto_1.CreateSensorReadingDto]),
    __metadata("design:returntype", Promise)
], SensorReadingsController.prototype, "createReading", null);
__decorate([
    (0, common_1.Get)('device/:deviceId'),
    (0, common_1.UseGuards)(UserRateLimitGuard_guard_1.UserRateLimitGuard),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, swagger_1.ApiOperation)({ summary: 'Get device sensor readings' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of sensor readings' }),
    __param(0, (0, common_1.Param)('deviceId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, sensor_query_dto_1.SensorQueryDto]),
    __metadata("design:returntype", Promise)
], SensorReadingsController.prototype, "getDeviceReadings", null);
__decorate([
    (0, common_1.UseGuards)(UserRateLimitGuard_guard_1.UserRateLimitGuard),
    (0, common_1.Get)('device/:deviceId/latest'),
    (0, swagger_1.ApiOperation)({ summary: 'Get latest sensor reading' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Latest sensor reading' }),
    __param(0, (0, common_1.Param)('deviceId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SensorReadingsController.prototype, "getLatestReading", null);
__decorate([
    (0, common_1.Get)('device/:deviceId/daily-stats'),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, swagger_1.ApiOperation)({ summary: 'Get daily statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Daily statistics' }),
    __param(0, (0, common_1.Param)('deviceId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], SensorReadingsController.prototype, "getDailyStats", null);
__decorate([
    (0, common_1.Get)('chart/:deviceId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, UserRateLimitGuard_guard_1.UserRateLimitGuard),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, swagger_1.ApiOperation)({ summary: 'Get aggregated chart data for a device' }),
    (0, swagger_1.ApiParam)({
        name: 'deviceId',
        type: 'string',
        description: 'Device UUID',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'range',
        enum: chart_query_dto_1.ChartRange,
        required: false,
        description: 'Time range (default: 7d)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'interval',
        enum: chart_query_dto_1.ChartInterval,
        required: false,
        description: 'Aggregation interval (default: daily)',
    }),
    __param(0, (0, common_1.Param)('deviceId')),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, chart_query_dto_1.ChartQueryDto, Object]),
    __metadata("design:returntype", Promise)
], SensorReadingsController.prototype, "getChartData", null);
exports.SensorReadingsController = SensorReadingsController = __decorate([
    (0, swagger_1.ApiTags)('Sensor Readings'),
    (0, common_1.Controller)('sensor-readings'),
    __metadata("design:paramtypes", [sensor_readings_service_1.SensorReadingsService])
], SensorReadingsController);
//# sourceMappingURL=sensor-readings.controller.js.map