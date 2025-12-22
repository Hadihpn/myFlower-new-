import { PartialType } from '@nestjs/swagger';
import { CreatePlantGroupDto } from './create-plant-group.dto';

export class UpdatePlantGroupDto extends PartialType(CreatePlantGroupDto) {}