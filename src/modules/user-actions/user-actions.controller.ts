import { Controller, Get, Post, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserActionsService } from './user-actions.service';
import { CreateActionDto } from './dto/create-action.dto';
import { CurrentUser } from '@common/decorators/current-user.decorator';

@ApiTags('User Actions')
@ApiBearerAuth('JWT')
@Controller('user-actions')
export class UserActionsController {
  constructor(private readonly actionsService: UserActionsService) {}

  @Post()
  @ApiOperation({ summary: 'Log a care action' })
  @ApiResponse({ status: 201, description: 'Action logged successfully' })
  createAction(@CurrentUser('id') userId: number, @Body() createActionDto: CreateActionDto) {
    return this.actionsService.createAction(userId, createActionDto);
  }

  @Get('my-actions')
  @ApiOperation({ summary: 'Get user action history' })
  @ApiResponse({ status: 200, description: 'List of user actions' })
  getUserActions(@CurrentUser('id') userId: number, @Query('limit') limit?: number) {
    return this.actionsService.getUserActions(userId, limit);
  }

  @Get('selection/:selectionId')
  @ApiOperation({ summary: 'Get actions for specific selection' })
  @ApiResponse({ status: 200, description: 'List of selection actions' })
  getSelectionActions(@Param('selectionId', ParseIntPipe) selectionId: number) {
    return this.actionsService.getSelectionActions(selectionId);
  }
}