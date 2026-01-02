import { IsBoolean } from "class-validator";

export class SensorReadingResponseDto {
  @IsBoolean()
  overHeat: boolean;
  @IsBoolean()
  cold: boolean;
  @IsBoolean()
  moistSuddenChange: boolean;

}