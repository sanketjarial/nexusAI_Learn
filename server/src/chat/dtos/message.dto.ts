import { IsISO8601, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';

export class MessageDto {
  @IsUUID()
  id: string;

  @IsUUID()
  conversationId: string;

  @IsString()
  sender: 'user' | 'system' | 'assistant';

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsObject()
  meta?: Record<string, any>;

  @IsOptional()
  @IsISO8601()
  createdAt?: string;
}