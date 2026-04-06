import { IsString, IsObject, IsEnum } from 'class-validator';

export class AddEventDto {
  @IsString()
  eventId: string;

  @IsEnum(['user_speech', 'bot_speech', 'system'])
  type: string;

  @IsObject()
  payload: Record<string, any>;

  @IsString()
  timestamp: string; // ISO string
}