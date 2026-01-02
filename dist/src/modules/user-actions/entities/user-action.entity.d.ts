import { User } from '@modules/users/entities/user.entity';
import { Device } from '@modules/devices/entities/device.entity';
import { UserPlantSelection } from '@modules/user-plant-selections/entities/user-plant-selection.entity';
import { ActionType } from '../types/action-type.enum';
export declare class UserAction {
    id: number;
    userId: number;
    deviceId: number;
    selectionId: number;
    actionType: ActionType;
    notes: string;
    actionDate: Date;
    createdAt: Date;
    user: User;
    device: Device;
    selection: UserPlantSelection;
}
