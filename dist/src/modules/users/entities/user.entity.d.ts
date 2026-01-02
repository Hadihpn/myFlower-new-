import { UserRole } from '../types/user-role.enum';
import { UserSubscription } from '@modules/subscription/entities/user-subscription.entity';
import { Device } from '@modules/devices/entities/device.entity';
import { UserPlantSelection } from '@modules/user-plant-selections/entities/user-plant-selection.entity';
import { UserAction } from '@modules/user-actions/entities/user-action.entity';
export declare class User {
    id: number;
    email: string;
    password: string;
    fullName: string;
    phoneNumber: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
    subscriptions: UserSubscription[];
    devices: Device[];
    plantSelections: UserPlantSelection[];
    actions: UserAction[];
}
