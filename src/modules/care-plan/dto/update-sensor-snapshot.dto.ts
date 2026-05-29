// src/modules/care-plan/dto/update-sensor-snapshot.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsObject } from 'class-validator';

export class UpdateSensorSnapshotDto {
  @ApiProperty({
    type: 'object',
    description: 'Sensor data snapshot',
    example: {
      temperature: 22.5,
      humidity: 65,
      soilMoisture: 45,
      lightLevel: 800,
    },
  })
  @IsObject()
  sensorSnapshot: Record<string, any>;
}
