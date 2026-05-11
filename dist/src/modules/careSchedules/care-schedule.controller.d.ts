import { CareScheduleService } from './care-schedule.service';
export declare class CareScheduleController {
    private readonly careScheduleService;
    constructor(careScheduleService: CareScheduleService);
    generateSchedule(req: any, deviceId: string): Promise<any>;
    getLatestSchedule(req: any, deviceId: string): Promise<any>;
}
