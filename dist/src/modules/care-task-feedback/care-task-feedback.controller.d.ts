import { CareTaskFeedbackService } from './care-task-feedback.service';
import { CreateTaskFeedbackDto } from './dto/create-task-feedback.dto';
import { UpdateFeedbackNoteDto } from './dto/update-feedback-note.dto';
import { FeedbackAction } from './enums/feedbackAction.enum';
export declare class CareTaskFeedbackController {
    private readonly feedbackService;
    constructor(feedbackService: CareTaskFeedbackService);
    create(createDto: CreateTaskFeedbackDto, req: any): Promise<void>;
    findByTask(careTaskId: number): Promise<import("./entities/care-task-feedback.entity").CareTaskFeedback[]>;
    findByUser(userId: number): Promise<import("./entities/care-task-feedback.entity").CareTaskFeedback[]>;
    findByTaskAndUser(careTaskId: number, userId: number): Promise<import("./entities/care-task-feedback.entity").CareTaskFeedback[]>;
    findByAction(action: FeedbackAction): Promise<import("./entities/care-task-feedback.entity").CareTaskFeedback[]>;
    getTaskStats(careTaskId: number): Promise<{
        total: number;
        completed: number;
        skipped: number;
        byAction: Record<FeedbackAction, number>;
    }>;
    getUserStats(userId: number): Promise<{
        total: number;
        completed: number;
        skipped: number;
        byAction: Record<FeedbackAction, number>;
    }>;
    findOne(id: number): Promise<import("./entities/care-task-feedback.entity").CareTaskFeedback>;
    updateNote(id: number, updateDto: UpdateFeedbackNoteDto): Promise<import("./entities/care-task-feedback.entity").CareTaskFeedback>;
    delete(id: number): Promise<{
        message: string;
    }>;
}
