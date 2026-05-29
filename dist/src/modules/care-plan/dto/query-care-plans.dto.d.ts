import { CarePlanStatus } from '../enums/carePlanStatus.enum';
import { GeneratorType } from '../enums/generatorType.enum';
export declare class QueryCarePlansDto {
    user_plant_selection_id?: number;
    status?: CarePlanStatus;
    generatorType?: GeneratorType;
    sortBy?: any;
    sortOrder?: any;
    page?: number;
    limit?: number;
}
