import { UserPlantSelectionsService } from './user-plant-selections.service';
import { CreateSelectionDto } from './dto/create-selection.dto';
import { UpdateSelectionDto } from './dto/update-selection.dto';
import { SwitchMonitoringDto } from './dto/switch-monitoring.dto';
export declare class UserPlantSelectionsController {
    private readonly selectionsService;
    constructor(selectionsService: UserPlantSelectionsService);
    createSelection(userId: number, createSelectionDto: CreateSelectionDto): Promise<import("./entities/user-plant-selection.entity").UserPlantSelection>;
    getUserSelections(userId: number): Promise<import("./entities/user-plant-selection.entity").UserPlantSelection[]>;
    getDeviceSelections(userId: number, deviceId: number): Promise<import("./entities/user-plant-selection.entity").UserPlantSelection[]>;
    getCurrentlyMonitored(userId: number, deviceId: number): Promise<import("./entities/user-plant-selection.entity").UserPlantSelection>;
    switchMonitoring(userId: number, deviceId: number, switchDto: SwitchMonitoringDto): Promise<import("./entities/user-plant-selection.entity").UserPlantSelection>;
    getSelectionById(userId: number, id: number): Promise<import("./entities/user-plant-selection.entity").UserPlantSelection>;
    updateSelection(userId: number, id: number, updateSelectionDto: UpdateSelectionDto): Promise<import("./entities/user-plant-selection.entity").UserPlantSelection>;
    deleteSelection(userId: number, id: number): Promise<void>;
}
