import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { SensorVerificationService } from './sensor-verification.service';
import { CurrentUser } from '@common/decorators/current-user.decorator';

@ApiTags('Sensor Verification')
@ApiBearerAuth('JWT')
@Controller('sensor-verification')
export class SensorVerificationController {
  constructor(
    private readonly verificationService: SensorVerificationService,
  ) {}

  @Get('device/:deviceId/pending')
  @ApiOperation({ summary: 'Get pending verifications for device' })
  @ApiResponse({ status: 200, description: 'List of pending verifications' })
  getPendingVerifications(@Param('deviceId', ParseIntPipe) deviceId: number) {
    return this.verificationService.getPendingVerifications(deviceId);
  }

  @Get('device/:deviceId/history')
  @ApiOperation({ summary: 'Get verification history for device' })
  @ApiResponse({ status: 200, description: 'Verification history' })
  getVerificationHistory(@Param('deviceId', ParseIntPipe) deviceId: number) {
    return this.verificationService.getDeviceVerificationHistory(deviceId);
  }
}
