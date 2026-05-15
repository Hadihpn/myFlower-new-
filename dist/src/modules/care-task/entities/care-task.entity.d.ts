import { TaskType } from '../enums/taskType.enum';
import { OptimalTime } from '../enums/optimalType.enum';
import { TaskStatus } from '../enums/taskStatus.enum';
import { CarePlan } from '@/modules/care-plan/entities/care-plan.entity';
import { CareTaskFeedback } from '@/modules/care-task-feedback/entities/care-task-feedback.entity';
export declare class CareTask {
    id: number;
    carePlanId: number;
    taskType: TaskType;
    scheduledDate: Date;
    optimalTime: OptimalTime;
    status: TaskStatus;
    instructions: string;
    shopProductType: string;
    completedAt: Date;
    createdAt: Date;
    carePlan: CarePlan;
    feedbacks: CareTaskFeedback[];
}
