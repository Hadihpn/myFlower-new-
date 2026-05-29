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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorVerificationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const sensor_verification_entity_1 = require("./entities/sensor-verification.entity");
const verification_status_enum_1 = require("./types/verification-status.enum");
const confidence_enum_1 = require("./types/confidence.enum");
const config_1 = require("@nestjs/config");
const date_util_1 = require("../../common/utils/date.util");
const notifications_service_1 = require("../notifications/notifications.service");
let SensorVerificationService = class SensorVerificationService {
    constructor(verificationRepository, configService, notificationsService) {
        this.verificationRepository = verificationRepository;
        this.configService = configService;
        this.notificationsService = notificationsService;
        this.verificationTimeoutMinutes = this.configService.get('sensor.verificationTimeout');
    }
    async createVerification(deviceId, triggerReadingId, changeType, changeMagnitude) {
        const now = new Date();
        const expiresAt = date_util_1.DateUtil.addMinutes(now, this.verificationTimeoutMinutes);
        const verification = this.verificationRepository.create({
            deviceId,
            triggerReadingId,
            status: verification_status_enum_1.VerificationStatus.PENDING,
            changeType: changeType,
            changeMagnitude,
            verificationReadings: [],
            requestedAt: now,
            expiresAt,
        });
        return this.verificationRepository.save(verification);
    }
    async addVerificationReading(deviceId, reading) {
        const pendingVerifications = await this.verificationRepository.find({
            where: {
                deviceId,
                status: verification_status_enum_1.VerificationStatus.PENDING,
            },
            order: { requestedAt: 'ASC' },
        });
        for (const verification of pendingVerifications) {
            verification.verificationReadings.push({
                temperature: reading.temperature,
                moisture: reading.moisture,
                light: reading.light,
                timestamp: reading.timestamp,
            });
            if (verification.verificationReadings.length >= 2) {
                await this.completeVerification(verification);
            }
            else {
                await this.verificationRepository.save(verification);
            }
        }
    }
    async completeVerification(verification) {
        verification.status = verification_status_enum_1.VerificationStatus.COMPLETED;
        verification.completedAt = new Date();
        const analysis = this.analyzeReadings(verification);
        verification.confirmed = analysis.confirmed;
        verification.confidence = analysis.confidence;
        await this.verificationRepository.save(verification);
        if (verification.confirmed) {
            await this.notificationsService.sendSuddenChangeAlert(verification.deviceId.toString(), verification.changeType, verification.changeMagnitude);
        }
    }
    analyzeReadings(verification) {
        const readings = verification.verificationReadings;
        if (readings.length < 2) {
            return { confirmed: false, confidence: confidence_enum_1.Confidence.LOW };
        }
        let metricKey;
        if (verification.changeType.includes('temperature')) {
            metricKey = 'temperature';
        }
        else if (verification.changeType.includes('moisture')) {
            metricKey = 'moisture';
        }
        else {
            metricKey = 'light';
        }
        const values = readings.map((r) => r[metricKey]);
        const avgValue = values.reduce((a, b) => a + b, 0) / values.length;
        const variance = values.reduce((sum, val) => sum + Math.pow(val - avgValue, 2), 0) /
            values.length;
        const stdDev = Math.sqrt(variance);
        let confidence;
        if (stdDev < 2) {
            confidence = confidence_enum_1.Confidence.HIGH;
        }
        else if (stdDev < 5) {
            confidence = confidence_enum_1.Confidence.MEDIUM;
        }
        else {
            confidence = confidence_enum_1.Confidence.LOW;
        }
        const confirmed = stdDev < 5;
        return { confirmed, confidence };
    }
    async getPendingVerifications(deviceId) {
        return this.verificationRepository.find({
            where: {
                deviceId,
                status: verification_status_enum_1.VerificationStatus.PENDING,
            },
            order: { requestedAt: 'ASC' },
        });
    }
    async expireOldVerifications() {
        const now = new Date();
        const expiredVerifications = await this.verificationRepository.find({
            where: {
                status: verification_status_enum_1.VerificationStatus.PENDING,
                expiresAt: (0, typeorm_2.LessThan)(now),
            },
        });
        for (const verification of expiredVerifications) {
            verification.status = verification_status_enum_1.VerificationStatus.EXPIRED;
            verification.confirmed = false;
            verification.confidence = confidence_enum_1.Confidence.LOW;
            await this.verificationRepository.save(verification);
        }
    }
    async getDeviceVerificationHistory(deviceId) {
        return this.verificationRepository.find({
            where: { deviceId },
            order: { requestedAt: 'DESC' },
            take: 50,
        });
    }
};
exports.SensorVerificationService = SensorVerificationService;
exports.SensorVerificationService = SensorVerificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sensor_verification_entity_1.SensorVerification)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object, notifications_service_1.NotificationsService])
], SensorVerificationService);
//# sourceMappingURL=sensor-verification.service.js.map