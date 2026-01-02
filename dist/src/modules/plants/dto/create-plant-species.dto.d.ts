import { PlantCategory } from '../types/plant-category.enum';
import { PlantDifficulty } from '../types/plant-difficulty.enum';
import { PlantThresholds } from '../types/threshold.interface';
export declare class CreatePlantSpeciesDto {
    groupId?: number;
    name: string;
    scientificName: string;
    commonNames: string[];
    category: PlantCategory;
    difficulty: PlantDifficulty;
    thresholds: PlantThresholds;
    watering: Record<string, any>;
    fertilization: Record<string, any>;
    growthInfo: Record<string, any>;
    harvestInfo?: Record<string, any>;
    commonProblems: any[];
    companionPlants: string[];
    avoidPlants: string[];
    toxicity: Record<string, any>;
    tips: string[];
    imageUrl?: string;
    active?: boolean;
}
