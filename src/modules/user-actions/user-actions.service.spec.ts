import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserActionsService } from './user-actions.service';
import { UserAction } from './entities/user-action.entity';
import { ActionType } from './types/action-type.enum';

describe('UserActionsService', () => {
  let service: UserActionsService;
  let repository: Repository<UserAction>;

  const mockAction = {
    id: 1,
    userId: 1,
    deviceId: 1,
    selectionId: 1,
    actionType: ActionType.WATERED,
    notes: 'Watered thoroughly',
    actionDate: new Date(),
    createdAt: new Date(),
  };

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserActionsService,
        {
          provide: getRepositoryToken(UserAction),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserActionsService>(UserActionsService);
    repository = module.get<Repository<UserAction>>(
      getRepositoryToken(UserAction),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createAction', () => {
    it('should create a new action', async () => {
      const createDto = {
        selectionId: 1,
        actionType: ActionType.WATERED,
        notes: 'Watered thoroughly',
      };

      mockRepository.create.mockReturnValue(mockAction);
      mockRepository.save.mockResolvedValue(mockAction);

      const result = await service.createAction(1, createDto);

      expect(result).toEqual(mockAction);
      expect(mockRepository.create).toHaveBeenCalled();
      expect(mockRepository.save).toHaveBeenCalled();
    });
  });

  describe('getSelectionActions', () => {
    it('should return actions for a selection', async () => {
      mockRepository.find.mockResolvedValue([mockAction]);

      const result = await service.getSelectionActions(1);

      expect(result).toEqual([mockAction]);
      expect(mockRepository.find).toHaveBeenCalledWith({
        where: { selectionId: 1 },
        order: { actionDate: 'DESC' },
        take: 50,
      });
    });
  });

  describe('getLastAction', () => {
    it('should return last action of specific type', async () => {
      mockRepository.findOne.mockResolvedValue(mockAction);

      const result = await service.getLastAction(1, ActionType.WATERED);

      expect(result).toEqual(mockAction);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { selectionId: 1, actionType: ActionType.WATERED },
        order: { actionDate: 'DESC' },
      });
    });

    it('should return null if no action found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      const result = await service.getLastAction(1, ActionType.FERTILIZED);

      expect(result).toBeNull();
    });
  });

  describe('getUserActions', () => {
    it('should return user action history', async () => {
      mockRepository.find.mockResolvedValue([mockAction]);

      const result = await service.getUserActions(1);

      expect(result).toEqual([mockAction]);
      expect(mockRepository.find).toHaveBeenCalled();
    });

    it('should respect limit parameter', async () => {
      mockRepository.find.mockResolvedValue([mockAction]);

      await service.getUserActions(1, 25);

      expect(mockRepository.find).toHaveBeenCalledWith(
        expect.objectContaining({ take: 25 }),
      );
    });
  });
});
  