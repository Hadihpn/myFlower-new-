import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDeviceDto {
  @ApiProperty({ example: 'DEVICE_12345' })
  @IsString()
  @IsNotEmpty()
  deviceId: string;

  @ApiProperty({ example: 'Backyard Garden Sensor' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Backyard' })
  @IsString()
  @IsNotEmpty()
  location: string;
}