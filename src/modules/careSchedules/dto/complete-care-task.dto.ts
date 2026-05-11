import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CompleteCareTaskDto {
  @IsBoolean()
  @IsOptional()
  rejected?: boolean; // برای رد کردن توسط کاربر

  @IsString()
  @IsOptional()
  notes?: string;
}
