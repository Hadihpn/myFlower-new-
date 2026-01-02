import { Controller, Get, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { DailySummaryService } from './daily-summary.service';
import { SummaryQueryDto } from './dto/summary-query.dto';

@ApiTags('Daily Summary')
@ApiBearerAuth('JWT')
@Controller('daily-summary')
export class DailySummaryController {
  constructor(private readonly summaryService: DailySummaryService) {}

  @Get('device/:deviceId')
  @ApiOperation({ summary: 'Get daily summaries for device' })
  @ApiResponse({ status: 200, description: 'List of daily summaries' })
  getDeviceSummaries(
    @Param('deviceId', ParseIntPipe) deviceId: number,
    @Query() query: SummaryQueryDto,
  ) {
    const limit = query.limit ? parseInt(query.limit as any) : 30;
    return this.summaryService.getDeviceSummaries(deviceId, limit);
  }

  @Get('device/:deviceId/date/:date')
  @ApiOperation({ summary: 'Get summary for specific date' })
  @ApiResponse({ status: 200, description: 'Daily summary' })
  getSummaryByDate(
    @Param('deviceId', ParseIntPipe) deviceId: number,
    @Param('date') date: string,
  ) {
    return this.summaryService.getSummary(deviceId, new Date(date));
  }
}