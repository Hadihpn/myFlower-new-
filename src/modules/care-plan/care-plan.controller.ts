import {
  Controller,
  Post,
  Param,
  UseGuards,
  ParseIntPipe,
  Logger,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CarePlan } from './entities/care-plan.entity';
import { CarePlanService } from './care-plan.services';
import { Public } from '@/common/decorators/public.decorator';
import { Request } from 'express';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';

@ApiTags('care-plans')
@ApiBearerAuth('JWT')
// @Public()
@Controller('care-plans')
@UseGuards(JwtAuthGuard)
export class CarePlanController {
  private readonly logger = new Logger(CarePlanController.name);

  constructor(private readonly carePlanService: CarePlanService) {}

  @Post(':userPlantSelectionId/initial')
  @ApiOperation({
    summary: 'Create initial care plan',
    description:
      'Creates an initial care plan for a user plant selection. Uses AI if device has 7+ days of sensor data, otherwise uses rule-based generation.',
  })
  @ApiParam({
    name: 'userPlantSelectionId',
    type: 'number',
    description: 'ID of the user plant selection',
  })
  @ApiResponse({ status: 201, description: 'Care plan created successfully', type: CarePlan })
  @ApiResponse({ status: 404, description: 'UserPlantSelection not found' })
  async createInitialCarePlan(
    @Req() req: Request,
    @Param('userPlantSelectionId', ParseIntPipe) userPlantSelectionId: number,
  ){
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎯 Protected Route Handler Executed');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    if (!req.user) {
      console.error('❌ CRITICAL: req.user is undefined!');
      console.error('   - This should never happen if Guard works correctly');
      throw new UnauthorizedException('Authentication failed');
    }

    console.log('✅ Authenticated user attached to request:');
    console.debug(JSON.stringify(req.user, null, 2));
    // console.debug(`   - User ID: ${req.user.id}`);
    // console.debug(`   - Email: ${req.user.email}`);
    // console.debug(`   - Role: ${req.user.role}`);
    console.debug(`   - Full Name: ${req.user}`);

    return this.carePlanService.createInitialPlan(userPlantSelectionId);
  }

  @Post(':carePlanId/recalibrate')
  @ApiOperation({
    summary: 'Trigger AI recalibration',
    description:
      'Cancels current plan and generates a new AI-based plan with user feedback from skipped tasks.',
  })
  @ApiParam({
    name: 'carePlanId',
    type: 'number',
    description: 'ID of the care plan to recalibrate',
  })
  @ApiResponse({ status: 200, description: 'Care plan recalibrated successfully', type: CarePlan })
  @ApiResponse({ status: 404, description: 'Care plan not found' })
  async recalibratePlan(@Param('carePlanId', ParseIntPipe) carePlanId: number): Promise<CarePlan> {
    console.log(`Triggering AI recalibration for care plan ${carePlanId}`);
    return this.carePlanService.triggerAiRecalibration(carePlanId);
  }

  @Post(':userPlantSelectionId/cancel')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Cancel current care plan',
    description: 'Cancels the active care plan for a user plant selection.',
  })
  @ApiParam({
    name: 'userPlantSelectionId',
    type: 'number',
    description: 'ID of the user plant selection',
  })
  @ApiResponse({ status: 200, description: 'Care plan cancelled successfully' })
  @ApiResponse({ status: 404, description: 'No active care plan found' })
  async cancelPlan(
    @Param('userPlantSelectionId', ParseIntPipe) userPlantSelectionId: number,
  ): Promise<{ message: string }> {
    this.logger.log(`Cancelling care plan for user plant selection ${userPlantSelectionId}`);
    await this.carePlanService.cancelCurrentPlan(userPlantSelectionId);
    return { message: 'Care plan cancelled successfully' };
  }
}
