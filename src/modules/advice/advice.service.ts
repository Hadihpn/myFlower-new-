import { Injectable } from '@nestjs/common';
import { SensorReadingsService } from '@modules/sensor-readings/sensor-readings.service';
import { UserPlantSelectionsService } from '@modules/user-plant-selections/user-plant-selections.service';
import { UserActionsService } from '@modules/user-actions/user-actions.service';
import { ActionType } from '@modules/user-actions/types/action-type.enum';
import { HealthStatus } from './types/health-status.enum';
import { AdvicePriority } from './types/advice-priority.enum';
import { AdviceResponseDto, AdviceItemDto } from './dto/advice-response.dto';

@Injectable()
export class AdviceService {
  constructor(
    private sensorReadingsService: SensorReadingsService,
    private selectionsService: UserPlantSelectionsService,
    private actionsService: UserActionsService,
  ) {}

  async getAdviceForSelection(userId: number, selectionId: number): Promise<AdviceResponseDto> {
    // Get selection with plant data
    const selection = await this.selectionsService.getSelectionById(userId, selectionId);

    // Get latest sensor reading
    const latestReading = await this.sensorReadingsService.getLatestReading(selection.deviceId);

    if (!latestReading) {
      throw new Error('No sensor data available');
    }

    // Get thresholds (from package or species)
    const thresholds = selection.package
      ? selection.package.thresholds
      : selection.plantSpecies.thresholds;

    // Get last care actions
    const lastWatered = await this.actionsService.getLastAction(selectionId, ActionType.WATERED);
    const lastFertilized = await this.actionsService.getLastAction(selectionId, ActionType.FERTILIZED);

    // Generate advice
    const advice: AdviceItemDto[] = [];
    let healthScore = 100;

    // Check temperature
    if (latestReading.temperature < thresholds.temperature.min) {
      healthScore -= 20;
      advice.push({
        priority: AdvicePriority.HIGH,
        message: 'Temperature is too low',
        reason: `Current: ${latestReading.temperature}°C, Minimum: ${thresholds.temperature.min}°C`,
      });
    } else if (latestReading.temperature > thresholds.temperature.max) {
      healthScore -= 20;
      advice.push({
        priority: AdvicePriority.HIGH,
        message: 'Temperature is too high',
        reason: `Current: ${latestReading.temperature}°C, Maximum: ${thresholds.temperature.max}°C`,
      });
    }

    // Check moisture
    if (latestReading.moisture < thresholds.moisture.min) {
      healthScore -= 25;
      advice.push({
        priority: AdvicePriority.HIGH,
        message: 'Soil is too dry - water your plant',
        reason: `Current: ${latestReading.moisture}%, Minimum: ${thresholds.moisture.min}%`,
      });
    } else if (latestReading.moisture > thresholds.moisture.max) {
      healthScore -= 15;
      advice.push({
        priority: AdvicePriority.MEDIUM,
        message: 'Soil is too wet - reduce watering',
        reason: `Current: ${latestReading.moisture}%, Maximum: ${thresholds.moisture.max}%`,
      });
    }

    // Check light
    if (latestReading.light < thresholds.light.min) {
      healthScore -= 15;
      advice.push({
        priority: AdvicePriority.MEDIUM,
        message: 'Not enough light - move to brighter location',
        reason: `Current: ${latestReading.light} lux, Minimum: ${thresholds.light.min} lux`,
      });
    } else if (latestReading.light > thresholds.light.max) {
      healthScore -= 10;
      advice.push({
        priority: AdvicePriority.LOW,
        message: 'Too much direct light - consider partial shade',
        reason: `Current: ${latestReading.light} lux, Maximum: ${thresholds.light.max} lux`,
      });
    }

    // Check watering schedule
    if (lastWatered) {
      const daysSinceWatered = Math.floor(
        (Date.now() - lastWatered.actionDate.getTime()) / (1000 * 60 * 60 * 24),
      );
      if (daysSinceWatered > 3) {
        advice.push({
          priority: AdvicePriority.MEDIUM,
          message: `It's been ${daysSinceWatered} days since last watering`,
          reason: 'Consider watering if soil feels dry',
        });
      }
    }

    // Check fertilization schedule
    if (lastFertilized) {
      const daysSinceFertilized = Math.floor(
        (Date.now() - lastFertilized.actionDate.getTime()) / (1000 * 60 * 60 * 24),
      );
      if (daysSinceFertilized > 30) {
        advice.push({
          priority: AdvicePriority.LOW,
          message: `It's been ${daysSinceFertilized} days since last fertilizing`,
          reason: 'Consider fertilizing for optimal growth',
        });
      }
    }

    // Determine health status
    let healthStatus: HealthStatus;
    if (healthScore >= 90) healthStatus = HealthStatus.EXCELLENT;
    else if (healthScore >= 70) healthStatus = HealthStatus.GOOD;
    else if (healthScore >= 50) healthStatus = HealthStatus.WARNING;
    else healthStatus = HealthStatus.CRITICAL;

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
}