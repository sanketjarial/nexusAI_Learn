import { IsUUID, IsOptional, IsString, IsISO8601 } from "class-validator";

export class ConversationDto {
  @IsUUID()
  id: string;

  @IsUUID()
  userId: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsISO8601()
  createdAt: string;
}