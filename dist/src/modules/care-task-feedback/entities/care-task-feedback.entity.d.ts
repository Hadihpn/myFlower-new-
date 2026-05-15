import { CareTask } from '@/modules/care-task/entities/care-task.entity';
import { User } from '@/modules/users/entities/user.entity';
import { FeedbackAction } from '../enums/feedbackAction.enum';
export declare class CareTaskFeedback {
    id: number;
    careTaskId: number;
    userId: number;
    action: FeedbackAction;
    reason: string;
    note: string;
    createdAt: Date;
    careTask: CareTask;
    user: User;
}
