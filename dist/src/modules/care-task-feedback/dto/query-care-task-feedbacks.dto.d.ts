import { FeedbackAction } from '../enums/feedbackAction.enum';
export declare class QueryCareTaskFeedbacksDto {
    care_task_id?: number;
    user_id?: number;
    action?: FeedbackAction;
    page?: number;
    limit?: number;
}
