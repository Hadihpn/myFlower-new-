import { PartialType } from '@nestjs/mapped-types';
import { CreateCareTaskFeedbackDto } from './create-care-task-feedback.dto';

export class UpdateCareTaskFeedbackDto extends PartialType(CreateCareTaskFeedbackDto) {}
