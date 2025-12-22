import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SensorVerificationService } from './sensor-verification.service';
import { CreateSensorVerificationDto } from './dto/create-sensor-verification.dto';
import { UpdateSensorVerificationDto } from './dto/update-sensor-verification.dto';

@Controller('sensor-verification')
export class SensorVerificationController {
  constructor(private readonly sensorVerificationService: SensorVerificationService) {}

  @Post()
  create(@Body() createSensorVerificationDto: CreateSensorVerificationDto) {
    return this.sensorVerificationService.create(createSensorVerificationDto);
  }

  @Get()
  findAll() {
    return this.sensorVerificationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sensorVerificationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSensorVerificationDto: UpdateSensorVerificationDto) {
    return this.sensorVerificationService.update(+id, updateSensorVerificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sensorVerificationService.remove(+id);
  }
}
