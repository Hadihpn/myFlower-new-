import { PlantCategory } from '../types/plant-category.enum';
import { PlantDifficulty } from '../types/plant-difficulty.enum';
import { PlantThresholds } from '../types/threshold.interface';
export declare class CreatePlantGroupDto {
    name: string;
    description: string;
    category: PlantCategory;
    difficulty: PlantDifficulty;
    thresholds: PlantThresholds;
    careInstructions: Record<string, any>;
    imageUrl?: string;
    active?: boolean;
}
