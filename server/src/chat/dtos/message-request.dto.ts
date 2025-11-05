import { IsBoolean, IsNotEmpty, IsObject, IsOptional, IsString, IsUUID } from "class-validator";

export class MessageRequestDto {

  @IsUUID()
  conversationId: string;
  
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @IsBoolean()
  stream?: boolean;

  @IsOptional()
  @IsObject()
  options?: Record<string, any>;
}