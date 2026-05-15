import { CarePlanStatus } from '../enums/carePlanStatus.enum';
export declare class QueryCarePlansDto {
    user_plant_selection_id?: number;
    status?: CarePlanStatus;
    page?: number;
    limit?: number;
}
