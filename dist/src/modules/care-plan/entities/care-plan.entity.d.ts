export declare enum CarePlanStatus {
    ACTIVE = "active",
    REPLACED = "replaced",
    ARCHIVED = "archived"
}
interface FertilizerScheduleItem {
    dayOfCycle: number;
    productId: number;
    dosageGrams: number;
}
interface PesticideScheduleItem {
    dayOfCycle: number;
    productId: number;
    dosageMl: number;
}
export declare class CarePlan {
    id: string;
    userId: number;
    deviceId: string;
    plantSpeciesId: number;
    wateringFrequencyDays: number;
    fertilizingFrequencyDays: number;
    fertilizerSchedule: FertilizerScheduleItem[];
    pesticideSchedule: PesticideScheduleItem[];
    skipCount: number;
    status: CarePlanStatus;
    notes: string;
    replacedByPlanId: string;
    createdAt: Date;
    updatedAt: Date;
}
export {};
