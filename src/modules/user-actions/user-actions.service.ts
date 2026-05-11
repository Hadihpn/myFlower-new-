import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { UserAction } from './entities/user-action.entity';
import { CreateActionDto } from './dto/create-action.dto';
import { ActionType } from './types/action-type.enum';
import { DevicesService } from '../devices/devices.service';

@Injectable()
export class UserActionsService {
  constructor(
    @InjectRepository(UserAction)
    private actionRepository: Repository<UserAction>,
    private devicesService: DevicesService,
  ) {}

  async createAction(userId: number, createActionDto: CreateActionDto): Promise<UserAction> {
    console.log('userId');
    console.log(userId);
    console.log('createActionDto');
    console.log(createActionDto);
    const { selectionId, deviceId, ...actionData } = createActionDto;
    const userDevices = await this.devicesService.findUserDevices(userId);
    let userDevice = userDevices.find((device) => device.deviceId == deviceId);
    if (!userDevice) throw new ForbiddenException('send data only for your devices');
    const action = this.actionRepository.create({
      userId,
      selectionId,
      deviceId: userDevice.id, // Will be set from selection
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
