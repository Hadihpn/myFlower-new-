import { ApiProperty } from '@nestjs/swagger';

export class AdminDashboardDto {
  @ApiProperty()
  totalUsers: number;

  @ApiProperty()
  totalDevices: number;

  @ApiProperty()
  activeDevices: number;

  @ApiProperty()
  totalReadings: number;

  @ApiProperty()
  activeSubscriptions: number;

  @ApiProperty()
  timestamp: Date;
}
