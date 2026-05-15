import { CareTaskFeedbackService } from './care-task-feedback.service';
import { CreateCareTaskFeedbackDto } from './dto/create-care-task-feedback.dto';
import { UpdateCareTaskFeedbackDto } from './dto/update-care-task-feedback.dto';
export declare class CareTaskFeedbackController {
    private readonly careTaskFeedbackService;
    constructor(careTaskFeedbackService: CareTaskFeedbackService);
    create(createCareTaskFeedbackDto: CreateCareTaskFeedbackDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateCareTaskFeedbackDto: UpdateCareTaskFeedbackDto): string;
    remove(id: string): string;
}
