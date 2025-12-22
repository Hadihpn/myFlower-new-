import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AdviceService } from './advice.service';
import { CurrentUser } from '@common/decorators/current-user.decorator';

@ApiTags('Advice')
@ApiBearerAuth('JWT')
@Controller('advice')
export class AdviceController {
  constructor(private readonly adviceService: AdviceService) {}

  @Get('selection/:selectionId')
  @ApiOperation({ summary: 'Get care advice for plant selection' })
  @ApiResponse({ status: 200, description: 'Plant care advice with health score' })
  getAdviceForSelection(
    @CurrentUser('id') userId: number,
    @Param('selectionId', ParseIntPipe) selectionId: number,
  ) {
    return this.adviceService.getAdviceForSelection(userId, selectionId);
  }
}