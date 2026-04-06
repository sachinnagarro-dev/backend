import { IsString, IsOptional, IsObject } from 'class-validator';

export class CreateSessionDto {
  @IsString()
  sessionId: string;

  @IsString()
  language: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}