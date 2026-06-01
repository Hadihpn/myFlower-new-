import { CareTaskService } from './care-task.services';
import { CompleteTaskDto } from './dto/complete-task.dto';
import { SkipTaskDto } from './dto/skip-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { CreateTaskFeedbackDto } from './dto/create-task-feedback.dto';
export declare class CareTaskController {
    private readonly careTaskService;
    constructor(careTaskService: CareTaskService);
    getTodayTasks(req: any): Promise<import("./entities/care-task.entity").CareTask[]>;
    getTasksByPlan(carePlanId: number): Promise<import("./entities/care-task.entity").CareTask[]>;
    getPendingTasks(carePlanId: number): Promise<import("./entities/care-task.entity").CareTask[]>;
    completeTask(taskId: number, dto: CompleteTaskDto): Promise<import("./entities/care-task.entity").CareTask>;
    skipTask(taskId: number, dto: SkipTaskDto): Promise<import("./entities/care-task.entity").CareTask>;
    updateTaskStatus(taskId: number, dto: UpdateTaskStatusDto): Promise<void>;
    createFeedback(taskId: number, dto: CreateTaskFeedbackDto): Promise<import("../care-task-feedback/entities/care-task-feedback.entity").CareTaskFeedback>;
    cancelPendingTasks(carePlanId: number): Promise<{
        message: string;
    }>;
}
