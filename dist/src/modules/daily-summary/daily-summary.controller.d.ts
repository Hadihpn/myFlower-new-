import { DailySummaryService } from './daily-summary.service';
import { SummaryQueryDto } from './dto/summary-query.dto';
export declare class DailySummaryController {
    private readonly summaryService;
    constructor(summaryService: DailySummaryService);
    getDeviceSummaries(deviceId: number, query: SummaryQueryDto): Promise<import("./entities/daily-summary.entity").DailySummary[]>;
    getSummaryByDate(deviceId: number, date: string): Promise<import("./entities/daily-summary.entity").DailySummary>;
}
