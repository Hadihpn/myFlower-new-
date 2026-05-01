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
import { UserPlantSelectionsService } from './user-plant-selections.service';
import { CreateSelectionDto } from './dto/create-selection.dto';
import { UpdateSelectionDto } from './dto/update-selection.dto';
import { SwitchMonitoringDto } from './dto/switch-monitoring.dto';
import { CurrentUser } from '@common/decorators/current-user.decorator';

@ApiTags('User Plant Selections')
@ApiBearerAuth('JWT')
@Controller('user-plant-selections')
export class UserPlantSelectionsController {
  constructor(
    private readonly selectionsService: UserPlantSelectionsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create plant selection' })
  @ApiResponse({ status: 201, description: 'Selection created successfully' })
  @ApiResponse({ status: 400, description: 'Slot limit reached or invalid data' })
  createSelection(
    @CurrentUser('id') userId: number,
    @Body() createSelectionDto: CreateSelectionDto,
  ) {
    console.log("deviceID :",createSelectionDto.deviceId);
    
    return this.selectionsService.createSelection(userId, createSelectionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all user selections' })
  @ApiResponse({ status: 200, description: 'List of selections' })
  getUserSelections(@CurrentUser('id') userId: number) {
    return this.selectionsService.getUserSelections(userId);
  }

  @Get('device/:deviceId')
  @ApiOperation({ summary: 'Get selections for specific device' })
  @ApiResponse({ status: 200, description: 'List of device selections' })
  getDeviceSelections(
    @CurrentUser('id') userId: number,
    @Param('deviceId') deviceId: string,
  ) {
    
    return this.selectionsService.getDeviceSelections(userId, deviceId);
  }

  @Get('device/:deviceId/current')
  @ApiOperation({ summary: 'Get currently monitored plant' })
  @ApiResponse({ status: 200, description: 'Currently monitored selection' })
  getCurrentlyMonitored(
    @CurrentUser('id') userId: number,
    @Param('deviceId', ParseIntPipe) deviceId: string,
  ) {
    return this.selectionsService.getCurrentlyMonitored(userId, deviceId);
  }

  @Post('device/:deviceId/switch')
  @ApiOperation({ summary: 'Switch monitoring to different plant' })
  @ApiResponse({ status: 200, description: 'Monitoring switched successfully' })
  switchMonitoring(
    @CurrentUser('id') userId: number,
    @Param('deviceId', ParseIntPipe) deviceId: string,
    @Body() switchDto: SwitchMonitoringDto,
  ) {
    return this.selectionsService.switchMonitoring(
      userId,
      deviceId,
      switchDto.selectionId,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get selection by ID' })
  @ApiResponse({ status: 200, description: 'Selection found' })
  getSelectionById(
    @CurrentUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.selectionsService.getSelectionById(userId, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update selection' })
  @ApiResponse({ status: 200, description: 'Selection updated successfully' })
  updateSelection(
    @CurrentUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSelectionDto: UpdateSelectionDto,
  ) {
    return this.selectionsService.updateSelection(
      userId,
      id,
      updateSelectionDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete selection' })
  @ApiResponse({ status: 200, description: 'Selection deleted successfully' })
  deleteSelection(
    @CurrentUser('id') userId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.selectionsService.deleteSelection(userId, id);
  }
}
