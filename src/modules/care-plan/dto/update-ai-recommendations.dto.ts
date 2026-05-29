// src/modules/care-plan/dto/update-ai-recommendations.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateAiRecommendationsDto {
  @ApiProperty({
    description: 'AI-generated recommendations for plant care',
    example:
      'Based on current conditions, increase watering frequency to twice per week.',
  })
  @IsString()
  @IsNotEmpty()
  aiRecommendations: string;
}
