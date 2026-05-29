// dto/skip-task.dto.ts
import { IsOptional, IsString } from 'class-validator';

export class SkipTaskDto {
  @IsOptional()
  @IsString()
  reason?: string;
}
