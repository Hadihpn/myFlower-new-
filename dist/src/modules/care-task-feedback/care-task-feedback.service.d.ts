import { Repository } from 'typeorm';
import { CareTaskFeedback } from './entities/care-task-feedback.entity';
import { FeedbackAction } from './enums/feedbackAction.enum';
import { CareTaskService } from '../care-task/care-task.services';
export declare class CareTaskFeedbackService {
    private readonly feedbackRepository;
    private careTaskService;
    constructor(feedbackRepository: Repository<CareTaskFeedback>, careTaskService: CareTaskService);
    create(careTaskId: number, userId: number, action: FeedbackAction, reason: string, note?: string): Promise<CareTaskFeedback>;
    findByTask(careTaskId: number): Promise<CareTaskFeedback[]>;
    findByUser(userId: number): Promise<CareTaskFeedback[]>;
    findByTaskAndUser(careTaskId: number, userId: number): Promise<CareTaskFeedback[]>;
    findByAction(action: FeedbackAction): Promise<CareTaskFeedback[]>;
    findOne(id: number): Promise<CareTaskFeedback>;
    updateNote(id: number, note: string): Promise<CareTaskFeedback>;
    delete(id: number): Promise<void>;
    getTaskFeedbackStats(careTaskId: number): Promise<{
        total: number;
        completed: number;
        skipped: number;
        byAction: Record<FeedbackAction, number>;
    }>;
    getUserFeedbackStats(userId: number): Promise<{
        total: number;
        completed: number;
        skipped: number;
        byAction: Record<FeedbackAction, number>;
    }>;
}
