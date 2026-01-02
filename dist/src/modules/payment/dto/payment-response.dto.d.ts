import { PaymentStatus } from '../types/payment-status.enum';
export declare class PaymentResponseDto {
    id: number;
    userId: number;
    subscriptionId: number;
    amount: number;
    status: PaymentStatus;
    authority: string;
    refId: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class PaymentUrlResponseDto {
    paymentUrl: string;
    authority: string;
}
