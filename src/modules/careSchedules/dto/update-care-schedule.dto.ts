import { IsEnum, IsOptional, IsString, IsDateString } from 'class-validator';
import { CareScheduleStatus } from '../entities/care-schedules.entity';

export class UpdateCareScheduleDto {
  @IsDateString()
  @IsOptional()
  scheduledAt?: string;

  @IsEnum(CareScheduleStatus)
  @IsOptional()
  status?: CareScheduleStatus;

  @IsString()
  @IsOptional()
  notes?: string;
}
