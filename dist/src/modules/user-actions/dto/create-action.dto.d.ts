import { ActionType } from '../types/action-type.enum';
export declare class CreateActionDto {
    selectionId: number;
    actionType: ActionType;
    notes?: string;
    actionDate?: string;
}
