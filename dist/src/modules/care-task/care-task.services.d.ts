import { Repository } from 'typeorm';
import { CareTask } from './entities/care-task.entity';
import { TaskStatus } from './enums/taskStatus.enum';
import { CareTaskFeedback } from '../care-task-feedback/entities/care-task-feedback.entity';
import { FeedbackAction } from '../care-task-feedback/enums/feedbackAction.enum';
export declare class CareTaskService {
    private readonly careTaskRepo;
    private readonly feedbackRepo;
    constructor(careTaskRepo: Repository<CareTask>, feedbackRepo: Repository<CareTaskFeedback>);
    createTask(task: Partial<CareTask>): Promise<CareTask>;
    createMany(tasks: Partial<CareTask>[]): Promise<CareTask[]>;
    findByPlan(carePlanId: number): Promise<CareTask[]>;
    updateStatus(taskId: number, status: TaskStatus): Promise<void>;
    cancelPendingTasks(carePlanId: number): Promise<void>;
    findPendingTasks(carePlanId: number): Promise<CareTask[]>;
    completeTask(taskId: number, feedback?: string): Promise<CareTask>;
    skipTask(taskId: number, reason?: string): Promise<CareTask>;
    getTodayTasks(userId: number): Promise<CareTask[]>;
    getTaskUserId(taskId: number): Promise<number>;
    createFeedback(taskId: number, reason: string, feedbackAction: FeedbackAction): Promise<CareTaskFeedback>;
    getTaskFeedback(taskId: number): Promise<CareTaskFeedback[]>;
    getSkippedTasksForRecalibration(carePlanId: number): Promise<CareTask[]>;
}
