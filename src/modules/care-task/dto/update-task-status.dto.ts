// dto/update-task-status.dto.ts
import { IsEnum } from 'class-validator';
import { TaskStatus } from '../enums/taskStatus.enum';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
