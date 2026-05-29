// dto/complete-task.dto.ts
import { IsOptional, IsString } from 'class-validator';

export class CompleteTaskDto {
  @IsOptional()
  @IsString()
  feedback?: string;
}
