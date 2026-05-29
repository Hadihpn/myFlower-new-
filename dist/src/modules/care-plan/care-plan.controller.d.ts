import { CarePlan } from './entities/care-plan.entity';
import { CarePlanService } from './care-plan.services';
import { Request } from 'express';
export declare class CarePlanController {
    private readonly carePlanService;
    private readonly logger;
    constructor(carePlanService: CarePlanService);
    createInitialCarePlan(req: Request, userPlantSelectionId: number): Promise<any>;
    recalibratePlan(carePlanId: number): Promise<CarePlan>;
    cancelPlan(userPlantSelectionId: number): Promise<{
        message: string;
    }>;
}
