import { TaskType } from '../enums/taskType.enum';
import { TaskStatus } from '../enums/taskStatus.enum';
import { OptimalTime } from '../enums/optimalType.enum';
export declare class CreateCareTaskDto {
    care_plan_id: number;
    task_type: TaskType;
    scheduled_date: string;
    optimal_time?: OptimalTime;
    status?: TaskStatus;
    instructions: string;
    shop_product_type?: string;
}
