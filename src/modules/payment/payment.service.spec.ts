import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentService } from './payment.service';
import { Payment } from './entities/payment.entity';
import { SubscriptionService } from '@modules/subscription/subscription.service';
import { UsersService } from '@modules/users/users.service';
import { PaymentStatus } from './types/payment-status.enum';
import { NotFoundException } from '@nestjs/common';
import { ZarinpalService } from './zrinpal.service';

describe('PaymentService', () => {
  let service: PaymentService;
  let repository: Repository<Payment>;

  const mockPayment = {
    id: 1,
    userId: 1,
    subscriptionId: 1,
    amount: 5.0,
    status: PaymentStatus.PENDING,
    authority: 'A00000000000000000000000000123456',
    refId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockRepository = {
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockZarinpalService = {
    requestPayment: jest.fn(),
    verifyPayment: jest.fn(),
  };

  const mockSubscriptionService = {
    findTierById: jest.fn(),
    activateSubscription: jest.fn(),
  };

  const mockUsersService = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        {
          provide: getRepositoryToken(Payment),
          useValue: mockRepository,
        },
        {
          provide: ZarinpalService,
          useValue: mockZarinpalService,
        },
        {
          provide: SubscriptionService,
          useValue: mockSubscriptionService,
        },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
    repository = module.get<Repository<Payment>>(getRepositoryToken(Payment));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createPaymentRequest', () => {
    it('should create payment request successfully', async () => {
      const paymentRequestDto = { subscriptionId: 1 };
      const mockTier = { id: 1, name: 'Bronze', price: 5.0 };
      const mockUser = { id: 1, email: 'test@example.com', phoneNumber: '123' };

      mockSubscriptionService.findTierById.mockResolvedValue(mockTier);
      mockUsersService.findOne.mockResolvedValue(mockUser);
      mockRepository.create.mockReturnValue(mockPayment);
      mockRepository.save.mockResolvedValue(mockPayment);
      mockZarinpalService.requestPayment.mockResolvedValue({
        authority: 'A00000000000000000000000000123456',
        paymentUrl: 'https://sandbox.zarinpal.com/pg/StartPay/A00000000000000000000000000123456',
      });

      const result = await service.createPaymentRequest(1, paymentRequestDto);

      expect(result).toHaveProperty('paymentUrl');
      expect(result).toHaveProperty('authority');
      expect(mockZarinpalService.requestPayment).toHaveBeenCalled();
    });
  });

  describe('verifyPayment', () => {
    it('should verify payment successfully', async () => {
      const authority = 'A00000000000000000000000000123456';
      const status = 'OK';

      mockRepository.findOne.mockResolvedValue(mockPayment);
      mockRepository.save.mockResolvedValue({
        ...mockPayment,
        status: PaymentStatus.COMPLETED,
      });
      mockZarinpalService.verifyPayment.mockResolvedValue({
        code: 100,
        ref_id: 123456,
        card_pan: '1234****5678',
        fee: 0,
        fee_type: 'Merchant',
      });

      const result = await service.verifyPayment(authority, status);

      expect(result.success).toBe(true);
      expect(mockSubscriptionService.activateSubscription).toHaveBeenCalled();
    });

    it('should throw NotFoundException if payment not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(
        service.verifyPayment('invalid', 'OK'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('getUserPayments', () => {
    it('should return user payment history', async () => {
      mockRepository.find.mockResolvedValue([mockPayment]);

      const result = await service.getUserPayments(1);

      expect(result).toHaveLength(1);
      expect(result[0].userId).toBe(1);
    });
  });
});
