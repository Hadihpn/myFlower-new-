export declare class SelectionResponseDto {
    id: number;
    userId: number;
    deviceId: number;
    packageId: number;
    plantSpeciesId: number;
    nickname: string;
    plantedDate: Date;
    location: string;
    notes: string;
    active: boolean;
    currentlyMonitoring: boolean;
    createdAt: Date;
    updatedAt: Date;
    package?: any;
    plantSpecies?: any;
}
