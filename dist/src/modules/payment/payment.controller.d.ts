import { PaymentService } from './payment.service';
import { PaymentRequestDto } from './dto/payment-request.dto';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    createPayment(userId: number, paymentRequestDto: PaymentRequestDto): Promise<{
        paymentUrl: string;
        authority: string;
    }>;
    verifyPayment(authority: string, status: string): Promise<{
        success: boolean;
        message: string;
        refId: string;
    } | {
        success: boolean;
        message: string;
        refId?: undefined;
    }>;
    getUserPayments(userId: number): Promise<import("./entities/payment.entity").Payment[]>;
    getPaymentById(id: number): Promise<import("./entities/payment.entity").Payment>;
}
