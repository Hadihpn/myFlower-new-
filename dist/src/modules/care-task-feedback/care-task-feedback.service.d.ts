import { CreateCareTaskFeedbackDto } from './dto/create-care-task-feedback.dto';
import { UpdateCareTaskFeedbackDto } from './dto/update-care-task-feedback.dto';
export declare class CareTaskFeedbackService {
    create(createCareTaskFeedbackDto: CreateCareTaskFeedbackDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateCareTaskFeedbackDto: UpdateCareTaskFeedbackDto): string;
    remove(id: number): string;
}
