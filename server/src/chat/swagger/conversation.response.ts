import { ApiProperty } from '@nestjs/swagger';

export class ConversationResponse {
  @ApiProperty({
    description: 'The unique identifier of the conversation',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  id: string;

  @ApiProperty({
    description: 'The user who owns this conversation',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  userId: string;

  @ApiProperty({
    description: 'The title of the conversation',
    example: 'Discussion about Neural Networks',
    required: false
  })
  title?: string;

  @ApiProperty({
    description: 'When the conversation was created',
    example: '2025-11-05T12:00:00Z'
  })
  createdAt: Date;
}