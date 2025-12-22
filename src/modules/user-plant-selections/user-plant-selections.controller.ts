import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserPlantSelectionsService } from './user-plant-selections.service';
import { CreateUserPlantSelectionDto } from './dto/create-user-plant-selection.dto';
import { UpdateUserPlantSelectionDto } from './dto/update-user-plant-selection.dto';

@Controller('user-plant-selections')
export class UserPlantSelectionsController {
  constructor(private readonly userPlantSelectionsService: UserPlantSelectionsService) {}

  @Post()
  create(@Body() createUserPlantSelectionDto: CreateUserPlantSelectionDto) {
    return this.userPlantSelectionsService.create(createUserPlantSelectionDto);
  }

  @Get()
  findAll() {
    return this.userPlantSelectionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userPlantSelectionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserPlantSelectionDto: UpdateUserPlantSelectionDto) {
    return this.userPlantSelectionsService.update(+id, updateUserPlantSelectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userPlantSelectionsService.remove(+id);
  }
}
