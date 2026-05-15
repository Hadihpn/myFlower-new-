import { Injectable } from '@nestjs/common';
import { CreateCareTaskFeedbackDto } from './dto/create-care-task-feedback.dto';
import { UpdateCareTaskFeedbackDto } from './dto/update-care-task-feedback.dto';

@Injectable()
export class CareTaskFeedbackService {
  create(createCareTaskFeedbackDto: CreateCareTaskFeedbackDto) {
    return 'This action adds a new careTaskFeedback';
  }

  findAll() {
    return `This action returns all careTaskFeedback`;
  }

  findOne(id: number) {
    return `This action returns a #${id} careTaskFeedback`;
  }

  update(id: number, updateCareTaskFeedbackDto: UpdateCareTaskFeedbackDto) {
    return `This action updates a #${id} careTaskFeedback`;
  }

  remove(id: number) {
    return `This action removes a #${id} careTaskFeedback`;
  }
}
