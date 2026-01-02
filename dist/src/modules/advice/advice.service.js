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
exports.AdviceService = void 0;
const common_1 = require("@nestjs/common");
const sensor_readings_service_1 = require("../sensor-readings/sensor-readings.service");
const user_plant_selections_service_1 = require("../user-plant-selections/user-plant-selections.service");
const user_actions_service_1 = require("../user-actions/user-actions.service");
const action_type_enum_1 = require("../user-actions/types/action-type.enum");
const health_status_enum_1 = require("./types/health-status.enum");
const advice_priority_enum_1 = require("./types/advice-priority.enum");
let AdviceService = class AdviceService {
    constructor(sensorReadingsService, selectionsService, actionsService) {
        this.sensorReadingsService = sensorReadingsService;
        this.selectionsService = selectionsService;
        this.actionsService = actionsService;
    }
    async getAdviceForSelection(userId, selectionId) {
        const selection = await this.selectionsService.getSelectionById(userId, selectionId);
        const latestReading = await this.sensorReadingsService.getLatestReading(selection.deviceId);
        if (!latestReading) {
            throw new Error('No sensor data available');
        }
        const thresholds = selection.package
            ? selection.package.thresholds
            : selection.plantSpecies.thresholds;
        const lastWatered = await this.actionsService.getLastAction(selectionId, action_type_enum_1.ActionType.WATERED);
        const lastFertilized = await this.actionsService.getLastAction(selectionId, action_type_enum_1.ActionType.FERTILIZED);
        const advice = [];
        let healthScore = 100;
        if (latestReading.temperature < thresholds.temperature.min) {
            healthScore -= 20;
            advice.push({
                priority: advice_priority_enum_1.AdvicePriority.HIGH,
                message: 'Temperature is too low',
                reason: `Current: ${latestReading.temperature}°C, Minimum: ${thresholds.temperature.min}°C`,
            });
        }
        else if (latestReading.temperature > thresholds.temperature.max) {
            healthScore -= 20;
            advice.push({
                priority: advice_priority_enum_1.AdvicePriority.HIGH,
                message: 'Temperature is too high',
                reason: `Current: ${latestReading.temperature}°C, Maximum: ${thresholds.temperature.max}°C`,
            });
        }
        if (latestReading.moisture < thresholds.moisture.min) {
            healthScore -= 25;
            advice.push({
                priority: advice_priority_enum_1.AdvicePriority.HIGH,
                message: 'Soil is too dry - water your plant',
                reason: `Current: ${latestReading.moisture}%, Minimum: ${thresholds.moisture.min}%`,
            });
        }
        else if (latestReading.moisture > thresholds.moisture.max) {
            healthScore -= 15;
            advice.push({
                priority: advice_priority_enum_1.AdvicePriority.MEDIUM,
                message: 'Soil is too wet - reduce watering',
                reason: `Current: ${latestReading.moisture}%, Maximum: ${thresholds.moisture.max}%`,
            });
        }
        if (latestReading.light < thresholds.light.min) {
            healthScore -= 15;
            advice.push({
                priority: advice_priority_enum_1.AdvicePriority.MEDIUM,
                message: 'Not enough light - move to brighter location',
                reason: `Current: ${latestReading.light} lux, Minimum: ${thresholds.light.min} lux`,
            });
        }
        else if (latestReading.light > thresholds.light.max) {
            healthScore -= 10;
            advice.push({
                priority: advice_priority_enum_1.AdvicePriority.LOW,
                message: 'Too much direct light - consider partial shade',
                reason: `Current: ${latestReading.light} lux, Maximum: ${thresholds.light.max} lux`,
            });
        }
        if (lastWatered) {
            const daysSinceWatered = Math.floor((Date.now() - lastWatered.actionDate.getTime()) / (1000 * 60 * 60 * 24));
            if (daysSinceWatered > 3) {
                advice.push({
                    priority: advice_priority_enum_1.AdvicePriority.MEDIUM,
                    message: `It's been ${daysSinceWatered} days since last watering`,
                    reason: 'Consider watering if soil feels dry',
                });
            }
        }
        if (lastFertilized) {
            const daysSinceFertilized = Math.floor((Date.now() - lastFertilized.actionDate.getTime()) / (1000 * 60 * 60 * 24));
            if (daysSinceFertilized > 30) {
                advice.push({
                    priority: advice_priority_enum_1.AdvicePriority.LOW,
                    message: `It's been ${daysSinceFertilized} days since last fertilizing`,
                    reason: 'Consider fertilizing for optimal growth',
                });
            }
        }
        let healthStatus;
        if (healthScore >= 90)
            healthStatus = health_status_enum_1.HealthStatus.EXCELLENT;
        else if (healthScore >= 70)
            healthStatus = health_status_enum_1.HealthStatus.GOOD;
        else if (healthScore >= 50)
            healthStatus = health_status_enum_1.HealthStatus.WARNING;
        else
            healthStatus = health_status_enum_1.HealthStatus.CRITICAL;
        return {
            selectionId,
            healthStatus,
            healthScore: Math.max(0, healthScore),
            advice,
            currentConditions: {
                temperature: latestReading.temperature,
                moisture: latestReading.moisture,
                light: latestReading.light,
            },
            idealConditions: thresholds,
            lastWatered: lastWatered?.actionDate,
            lastFertilized: lastFertilized?.actionDate,
        };
    }
};
exports.AdviceService = AdviceService;
exports.AdviceService = AdviceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [sensor_readings_service_1.SensorReadingsService,
        user_plant_selections_service_1.UserPlantSelectionsService,
        user_actions_service_1.UserActionsService])
], AdviceService);
//# sourceMappingURL=advice.service.js.map