import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseIntPipe,
  UseGuards,
  Request,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiSecurity,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { SensorReadingsService } from './sensor-readings.service';
import { CreateSensorReadingDto } from './dto/create-sensor-reading.dto';
import { SensorQueryDto } from './dto/sensor-query.dto';
import { DeviceAuthGuard } from '@common/guards/device-auth.guard';
import { CurrentDevice } from '@common/decorators/device-auth.decorator';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { Public } from '@common/decorators/public.decorator';
import { DeviceRateLimitGuard } from '@/common/guards/DeviceRateLimitGuard.guard';
import { UserRateLimitGuard } from '@/common/guards/UserRateLimitGuard.guard';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { ChartInterval, ChartQueryDto, ChartRange } from './dto/chart-query.dto';

@ApiTags('Sensor Readings')
@Controller('sensor-readings')
export class SensorReadingsController {
  constructor(private readonly sensorReadingsService: SensorReadingsService) {}

  @Post()
  @Public()
  @UseGuards(DeviceAuthGuard)
  // @UseGuards(DeviceAuthGuard, DeviceRateLimitGuard)
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
  @UseGuards(UserRateLimitGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get device sensor readings' })
  @ApiResponse({ status: 200, description: 'List of sensor readings' })
  async getDeviceReadings(@Param('deviceId') deviceId: string, @Query() queryDto: SensorQueryDto) {
    return this.sensorReadingsService.getDeviceReadings(deviceId, queryDto);
  }

  @UseGuards(UserRateLimitGuard)
  @Get('device/:deviceId/latest')
  // @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get latest sensor reading' })
  @ApiResponse({ status: 200, description: 'Latest sensor reading' })
  async getLatestReading(@Param('deviceId', ParseIntPipe) deviceId: string) {
    return this.sensorReadingsService.getLatestReading(deviceId);
  }

  @Get('device/:deviceId/daily-stats')
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get daily statistics' })
  @ApiResponse({ status: 200, description: 'Daily statistics' })
  async getDailyStats(
    @Param('deviceId', ParseIntPipe) deviceId: number,
    @Query('date') date: string,
  ) {
    const targetDate = date ? new Date(date) : new Date();
    return this.sensorReadingsService.getDailyStats(deviceId, targetDate);
  }

  // @Get('chart/:deviceId')
  // @UseGuards(JwtAuthGuard, UserRateLimitGuard)
  // @ApiBearerAuth('JWT')
  // @ApiOperation({ summary: 'Get chart data for device sensor readings' })
  // @ApiParam({ name: 'deviceId', type: 'string' })
  // @ApiResponse({ status: 200, description: 'Chart data retrieved successfully' })
  // @ApiResponse({ status: 403, description: 'Access denied to this device' })
  // @ApiResponse({ status: 404, description: 'Device not found' })
  // async getChartData(
  //   @Param('deviceId') deviceId: string,
  //   @Query() queryDto: ChartQueryDto,
  //   @Request() req,
  // ) {
  //   const userId = req.user.id;
  //   return this.sensorReadingsService.getChartData(deviceId, userId, queryDto);
  // }

  @Get('chart/:deviceId')
  @UseGuards(JwtAuthGuard, UserRateLimitGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get aggregated chart data for a device' })
  @ApiParam({
    name: 'deviceId',
    type: 'string',
    description: 'Device UUID',
  })
  @ApiQuery({
    name: 'range',
    enum: ChartRange,
    required: false,
    description: 'Time range (default: 7d)',
  })
  @ApiQuery({
    name: 'interval',
    enum: ChartInterval,
    required: false,
    description: 'Aggregation interval (default: daily)',
  })
  async getChartData(
    @Param('deviceId') deviceId: string,
    @Query() query: ChartQueryDto,
    @Req() req: any,
  ) {
    const userId = req.user.id;
    return this.sensorReadingsService.getChartData(deviceId, userId, query.range, query.interval);
  }
}
