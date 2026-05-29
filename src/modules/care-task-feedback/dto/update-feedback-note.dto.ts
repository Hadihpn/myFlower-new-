// dto/update-feedback-note.dto.ts
import { IsString } from 'class-validator';

export class UpdateFeedbackNoteDto {
  @IsString()
  note: string;
}
