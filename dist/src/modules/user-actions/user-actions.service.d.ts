import { Repository } from 'typeorm';
import { UserAction } from './entities/user-action.entity';
import { CreateActionDto } from './dto/create-action.dto';
import { ActionType } from './types/action-type.enum';
import { DevicesService } from '../devices/devices.service';
export declare class UserActionsService {
    private actionRepository;
    private devicesService;
    constructor(actionRepository: Repository<UserAction>, devicesService: DevicesService);
    createAction(userId: number, createActionDto: CreateActionDto): Promise<UserAction>;
    getSelectionActions(selectionId: number): Promise<UserAction[]>;
    getLastAction(selectionId: number, actionType: ActionType): Promise<UserAction | null>;
    getUserActions(userId: number, limit?: number): Promise<UserAction[]>;
}
