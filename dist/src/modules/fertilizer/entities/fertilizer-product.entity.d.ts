export declare enum ProductType {
    NPK = "npk",
    ORGANIC = "organic",
    PESTICIDE = "pesticide"
}
export declare class FertilizerProduct {
    id: number;
    name: string;
    type: ProductType;
    npkRatio: string;
    activeIngredient: string;
    recommendedDosagePerLiter: number;
    description: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
