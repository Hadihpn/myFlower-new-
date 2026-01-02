import { Repository } from 'typeorm';
import { UserAction } from './entities/user-action.entity';
import { CreateActionDto } from './dto/create-action.dto';
import { ActionType } from './types/action-type.enum';
export declare class UserActionsService {
    private actionRepository;
    constructor(actionRepository: Repository<UserAction>);
    createAction(userId: number, createActionDto: CreateActionDto): Promise<UserAction>;
    getSelectionActions(selectionId: number): Promise<UserAction[]>;
    getLastAction(selectionId: number, actionType: ActionType): Promise<UserAction | null>;
    getUserActions(userId: number, limit?: number): Promise<UserAction[]>;
}
