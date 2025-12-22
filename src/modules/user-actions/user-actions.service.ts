import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { UserAction } from './entities/user-action.entity';
import { CreateActionDto } from './dto/create-action.dto';
import { ActionType } from './types/action-type.enum';

@Injectable()
export class UserActionsService {
  constructor(
    @InjectRepository(UserAction)
    private actionRepository: Repository<UserAction>,
  ) {}

  async createAction(userId: number, createActionDto: CreateActionDto): Promise<UserAction> {
    const { selectionId, ...actionData } = createActionDto;

    const action = this.actionRepository.create({
      userId,
      selectionId,
      deviceId: 0, // Will be set from selection
      ...actionData,
      actionDate: actionData.actionDate ? new Date(actionData.actionDate) : new Date(),
    });

    return this.actionRepository.save(action);
  }

  async getSelectionActions(selectionId: number): Promise<UserAction[]> {
    return this.actionRepository.find({
      where: { selectionId },
      order: { actionDate: 'DESC' },
      take: 50,
    });
  }

  async getLastAction(selectionId: number, actionType: ActionType): Promise<UserAction | null> {
    return this.actionRepository.findOne({
      where: { selectionId, actionType },
      order: { actionDate: 'DESC' },
    });
  }

  async getUserActions(userId: number, limit: number = 50): Promise<UserAction[]> {
    return this.actionRepository.find({
      where: { userId },
      relations: ['selection'],
      order: { actionDate: 'DESC' },
      take: limit,
    });
  }
}
