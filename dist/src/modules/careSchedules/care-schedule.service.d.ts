import { Repository } from 'typeorm';
import { CareSchedule } from './entities/care-schedules.entity';
import { DevicesService } from '../devices/devices.service';
import { CarePlan } from '../care-plan/entities/care-plan.entity';
export declare class CareScheduleService {
    private readonly careScheduleRepository;
    private readonly carePlanRepository;
    private readonly devicesService;
    constructor(careScheduleRepository: Repository<CareSchedule>, carePlanRepository: Repository<CarePlan>, devicesService: DevicesService);
    getUpcomingTasks(userId: number, deviceId: string): Promise<CareSchedule[]>;
    completeTask(userId: number, taskId: string, notes?: string): Promise<CareSchedule>;
    skipTask(userId: number, taskId: string, reason?: string): Promise<CareSchedule>;
    private incrementSkipCount;
    generateSchedulesFromCarePlan(carePlan: CarePlan, startDate: Date, durationDays: number): Promise<CareSchedule[]>;
    deleteRemainingTasks(carePlanId: string): Promise<void>;
}
