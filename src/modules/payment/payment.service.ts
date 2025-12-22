import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { PaymentRequestDto } from './dto/payment-request.dto';
import { PaymentStatus } from './types/payment-status.enum';
import { SubscriptionService } from '@modules/subscription/subscription.service';
import { UsersService } from '@modules/users/users.service';
import { ZarinpalService } from './zrinpal.service';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    private zarinpalService: ZarinpalService,
    private subscriptionService: SubscriptionService,
    private usersService: UsersService,
  ) {}

  async createPaymentRequest(
    userId: number,
    paymentRequestDto: PaymentRequestDto,
  ): Promise<{ paymentUrl: string; authority: string }> {
    const { subscriptionId } = paymentRequestDto;

    // Get subscription details
    const subscription = await this.subscriptionService.findTierById(
      subscriptionId,
    );

    if (!subscription) {
      throw new NotFoundException('Subscription tier not found');
    }

    // Get user details
    const user = await this.usersService.findOne(userId);

    // Create payment record
    const payment = this.paymentRepository.create({
      userId,
      subscriptionId,
      amount: subscription.price,
      status: PaymentStatus.PENDING,
      authority: '', // Will be set after ZarinPal request
    });

    // Request payment from ZarinPal
    const { authority, paymentUrl } = await this.zarinpalService.requestPayment(
      subscription.price,
      `Subscription: ${subscription.name}`,
      user.email,
      user.phoneNumber,
    );

    // Update payment with authority
    payment.authority = authority;
    await this.paymentRepository.save(payment);

    return { paymentUrl, authority };
  }

  async verifyPayment(
    authority: string,
    status: string,
  ): Promise<{ success: boolean; refId?: string; message: string }> {
    // Find payment by authority
    const payment = await this.paymentRepository.findOne({
      where: { authority },
      relations: ['user', 'subscription'],
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    // Check if already verified
    if (payment.status === PaymentStatus.COMPLETED) {
      return {
        success: true,
        refId: payment.refId,
        message: 'Payment already verified',
      };
    }

    // Check ZarinPal status
    if (status !== 'OK') {
      payment.status = PaymentStatus.FAILED;
      await this.paymentRepository.save(payment);

      return {
        success: false,
        message: 'Payment cancelled by user',
      };
    }

    // Verify payment with ZarinPal
    try {
      const verifyResult = await this.zarinpalService.verifyPayment(
        authority,
        payment.amount,
      );

      // Update payment status
      payment.status = PaymentStatus.COMPLETED;
      payment.refId = verifyResult.ref_id.toString();
      payment.cardPan = verifyResult.card_pan;
      payment.metadata = {
        fee: verifyResult.fee,
        fee_type: verifyResult.fee_type,
        card_hash: verifyResult.card_hash,
      };

      await this.paymentRepository.save(payment);

      // Activate subscription
      await this.subscriptionService.activateSubscription(
        payment.subscriptionId,
      );

      return {
        success: true,
        refId: payment.refId,
        message: 'Payment successful',
      };
    } catch (error) {
      payment.status = PaymentStatus.FAILED;
      await this.paymentRepository.save(payment);

      throw new BadRequestException(error.message);
    }
  }

  async getUserPayments(userId: number): Promise<Payment[]> {
    return this.paymentRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async getPaymentById(id: number): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { id },
      relations: ['user', 'subscription'],
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    return payment;
  }
}
