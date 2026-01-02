import { PlantCategory } from '../types/plant-category.enum';
import { PlantDifficulty } from '../types/plant-difficulty.enum';
import { PlantThresholds } from '../types/threshold.interface';
export declare class PackageItemDto {
    plantSpeciesId: number;
    position: number;
}
export declare class CreatePlantPackageDto {
    name: string;
    description: string;
    category: PlantCategory;
    difficulty: PlantDifficulty;
    plantCount: number;
    thresholds: PlantThresholds;
    price?: number;
    imageUrl?: string;
    popular?: boolean;
    active?: boolean;
    items: PackageItemDto[];
}
