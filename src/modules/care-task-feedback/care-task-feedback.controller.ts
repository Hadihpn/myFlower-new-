import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CareTaskFeedbackService } from './care-task-feedback.service';
import { CreateTaskFeedbackDto } from './dto/create-task-feedback.dto';
import { UpdateFeedbackNoteDto } from './dto/update-feedback-note.dto';
import { FeedbackAction } from './enums/feedbackAction.enum';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Public } from '@/common/decorators/public.decorator';

@Controller('care-task-feedback')
@ApiTags('care-task-feedback')  
@ApiBearerAuth("JWT")
@UseGuards(JwtAuthGuard)
// @Public()
export class CareTaskFeedbackController {
  constructor(private readonly feedbackService: CareTaskFeedbackService) {}

  @Post()
  @ApiOperation({ summary: 'Submit feedback for a care task' })
  @ApiBody({ type: CreateTaskFeedbackDto })
  @ApiResponse({ status: 201, description: 'Feedback created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Body() createDto: CreateTaskFeedbackDto, @Request() req) {
     console.log("Request user",req.user)

    console.log("userId")
    // const userId = 1;
    await this.feedbackService.create(
      createDto.careTaskId,
      req.user.id,
      createDto.action,
      createDto.reason,
      createDto.note,
    );
    return
  }

  @Get('task/:careTaskId')
  @ApiOperation({ summary: 'Get all feedbacks for a specific care task' })
  @ApiParam({ name: 'careTaskId', type: Number, description: 'Care task ID' })
  @ApiResponse({ status: 200, description: 'List of feedbacks for the task' })
  @ApiResponse({ status: 404, description: 'Care task not found' })
  async findByTask(@Param('careTaskId', ParseIntPipe) careTaskId: number) {
    return this.feedbackService.findByTask(careTaskId);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all feedbacks submitted by a specific user' })
  @ApiParam({ name: 'userId', type: Number, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'List of feedbacks by the user' })
  async findByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.feedbackService.findByUser(userId);
  }

  @Get('task/:careTaskId/user/:userId')
  @ApiOperation({ summary: 'Get feedbacks for a specific task by a specific user' })
  @ApiParam({ name: 'careTaskId', type: Number, description: 'Care task ID' })
  @ApiParam({ name: 'userId', type: Number, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Feedback record found' })
  @ApiResponse({ status: 404, description: 'Not found' })
  async findByTaskAndUser(
    @Param('careTaskId', ParseIntPipe) careTaskId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.feedbackService.findByTaskAndUser(careTaskId, userId);
  }

  @Get('action/:action')
   @ApiOperation({ summary: 'Get all feedbacks filtered by action type' })
  @ApiParam({ name: 'action', enum: FeedbackAction, description: 'Feedback action (e.g. DONE, SKIPPED)' })
  @ApiResponse({ status: 200, description: 'List of feedbacks with the given action' })
  async findByAction(@Param('action') action: FeedbackAction) {
    return this.feedbackService.findByAction(action);
  }

  @Get('task/:careTaskId/stats')
   @ApiOperation({ summary: 'Get feedback statistics for a specific care task' })
  @ApiParam({ name: 'careTaskId', type: Number, description: 'Care task ID' })
  @ApiResponse({ status: 200, description: 'Feedback stats for the task' })
  async getTaskStats(@Param('careTaskId', ParseIntPipe) careTaskId: number) {
    return this.feedbackService.getTaskFeedbackStats(careTaskId);
  }

  @Get('user/:userId/stats')
  @ApiOperation({ summary: 'Get feedback statistics for a specific user' })
  @ApiParam({ name: 'userId', type: Number, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Feedback stats for the user' })
  async getUserStats(@Param('userId', ParseIntPipe) userId: number) {
    return this.feedbackService.getUserFeedbackStats(userId);
  }

  @Get(':id')
   @ApiOperation({ summary: 'Get a single feedback record by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Feedback record ID' })
  @ApiResponse({ status: 200, description: 'Feedback record found' })
  @ApiResponse({ status: 404, description: 'Feedback not found' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.feedbackService.findOne(id);
  }

  @Patch(':id/note')
  async updateNote(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateFeedbackNoteDto,
  ) {
    return this.feedbackService.updateNote(id, updateDto.note);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.feedbackService.delete(id);
    return { message: 'Feedback deleted successfully' };
  }
}
