import { CareTaskType } from '../entities/care-schedules.entity';
export declare class CreateCareScheduleDto {
    deviceId: string;
    plantSpeciesId: number;
    taskType: CareTaskType;
    scheduledAt: string;
    notes?: string;
}
