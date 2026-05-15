import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CareTaskFeedbackService } from './care-task-feedback.service';
import { CreateCareTaskFeedbackDto } from './dto/create-care-task-feedback.dto';
import { UpdateCareTaskFeedbackDto } from './dto/update-care-task-feedback.dto';

@Controller('care-task-feedback')
export class CareTaskFeedbackController {
  constructor(private readonly careTaskFeedbackService: CareTaskFeedbackService) {}

  @Post()
  create(@Body() createCareTaskFeedbackDto: CreateCareTaskFeedbackDto) {
    return this.careTaskFeedbackService.create(createCareTaskFeedbackDto);
  }

  @Get()
  findAll() {
    return this.careTaskFeedbackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.careTaskFeedbackService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCareTaskFeedbackDto: UpdateCareTaskFeedbackDto) {
    return this.careTaskFeedbackService.update(+id, updateCareTaskFeedbackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.careTaskFeedbackService.remove(+id);
  }
}
