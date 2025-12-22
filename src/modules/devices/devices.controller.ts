import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { DevicesService } from './devices.service';
import { RegisterDeviceDto } from './dto/register-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { CalibrationDto } from './dto/calibration.dto';
import { CurrentUser } from '@common/decorators/current-user.decorator';

@ApiTags('Devices')
@ApiBearerAuth('JWT')
@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new IoT device' })
  @ApiResponse({
    status: 201,
    description: 'Device registered successfully. Save the token securely!',
  })
  @ApiResponse({ status: 409, description: 'Device already exists' })
  async registerDevice(
    @CurrentUser('id') userId: number,
    @Body() registerDeviceDto: RegisterDeviceDto,
  ) {
    const { device, token } = await this.devicesService.registerDevice(
      userId,
      registerDeviceDto,
    );

    return {
      message: 'Device registered successfully. Save this token securely!',
      device,
      token,
    };
  }

  @Get('my-devices')
  @ApiOperation({ summary: 'Get all user devices' })
  @ApiResponse({ status: 200, description: 'List of user devices' })
  findUserDevices(@CurrentUser('id') userId: number) {
    return this.devicesService.findUserDevices(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get device by ID' })
  @ApiResponse({ status: 200, description: 'Device found' })
  @ApiResponse({ status: 404, description: 'Device not found' })
  findDeviceById(@Param('id', ParseIntPipe) id: number) {
    return this.devicesService.findDeviceById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update device' })
  @ApiResponse({ status: 200, description: 'Device updated successfully' })
  @ApiResponse({ status: 404, description: 'Device not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  updateDevice(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('id') userId: number,
    @Body() updateDeviceDto: UpdateDeviceDto,
  ) {
    return this.devicesService.updateDevice(id, userId, updateDeviceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete device' })
  @ApiResponse({ status: 200, description: 'Device deleted successfully' })
  @ApiResponse({ status: 404, description: 'Device not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  deleteDevice(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('id') userId: number,
  ) {
    return this.devicesService.deleteDevice(id, userId);
  }

  @Post(':id/calibrate')
  @ApiOperation({ summary: 'Calibrate device sensors' })
  @ApiResponse({ status: 200, description: 'Device calibrated successfully' })
  calibrateDevice(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser('id') userId: number,
    @Body() calibrationDto: CalibrationDto,
  ) {
    return this.devicesService.calibrateDevice(id, userId, calibrationDto);
  }
}