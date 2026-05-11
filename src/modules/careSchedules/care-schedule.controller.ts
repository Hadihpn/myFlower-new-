import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CareScheduleService } from './care-schedule.service';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';

@ApiTags('Care Schedules')
@ApiBearerAuth('JWT')
@Controller('care-schedules')
@UseGuards(JwtAuthGuard)
export class CareScheduleController {
  constructor(private readonly careScheduleService: CareScheduleService) {}

  /**
   * تولید برنامه مراقبت هوشمند (AI یا Rule-Based)
   * بر اساس تعداد UserAction ها تصمیم‌گیری می‌شود
   */
  @Post('generate')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ 
    summary: 'تولید برنامه مراقبت هوشمند',
    description: 'اگر بیش از 10 UserAction وجود داشته باشد، از AI استفاده می‌شود، در غیر این صورت از قوانین پایه'
  })
  @ApiBody({
    schema: {
      type: 'object',
      required: ['deviceId'],
      properties: {
        deviceId: {
          type: 'string',
          description: 'شناسه دستگاه سنسور',
          example: 'test-device-001',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'برنامه مراقبت با موفقیت تولید شد',
  })
  @ApiResponse({ 
    status: 404, 
    description: 'دستگاه یافت نشد یا انتخاب گیاه فعالی برای این دستگاه وجود ندارد' 
  })
  @ApiResponse({ status: 401, description: 'عدم احراز هویت' })
  async generateSchedule(
    @Request() req,
    @Body('deviceId') deviceId: string,
  ) {
    return this.careScheduleService.generateAdaptiveSchedule(
      req.user.id,
      deviceId,
    );
  }

  /**
   * دریافت آخرین برنامه مراقبت فعال برای یک دستگاه
   */
  @Get('latest/:deviceId')
  @ApiOperation({ 
    summary: 'دریافت آخرین برنامه مراقبت فعال',
    description: 'آخرین برنامه مراقبت با وضعیت ACTIVE برای دستگاه مشخص شده'
  })
  @ApiParam({
    name: 'deviceId',
    type: String,
    description: 'شناسه دستگاه سنسور',
    example: 'test-device-001',
  })
  @ApiResponse({
    status: 200,
    description: 'آخرین برنامه مراقبت فعال',
  })
  @ApiResponse({ 
    status: 404, 
    description: 'دستگاه یافت نشد یا برنامه مراقبت فعالی وجود ندارد' 
  })
  @ApiResponse({ status: 401, description: 'عدم احراز هویت' })
  async getLatestSchedule(
    @Request() req,
    @Param('deviceId') deviceId: string,
  ) {
    return this.careScheduleService.getLatestSchedule(req.user.id, deviceId);
  }
}
