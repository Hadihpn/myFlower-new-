import { ApiProperty } from '@nestjs/swagger';

export class SelectionResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  deviceId: number;

  @ApiProperty()
  packageId: number;

  @ApiProperty()
  plantSpeciesId: number;

  @ApiProperty()
  nickname: string;

  @ApiProperty()
  plantedDate: Date;

  @ApiProperty()
  location: string;

  @ApiProperty()
  notes: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  currentlyMonitoring: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  package?: any;

  @ApiProperty()
  plantSpecies?: any;
}