import { FeedbackAction } from '../enums/feedbackAction.enum';
export declare class CreateTaskFeedbackDto {
    careTaskId: number;
    action: FeedbackAction;
    reason: string;
    note?: string;
}
