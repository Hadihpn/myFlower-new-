import { UserActionsService } from './user-actions.service';
import { CreateActionDto } from './dto/create-action.dto';
export declare class UserActionsController {
    private readonly actionsService;
    constructor(actionsService: UserActionsService);
    createAction(userId: number, createActionDto: CreateActionDto): Promise<import("./entities/user-action.entity").UserAction>;
    getUserActions(userId: number, limit?: number): Promise<import("./entities/user-action.entity").UserAction[]>;
    getSelectionActions(selectionId: number): Promise<import("./entities/user-action.entity").UserAction[]>;
}
