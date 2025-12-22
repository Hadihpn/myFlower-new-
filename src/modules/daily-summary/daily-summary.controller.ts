import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DailySummaryService } from './daily-summary.service';
import { CreateDailySummaryDto } from './dto/create-daily-summary.dto';
import { UpdateDailySummaryDto } from './dto/update-daily-summary.dto';

@Controller('daily-summary')
export class DailySummaryController {
  constructor(private readonly dailySummaryService: DailySummaryService) {}

  @Post()
  create(@Body() createDailySummaryDto: CreateDailySummaryDto) {
    return this.dailySummaryService.create(createDailySummaryDto);
  }

  @Get()
  findAll() {
    return this.dailySummaryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dailySummaryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDailySummaryDto: UpdateDailySummaryDto) {
    return this.dailySummaryService.update(+id, updateDailySummaryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dailySummaryService.remove(+id);
  }
}
