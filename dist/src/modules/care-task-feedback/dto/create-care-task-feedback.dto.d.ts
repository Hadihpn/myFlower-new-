import { FeedbackAction } from '../enums/feedbackAction.enum';
export declare class CreateCareTaskFeedbackDto {
    care_task_id: number;
    user_id: number;
    action: FeedbackAction;
    reason?: string;
    note?: string;
}
