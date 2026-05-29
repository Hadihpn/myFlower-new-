import { PartialType } from '@nestjs/mapped-types';
// import { CreateCareTaskFeedbackDto } from './create-care-task-feedback.dto';

import { CreateTaskFeedbackDto } from "./create-task-feedback.dto";

export class UpdateCareTaskFeedbackDto extends PartialType(CreateTaskFeedbackDto) {}
