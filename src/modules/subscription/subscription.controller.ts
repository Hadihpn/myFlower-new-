import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionTierDto } from './dto/create-subscription-tier.dto';
import { UpdateSubscriptionTierDto } from './dto/update-subscription-tier.dto';
import { SubscribeDto } from './dto/subscribe.dto';
import { Roles } from '@common/decorators/roles.decorator';
import { RolesGuard } from '@common/guards/roles.guard';
import { UserRole } from '@modules/users/types/user-role.enum';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { Public } from '@common/decorators/public.decorator';

@ApiTags('Subscription')
@ApiBearerAuth('JWT')
@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  // Tier Management (Admin)
  @Post('tiers')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Create subscription tier (Admin only)' })
  @ApiResponse({ status: 201, description: 'Tier created successfully' })
  createTier(@Body() createTierDto: CreateSubscriptionTierDto) {
    return this.subscriptionService.createTier(createTierDto);
  }

  @Public()
  @Get('tiers')
  @ApiOperation({ summary: 'Get all active subscription tiers' })
  @ApiResponse({ status: 200, description: 'List of tiers' })
  findAllTiers() {
    return this.subscriptionService.findAllTiers();
  }

  @Get('tiers/:id')
  @ApiOperation({ summary: 'Get subscription tier by ID' })
  @ApiResponse({ status: 200, description: 'Tier found' })
  findTierById(@Param('id', ParseIntPipe) id: number) {
    return this.subscriptionService.findTierById(id);
  }

  @Patch('tiers/:id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update subscription tier (Admin only)' })
  @ApiResponse({ status: 200, description: 'Tier updated successfully' })
  updateTier(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTierDto: UpdateSubscriptionTierDto,
  ) {
    return this.subscriptionService.updateTier(id, updateTierDto);
  }

  @Delete('tiers/:id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete subscription tier (Admin only)' })
  @ApiResponse({ status: 200, description: 'Tier deleted successfully' })
  deleteTier(@Param('id', ParseIntPipe) id: number) {
    return this.subscriptionService.deleteTier(id);
  }

  // User Subscription Management
  @Post('subscribe')
  @ApiOperation({ summary: 'Subscribe to a tier' })
  @ApiResponse({
    status: 201,
    description: 'Subscription created (pending payment)',
  })
  subscribe(
    @CurrentUser('id') userId: number,
    @Body() subscribeDto: SubscribeDto,
  ) {
    return this.subscriptionService.subscribe(userId, subscribeDto);
  }

  @Get('my-subscription')
  @ApiOperation({ summary: 'Get current active subscription' })
  @ApiResponse({ status: 200, description: 'Active subscription details' })
  getMySubscription(@CurrentUser('id') userId: number) {
    return this.subscriptionService.getUserActiveSubscription(userId);
  }

  @Get('my-history')
  @ApiOperation({ summary: 'Get subscription history' })
  @ApiResponse({ status: 200, description: 'Subscription history' })
  getMyHistory(@CurrentUser('id') userId: number) {
    return this.subscriptionService.getUserSubscriptionHistory(userId);
  }

  @Post('cancel')
  @ApiOperation({ summary: 'Cancel active subscription' })
  @ApiResponse({ status: 200, description: 'Subscription cancelled' })
  cancelSubscription(@CurrentUser('id') userId: number) {
    return this.subscriptionService.cancelSubscription(userId);
  }

  @Get('my-plant-slots')
  @ApiOperation({ summary: 'Get available plant slots' })
  @ApiResponse({ status: 200, description: 'Number of available plant slots' })
  async getMyPlantSlots(@CurrentUser('id') userId: number) {
    const slots =
      await this.subscriptionService.checkUserPlantSlotLimit(userId);
    return { plantSlots: slots };
  }
}
