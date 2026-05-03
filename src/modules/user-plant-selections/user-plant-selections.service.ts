import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPlantSelection } from './entities/user-plant-selection.entity';
import { UpdateSelectionDto } from './dto/update-selection.dto';
import { SubscriptionService } from '@modules/subscription/subscription.service';
import { DevicesService } from '@modules/devices/devices.service';
import { PlantsService } from '@modules/plants/plants.service';
import { CreateSelectionDto } from './dto/create-selection.dto';

@Injectable()
export class UserPlantSelectionsService {
  constructor(
    @InjectRepository(UserPlantSelection)
    private selectionRepository: Repository<UserPlantSelection>,
    private subscriptionService: SubscriptionService,
    private devicesService: DevicesService,
    private plantsService: PlantsService,
  ) {}

  async createSelection(
    userId: number,
    createSelectionDto: CreateSelectionDto,
  ): Promise<UserPlantSelection> {
    const { deviceId, packageId, plantSpeciesId, ...selectionData } = createSelectionDto;
    // Validate package XOR species
    if ((packageId && plantSpeciesId) || (!packageId && !plantSpeciesId)) {
      throw new BadRequestException('Must select either a package OR a species, not both');
    }
    // Verify device ownership
    const device = await this.devicesService.findDeviceById(deviceId);
    if (device.userId !== userId) {
      throw new BadRequestException('Device does not belong to user');
    }
    console.log("Check subscription slot limit")
    console.log(userId)
    // Check subscription slot limit
    const plantSlotLimit = await this.subscriptionService.checkUserPlantSlotLimit(userId);
    
    if (plantSlotLimit === 0) {
      throw new BadRequestException('No active subscription found');
    }
    
    const activeSelections = await this.selectionRepository.count({
      where: { userId, active: true },
    });
    let alreadyMonitoring: UserPlantSelection | null;
    // Verify plant/package exists
    if (packageId) {
      await this.plantsService.findPackageById(packageId);

      alreadyMonitoring = await this.selectionRepository.findOne({
        where: { userId, deviceId:device.deviceId, packageId },
      });
    } else {
      await this.plantsService.findSpeciesById(plantSpeciesId);
      alreadyMonitoring = await this.selectionRepository.findOne({
        where: { userId, deviceId, plantSpeciesId },
      });
    }
    if (alreadyMonitoring ) {
      if(alreadyMonitoring.currentlyMonitoring){
        throw new ConflictException(`Device is already monitoring this plant selection`);
      }else{
        alreadyMonitoring.currentlyMonitoring = true;
        return this.selectionRepository.save(alreadyMonitoring);
      }
    }
    if (activeSelections >= plantSlotLimit) {
      throw new BadRequestException(`Plant slot limit reached (${plantSlotLimit} slots)`);
    }
    
    
    // Create selection
    const selection = this.selectionRepository.create({
      userId,
      deviceId,
      packageId,
      plantSpeciesId,
      ...selectionData,
      currentlyMonitoring:true,
      plantedDate: selectionData.plantedDate ? new Date(selectionData.plantedDate) : null,
    });

    return this.selectionRepository.save(selection);
  }

  async getUserSelections(userId: number): Promise<UserPlantSelection[]> {
    return this.selectionRepository.find({
      where: { userId, active: true },
      relations: [
        'device',
        'package',
        'package.items',
        'package.items.plantSpecies',
        'plantSpecies',
      ],
      order: { createdAt: 'DESC' },
    });
  }

  async getDeviceSelections(userId: number, deviceId: string): Promise<UserPlantSelection[]> {
    const device = await this.devicesService.findDeviceById(deviceId);
    if (device.userId !== userId) {
      throw new BadRequestException('Device does not belong to user');
    }

    return this.selectionRepository.find({
      where: { deviceId, active: true },
      relations: ['package', 'package.items', 'package.items.plantSpecies', 'plantSpecies'],
      order: { createdAt: 'DESC' },
    });
  }

  async getCurrentlyMonitored(
    userId: number,
    deviceId: string,
  ): Promise<UserPlantSelection | null> {
    const device = await this.devicesService.findDeviceById(deviceId);

    if (device.userId !== userId) {
      throw new BadRequestException('Device does not belong to user');
    }

    const result = await this.selectionRepository.findOne({
      where: { deviceId, currentlyMonitoring: true, active: true },
      relations: ['user', 'package', 'package.items', 'package.items.plantSpecies', 'plantSpecies'],
    });

    return result;
  }

  async switchMonitoring(
    userId: number,
    deviceId: string,
    selectionId: number,
  ): Promise<UserPlantSelection> {
    const device = await this.devicesService.findDeviceById(deviceId);
    if (device.userId !== userId) {
      throw new BadRequestException('Device does not belong to user');
    }

    // Turn off current monitoring
    await this.selectionRepository.update(
      { deviceId, currentlyMonitoring: true },
      { currentlyMonitoring: false },
    );

    // Find and activate new selection
    const selection = await this.selectionRepository.findOne({
      where: { id: selectionId, deviceId, userId, active: true },
      relations: ['package', 'package.items', 'package.items.plantSpecies', 'plantSpecies'],
    });

    if (!selection) {
      throw new NotFoundException('Selection not found');
    }

    selection.currentlyMonitoring = true;
    return this.selectionRepository.save(selection);
  }

  async updateSelection(
    userId: number,
    selectionId: number,
    updateSelectionDto: UpdateSelectionDto,
  ): Promise<UserPlantSelection> {
    const selection = await this.selectionRepository.findOne({
      where: { id: selectionId, userId },
    });

    if (!selection) {
      throw new NotFoundException('Selection not found');
    }

    if (updateSelectionDto.plantedDate) {
      selection.plantedDate = new Date(updateSelectionDto.plantedDate);
      delete updateSelectionDto.plantedDate;
    }

    Object.assign(selection, updateSelectionDto);
    return this.selectionRepository.save(selection);
  }

  async deleteSelection(userId: number, selectionId: number): Promise<void> {
    const selection = await this.selectionRepository.findOne({
      where: { id: selectionId, userId },
    });

    if (!selection) {
      throw new NotFoundException('Selection not found');
    }

    await this.selectionRepository.remove(selection);
  }

  async getSelectionById(userId: number, selectionId: number): Promise<UserPlantSelection> {
    const selection = await this.selectionRepository.findOne({
      where: { id: selectionId, userId },
      relations: [
        'device',
        'package',
        'package.items',
        'package.items.plantSpecies',
        'plantSpecies',
      ],
    });

    if (!selection) {
      throw new NotFoundException('Selection not found');
    }

    return selection;
  }
}
