import { Injectable } from '@nestjs/common';
import { CreateUserPlantSelectionDto } from './dto/create-user-plant-selection.dto';
import { UpdateUserPlantSelectionDto } from './dto/update-user-plant-selection.dto';

@Injectable()
export class UserPlantSelectionsService {
  create(createUserPlantSelectionDto: CreateUserPlantSelectionDto) {
    return 'This action adds a new userPlantSelection';
  }

  findAll() {
    return `This action returns all userPlantSelections`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userPlantSelection`;
  }

  update(id: number, updateUserPlantSelectionDto: UpdateUserPlantSelectionDto) {
    return `This action updates a #${id} userPlantSelection`;
  }

  remove(id: number) {
    return `This action removes a #${id} userPlantSelection`;
  }
}
