import { TaskType } from '../enums/taskType.enum';
import { TaskStatus } from '../enums/taskStatus.enum';
export declare class QueryCareTasksDto {
    care_plan_id?: number;
    task_type?: TaskType;
    status?: TaskStatus;
    scheduled_date?: string;
    page?: number;
    limit?: number;
}
