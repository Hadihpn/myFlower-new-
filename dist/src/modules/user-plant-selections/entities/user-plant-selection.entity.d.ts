import { User } from '@modules/users/entities/user.entity';
import { Device } from '@modules/devices/entities/device.entity';
import { PlantPackage } from '@modules/plants/entities/plant-package.entity';
import { PlantSpecies } from '@modules/plants/entities/plant-species.entity';
import { UserAction } from '@modules/user-actions/entities/user-action.entity';
export declare class UserPlantSelection {
    id: number;
    userId: number;
    deviceId: number;
    packageId: number;
    plantSpeciesId: number;
    nickname: string;
    plantedDate: Date;
    location: string;
    notes: string;
    active: boolean;
    currentlyMonitoring: boolean;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    device: Device;
    package: PlantPackage;
    plantSpecies: PlantSpecies;
    actions: UserAction[];
}
