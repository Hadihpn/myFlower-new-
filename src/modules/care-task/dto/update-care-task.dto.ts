// src/care-tasks/dto/update-care-task.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateCareTaskDto } from './create-care-task.dto';

export class UpdateCareTaskDto extends PartialType(CreateCareTaskDto) {}
