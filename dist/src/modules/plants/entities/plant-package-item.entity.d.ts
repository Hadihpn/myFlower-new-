import { PlantPackage } from './plant-package.entity';
import { PlantSpecies } from './plant-species.entity';
export declare class PlantPackageItem {
    id: number;
    packageId: number;
    plantSpeciesId: number;
    position: number;
    createdAt: Date;
    package: PlantPackage;
    plantSpecies: PlantSpecies;
}
