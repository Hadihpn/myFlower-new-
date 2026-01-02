import { Test, TestingModule } from '@nestjs/testing';
import { UserActionsController } from './user-actions.controller';
import { UserActionsService } from './user-actions.service';
import { ActionType } from './types/action-type.enum';

describe('UserActionsController', () => {
  let controller: UserActionsController;
  let service: UserActionsService;

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

  const mockService = {
    createAction: jest.fn(),
    getUserActions: jest.fn(),
    getSelectionActions: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserActionsController],
      providers: [
        {
          provide: UserActionsService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<UserActionsController>(UserActionsController);
    service = module.get<UserActionsService>(UserActionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createAction', () => {
    it('should create an action', async () => {
      const createDto = {
        selectionId: 1,
        actionType: ActionType.WATERED,
        notes: 'Test',
      };

      mockService.createAction.mockResolvedValue(mockAction);

      const result = await controller.createAction(1, createDto);

      expect(result).toEqual(mockAction);
      expect(service.createAction).toHaveBeenCalledWith(1, createDto);
    });
  });

  describe('getUserActions', () => {
    it('should return user actions', async () => {
      mockService.getUserActions.mockResolvedValue([mockAction]);

      const result = await controller.getUserActions(1, undefined);

      expect(result).toEqual([mockAction]);
      expect(service.getUserActions).toHaveBeenCalledWith(1, undefined);
    });
  });
});
