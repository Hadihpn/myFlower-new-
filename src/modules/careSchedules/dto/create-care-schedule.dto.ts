import { IsEnum, IsNotEmpty, IsOptional, IsString, IsInt, IsDateString } from 'class-validator';
import { CareTaskType } from '../entities/care-schedules.entity';

export class CreateCareScheduleDto {
  @IsInt()
  @IsNotEmpty()
  deviceId: string;

  @IsInt()
  @IsNotEmpty()
  plantSpeciesId: number;

  @IsEnum(CareTaskType)
  @IsNotEmpty()
  taskType: CareTaskType;

  @IsDateString()
  @IsNotEmpty()
  scheduledAt: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
