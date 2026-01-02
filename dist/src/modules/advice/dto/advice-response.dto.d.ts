import { HealthStatus } from '../types/health-status.enum';
import { AdvicePriority } from '../types/advice-priority.enum';
export declare class AdviceItemDto {
    priority: AdvicePriority;
    message: string;
    reason: string;
}
export declare class AdviceResponseDto {
    selectionId: number;
    healthStatus: HealthStatus;
    healthScore: number;
    advice: AdviceItemDto[];
    currentConditions: {
        temperature: number;
        moisture: number;
        light: number;
    };
    idealConditions: any;
    lastWatered: Date;
    lastFertilized: Date;
}
