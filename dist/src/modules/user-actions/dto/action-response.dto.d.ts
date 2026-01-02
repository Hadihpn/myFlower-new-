import { ActionType } from '../types/action-type.enum';
export declare class ActionResponseDto {
    id: number;
    userId: number;
    deviceId: number;
    selectionId: number;
    actionType: ActionType;
    notes: string;
    actionDate: Date;
    createdAt: Date;
}
