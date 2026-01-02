import { Repository } from 'typeorm';
import { UserPlantSelection } from './entities/user-plant-selection.entity';
import { UpdateSelectionDto } from './dto/update-selection.dto';
import { SubscriptionService } from '@modules/subscription/subscription.service';
import { DevicesService } from '@modules/devices/devices.service';
import { PlantsService } from '@modules/plants/plants.service';
import { CreateSelectionDto } from './dto/create-selection.dto';
export declare class UserPlantSelectionsService {
    private selectionRepository;
    private subscriptionService;
    private devicesService;
    private plantsService;
    constructor(selectionRepository: Repository<UserPlantSelection>, subscriptionService: SubscriptionService, devicesService: DevicesService, plantsService: PlantsService);
    createSelection(userId: number, createSelectionDto: CreateSelectionDto): Promise<UserPlantSelection>;
    getUserSelections(userId: number): Promise<UserPlantSelection[]>;
    getDeviceSelections(userId: number, deviceId: number): Promise<UserPlantSelection[]>;
    getCurrentlyMonitored(userId: number, deviceId: number): Promise<UserPlantSelection | null>;
    switchMonitoring(userId: number, deviceId: number, selectionId: number): Promise<UserPlantSelection>;
    updateSelection(userId: number, selectionId: number, updateSelectionDto: UpdateSelectionDto): Promise<UserPlantSelection>;
    deleteSelection(userId: number, selectionId: number): Promise<void>;
    getSelectionById(userId: number, selectionId: number): Promise<UserPlantSelection>;
}
