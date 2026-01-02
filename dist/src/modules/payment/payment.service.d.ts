import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { PaymentRequestDto } from './dto/payment-request.dto';
import { SubscriptionService } from '@modules/subscription/subscription.service';
import { UsersService } from '@modules/users/users.service';
import { ZarinpalService } from './zarinpal.service';
export declare class PaymentService {
    private paymentRepository;
    private zarinpalService;
    private subscriptionService;
    private usersService;
    constructor(paymentRepository: Repository<Payment>, zarinpalService: ZarinpalService, subscriptionService: SubscriptionService, usersService: UsersService);
    createPaymentRequest(userId: number, paymentRequestDto: PaymentRequestDto): Promise<{
        paymentUrl: string;
        authority: string;
    }>;
    verifyPayment(authority: string, status: string): Promise<{
        success: boolean;
        refId?: string;
        message: string;
    }>;
    getUserPayments(userId: number): Promise<Payment[]>;
    getPaymentById(id: number): Promise<Payment>;
}
