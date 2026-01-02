import { Controller, Get, Post, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';
import { SensorReadingsService } from './sensor-readings.service';
import { CreateSensorReadingDto } from './dto/create-sensor-reading.dto';
import { SensorQueryDto } from './dto/sensor-query.dto';
import { DeviceAuthGuard } from '@common/guards/device-auth.guard';
import { CurrentDevice } from '@common/decorators/device-auth.decorator';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { Public } from '@common/decorators/public.decorator';

@ApiTags('Sensor Readings')
@Controller('sensor-readings')
export class SensorReadingsController {
  constructor(private readonly sensorReadingsService: SensorReadingsService) {}

  @Post()
  @Public()
  @UseGuards(DeviceAuthGuard)
  @ApiSecurity('DeviceId')
  @ApiSecurity('DeviceToken')
  @ApiOperation({ summary: 'Submit sensor reading (Device Auth)' })
  @ApiResponse({ status: 201, description: 'Reading recorded successfully' })
  @ApiResponse({ status: 401, description: 'Invalid device credentials' })
  async createReading(
    @CurrentDevice('deviceId') deviceId: string,
    @Body() createReadingDto: CreateSensorReadingDto,
  ) {
    return this.sensorReadingsService.createReading(deviceId, createReadingDto);
  }

  @Get('device/:deviceId')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get device sensor readings' })
  @ApiResponse({ status: 200, description: 'List of sensor readings' })
  async getDeviceReadings(
    @Param('deviceId', ParseIntPipe) deviceId: number,
    @Query() queryDto: SensorQueryDto,
  ) {
    return this.sensorReadingsService.getDeviceReadings(deviceId, queryDto);
  }

  @Get('device/:deviceId/latest')
  // @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get latest sensor reading' })
  @ApiResponse({ status: 200, description: 'Latest sensor reading' })
  async getLatestReading(@Param('deviceId', ParseIntPipe) deviceId: number) {
    return this.sensorReadingsService.getLatestReading(deviceId);
  }

  @Get('device/:deviceId/daily-stats')
  // @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get daily statistics' })
  @ApiResponse({ status: 200, description: 'Daily statistics' })
  async getDailyStats(
    @Param('deviceId', ParseIntPipe) deviceId: number,
    @Query('date') date: string,
  ) {
    const targetDate = date ? new Date(date) : new Date();
    return this.sensorReadingsService.getDailyStats(deviceId, targetDate);
  }
}
