"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const payment_entity_1 = require("./entities/payment.entity");
const payment_status_enum_1 = require("./types/payment-status.enum");
const subscription_service_1 = require("../subscription/subscription.service");
const users_service_1 = require("../users/users.service");
const zarinpal_service_1 = require("./zarinpal.service");
let PaymentService = class PaymentService {
    constructor(paymentRepository, zarinpalService, subscriptionService, usersService) {
        this.paymentRepository = paymentRepository;
        this.zarinpalService = zarinpalService;
        this.subscriptionService = subscriptionService;
        this.usersService = usersService;
    }
    async createPaymentRequest(userId, paymentRequestDto) {
        const { subscriptionId } = paymentRequestDto;
        const subscription = await this.subscriptionService.findTierById(subscriptionId);
        if (!subscription) {
            throw new common_1.NotFoundException('Subscription tier not found');
        }
        const user = await this.usersService.findOne(userId);
        const payment = this.paymentRepository.create({
            userId,
            subscriptionId,
            amount: subscription.price,
            status: payment_status_enum_1.PaymentStatus.PENDING,
            authority: '',
        });
        const { authority, paymentUrl } = await this.zarinpalService.requestPayment(subscription.price, `Subscription: ${subscription.name}`, user.email, user.phoneNumber);
        payment.authority = authority;
        await this.paymentRepository.save(payment);
        return { paymentUrl, authority };
    }
    async verifyPayment(authority, status) {
        const payment = await this.paymentRepository.findOne({
            where: { authority },
            relations: ['user', 'subscription'],
        });
        if (!payment) {
            throw new common_1.NotFoundException('Payment not found');
        }
        if (payment.status === payment_status_enum_1.PaymentStatus.COMPLETED) {
            return {
                success: true,
                refId: payment.refId,
                message: 'Payment already verified',
            };
        }
        if (status !== 'OK') {
            payment.status = payment_status_enum_1.PaymentStatus.FAILED;
            await this.paymentRepository.save(payment);
            return {
                success: false,
                message: 'Payment cancelled by user',
            };
        }
        try {
            const verifyResult = await this.zarinpalService.verifyPayment(authority, payment.amount);
            payment.status = payment_status_enum_1.PaymentStatus.COMPLETED;
            payment.refId = verifyResult.ref_id.toString();
            payment.cardPan = verifyResult.card_pan;
            payment.metadata = {
                fee: verifyResult.fee,
                fee_type: verifyResult.fee_type,
                card_hash: verifyResult.card_hash,
            };
            await this.paymentRepository.save(payment);
            await this.subscriptionService.activateSubscription(payment.subscriptionId);
            return {
                success: true,
                refId: payment.refId,
                message: 'Payment successful',
            };
        }
        catch (error) {
            payment.status = payment_status_enum_1.PaymentStatus.FAILED;
            await this.paymentRepository.save(payment);
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getUserPayments(userId) {
        return this.paymentRepository.find({
            where: { userId },
            order: { createdAt: 'DESC' },
        });
    }
    async getPaymentById(id) {
        const payment = await this.paymentRepository.findOne({
            where: { id },
            relations: ['user', 'subscription'],
        });
        if (!payment) {
            throw new common_1.NotFoundException('Payment not found');
        }
        return payment;
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        zarinpal_service_1.ZarinpalService,
        subscription_service_1.SubscriptionService,
        users_service_1.UsersService])
], PaymentService);
//# sourceMappingURL=payment.service.js.map