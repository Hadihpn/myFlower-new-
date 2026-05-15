import { CarePlanStatus } from '../enums/carePlanStatus.enum';
import { GeneratorType } from '../enums/generatorType.enum';
export declare class CreateCarePlanDto {
    user_plant_selection_id: number;
    status?: CarePlanStatus;
    generator_type: GeneratorType;
    start_date: string;
    end_date: string;
    sensor_snapshot?: Record<string, any>;
    ai_recommendations?: string;
}
