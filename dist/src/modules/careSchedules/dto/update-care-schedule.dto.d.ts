import { CareScheduleStatus } from '../entities/care-schedules.entity';
export declare class UpdateCareScheduleDto {
    scheduledAt?: string;
    status?: CareScheduleStatus;
    notes?: string;
}
