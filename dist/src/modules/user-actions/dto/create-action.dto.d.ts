import { ActionType } from '../types/action-type.enum';
export declare class CreateActionDto {
    selectionId: number;
    deviceId: string;
    actionType: ActionType;
    notes?: string;
    actionDate?: string;
}
