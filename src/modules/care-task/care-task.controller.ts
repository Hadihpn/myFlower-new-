import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { CareTaskService } from './care-task.services';
import { CompleteTaskDto } from './dto/complete-task.dto';
import { SkipTaskDto } from './dto/skip-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { CreateTaskFeedbackDto } from './dto/create-task-feedback.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('care-tasks')
@ApiTags('Care Tasks')  // ← این خط رو اضافه کن
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard)
export class CareTaskController {
  constructor(private readonly careTaskService: CareTaskService) {}

  @Get('today')
  async getTodayTasks(@Request() req) {
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎯 Protected Route Handler Executed: getTodayTasks');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    return this.careTaskService.getTodayTasks(req.user.id);
  }

  @Get('plan/:carePlanId')
  async getTasksByPlan(@Param('carePlanId') carePlanId: number) {
    return this.careTaskService.findByPlan(carePlanId);
  }

  @Get('plan/:carePlanId/pending')
  async getPendingTasks(@Param('carePlanId') carePlanId: number) {
    return this.careTaskService.findPendingTasks(carePlanId);
  }

  @Post(':id/complete')
  @HttpCode(HttpStatus.OK)
  async completeTask(
    @Param('id') taskId: number,
    @Body() dto: CompleteTaskDto,
  ) {
    return this.careTaskService.completeTask(taskId, dto.feedback);
  }

  @Post(':id/skip')
  @HttpCode(HttpStatus.OK)
  async skipTask(@Param('id') taskId: number, @Body() dto: SkipTaskDto) {
    return this.careTaskService.skipTask(taskId, dto.reason);
  }

  @Patch(':id/status')
  async updateTaskStatus(
    @Param('id') taskId: number,
    @Body() dto: UpdateTaskStatusDto,
  ) {
    return this.careTaskService.updateStatus(taskId, dto.status);
  }

  @Post(':id/feedback')
  @HttpCode(HttpStatus.CREATED)
  async createFeedback(
    @Param('id') taskId: number,
    @Body() dto: CreateTaskFeedbackDto,
  ) {
    return this.careTaskService.createFeedback(
      taskId,
      dto.reason,
      dto.action,
    );
  }

  @Post('plan/:carePlanId/cancel-pending')
  @HttpCode(HttpStatus.OK)
  async cancelPendingTasks(@Param('carePlanId') carePlanId: number) {
    await this.careTaskService.cancelPendingTasks(carePlanId);
    return { message: 'Pending tasks cancelled successfully' };
  }
}
