import { ConfigService } from '@nestjs/config';
import { UserPlantSelection } from '@/modules/user-plant-selections/entities/user-plant-selection.entity';
interface AiTaskResponse {
    taskType: string;
    scheduledDate: string;
    instructions: string;
    optimalTime?: string;
    shopProductType?: string;
}
interface AiCarePlanResponse {
    tasks: AiTaskResponse[];
    reasoning: string;
}
export declare class AiService {
    private configService;
    private readonly logger;
    private readonly apiKey;
    private readonly openai;
    constructor(configService: ConfigService);
    generateCarePlan(userPlantSelection: UserPlantSelection, sensorSnapshot: Record<string, any>, skipFeedback?: string): Promise<AiCarePlanResponse>;
    private buildPrompt;
    private parseAiResponse;
}
export {};
