import { PlantCategory } from '../types/plant-category.enum';
import { PlantDifficulty } from '../types/plant-difficulty.enum';
import { PlantThresholds } from '../types/threshold.interface';
export declare class PlantGroupResponseDto {
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
}
export declare class PlantSpeciesResponseDto {
    id: number;
    groupId: number;
    name: string;
    scientificName: string;
    commonNames: string[];
    category: PlantCategory;
    difficulty: PlantDifficulty;
    thresholds: PlantThresholds;
    watering: Record<string, any>;
    fertilization: Record<string, any>;
    growthInfo: Record<string, any>;
    harvestInfo: Record<string, any>;
    commonProblems: any[];
    companionPlants: string[];
    avoidPlants: string[];
    toxicity: Record<string, any>;
    tips: string[];
    imageUrl: string;
    active: boolean;
    createdAt: Date;
}
export declare class PlantPackageResponseDto {
    id: number;
    name: string;
    description: string;
    category: PlantCategory;
    difficulty: PlantDifficulty;
    plantCount: number;
    thresholds: PlantThresholds;
    price: number;
    imageUrl: string;
    popular: boolean;
    active: boolean;
    createdAt: Date;
    plants: PlantSpeciesResponseDto[];
}
