import { SensorReadingsService } from '@modules/sensor-readings/sensor-readings.service';
import { UserPlantSelectionsService } from '@modules/user-plant-selections/user-plant-selections.service';
import { UserActionsService } from '@modules/user-actions/user-actions.service';
import { AdviceResponseDto } from './dto/advice-response.dto';
export declare class AdviceService {
    private sensorReadingsService;
    private selectionsService;
    private actionsService;
    constructor(sensorReadingsService: SensorReadingsService, selectionsService: UserPlantSelectionsService, actionsService: UserActionsService);
    getAdviceForSelection(userId: number, selectionId: number): Promise<AdviceResponseDto>;
}
