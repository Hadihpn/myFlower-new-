import { PartialType } from '@nestjs/mapped-types';
import { CreateUserPlantSelectionDto } from './create-user-plant-selection.dto';

export class UpdateUserPlantSelectionDto extends PartialType(CreateUserPlantSelectionDto) {}
