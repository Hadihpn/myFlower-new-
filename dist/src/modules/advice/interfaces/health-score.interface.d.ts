import { HealthStatus } from '../types/health-status.enum';
export interface IHealthScore {
    score: number;
    status: HealthStatus;
    factors: {
        temperature: number;
        moisture: number;
        light: number;
    };
}
