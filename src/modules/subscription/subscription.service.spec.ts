import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubscriptionService } from './subscription.service';
import { SubscriptionTier } from './entities/subscription-tier.entity';
import { UserSubscription } from './entities/user-subscription.entity';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { BillingCycle } from './types/billing-cycle.enum';
import { SubscriptionStatus } from './types/subscription-status.enum';

describe('SubscriptionService', () => {
  let service: SubscriptionService;
  let tierRepository: Repository<SubscriptionTier>;
  let subscriptionRepository: Repository<UserSubscription>;

  const mockTier = {
    id: 1,
    name: 'Bronze',
    plantSlotLimit: 3,
    price: 5.0,
    billingCycle: BillingCycle.MONTHLY,
    features: {},
    active: true,
    createdAt: new Date(),
  };

  const mockSubscription = {
    id: 1,
    userId: 1,
    tierId: 1,
    status: SubscriptionStatus.ACTIVE,
    startDate: new Date(),
    endDate: new Date(),
    autoRenew: true,
    tier: mockTier,
  };

  const mockTierRepository = {
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  const mockSubscriptionRepository = {
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    count: jest.fn(),
    createQueryBuilder: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubscriptionService,
        {
          provide: getRepositoryToken(SubscriptionTier),
          useValue: mockTierRepository,
        },
        {
          provide: getRepositoryToken(UserSubscription),
          useValue: mockSubscriptionRepository,
        },
      ],
    }).compile();

    service = module.get<SubscriptionService>(SubscriptionService);
    tierRepository = module.get(getRepositoryToken(SubscriptionTier));
    subscriptionRepository = module.get(getRepositoryToken(UserSubscription));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAllTiers', () => {
    it('should return all active tiers', async () => {
      mockTierRepository.find.mockResolvedValue([mockTier]);

      const result = await service.findAllTiers();

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Bronze');
    });
  });

  describe('subscribe', () => {
    it('should create a pending subscription', async () => {
      const subscribeDto = { tierId: 1, autoRenew: true };

      mockTierRepository.findOne.mockResolvedValue(mockTier);
      mockSubscriptionRepository.findOne.mockResolvedValue(null);
      mockSubscriptionRepository.create.mockReturnValue(mockSubscription);
      mockSubscriptionRepository.save.mockResolvedValue(mockSubscription);

      const result = await service.subscribe(1, subscribeDto);

      expect(result).toBeDefined();
      expect(mockSubscriptionRepository.create).toHaveBeenCalled();
    });

    it('should throw ConflictException if user has active subscription', async () => {
      const subscribeDto = { tierId: 1 };

      mockTierRepository.findOne.mockResolvedValue(mockTier);
      mockSubscriptionRepository.findOne.mockResolvedValue(mockSubscription);

      await expect(service.subscribe(1, subscribeDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('checkUserPlantSlotLimit', () => {
    it('should return plant slot limit for active subscription', async () => {
      mockSubscriptionRepository.findOne.mockResolvedValue(mockSubscription);

      const result = await service.checkUserPlantSlotLimit(1);

      expect(result).toBe(3);
    });

    it('should return 0 if no active subscription', async () => {
      mockSubscriptionRepository.findOne.mockResolvedValue(null);

      const result = await service.checkUserPlantSlotLimit(1);

      expect(result).toBe(0);
    });
  });
});