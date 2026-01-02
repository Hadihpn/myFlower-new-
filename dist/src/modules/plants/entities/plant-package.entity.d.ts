import { PlantCategory } from '../types/plant-category.enum';
import { PlantDifficulty } from '../types/plant-difficulty.enum';
import { PlantThresholds } from '../types/threshold.interface';
import { UserPlantSelection } from '@modules/user-plant-selections/entities/user-plant-selection.entity';
import { PlantPackageItem } from './plant-package-item.entity';
export declare class PlantPackage {
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
    items: PlantPackageItem[];
    userSelections: UserPlantSelection[];
}
