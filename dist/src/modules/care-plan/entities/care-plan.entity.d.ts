import { UserPlantSelection } from '@/modules/user-plant-selections/entities/user-plant-selection.entity';
import { CarePlanStatus } from '../enums/carePlanStatus.enum';
import { GeneratorType } from '../enums/generatorType.enum';
import { CareTask } from '@/modules/care-task/entities/care-task.entity';
export declare class CarePlan {
    id: number;
    userPlantSelectionId: number;
    status: CarePlanStatus;
    generatorType: GeneratorType;
    startDate: Date;
    endDate: Date;
    sensorSnapshot: Record<string, any>;
    aiRecommendations: string;
    createdAt: Date;
    userPlantSelection: UserPlantSelection;
    tasks: CareTask[];
}
