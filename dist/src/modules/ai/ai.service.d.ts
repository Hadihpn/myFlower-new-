import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
interface CareScheduleInput {
    plantSpeciesId: number;
    sensorData: any[];
    userId: number;
    deviceId: string;
}
export declare class AiService {
    private readonly httpService;
    private readonly configService;
    private readonly logger;
    private readonly apiKey;
    private readonly apiUrl;
    constructor(httpService: HttpService, configService: ConfigService);
    generateCareSchedule(input: CareScheduleInput): Promise<string>;
    private buildCareSchedulePrompt;
    generateTable(prompt: string): Promise<string>;
}
export {};
