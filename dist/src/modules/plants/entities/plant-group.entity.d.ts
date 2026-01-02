import { PlantCategory } from '../types/plant-category.enum';
import { PlantDifficulty } from '../types/plant-difficulty.enum';
import { PlantThresholds } from '../types/threshold.interface';
import { PlantSpecies } from './plant-species.entity';
export declare class PlantGroup {
    id: number;
    name: string;
    description: string;
    category: PlantCategory;
    difficulty: PlantDifficulty;
    thresholds: PlantThresholds;
    careInstructions: Record<string, any>;
    imageUrl: string;
    active: boolean;
    createdAt: Date;
    species: PlantSpecies[];
}
