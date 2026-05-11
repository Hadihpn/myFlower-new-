export declare enum CareTaskType {
    WATERING = "watering",
    FERTILIZING = "fertilizing",
    PRUNING = "pruning",
    PESTICIDE = "pesticide"
}
export declare enum CareScheduleStatus {
    PENDING = "pending",
    COMPLETED = "completed",
    SKIPPED = "skipped",
    OVERDUE = "overdue"
}
export declare class CareSchedule {
    id: string;
    userId: number;
    deviceId: string;
    plantSpeciesId: number;
    taskType: CareTaskType;
    scheduledAt: Date;
    status: CareScheduleStatus;
    completedAt: Date;
    notes: string;
    reason: string;
    lastAiCallAt: Date;
    carePlanId: string;
    productId: number;
    dosage: string;
    createdAt: Date;
    updatedAt: Date;
}
