import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateConversationDto {
  @IsUUID()
  userId: string;
  
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;
}