import { AdvicePriority } from '../types/advice-priority.enum';
export interface IAdviceItem {
    priority: AdvicePriority;
    message: string;
    reason: string;
}
