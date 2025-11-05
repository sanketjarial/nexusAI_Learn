import { ApiProperty } from '@nestjs/swagger';

export class MessageResponse {
  @ApiProperty({
    description: 'The unique identifier of the message',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  id: string;

  @ApiProperty({
    description: 'The ID of the conversation this message belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  conversationId: string;

  @ApiProperty({
    description: 'Who sent the message',
    example: 'user',
    enum: ['user', 'system', 'assistant']
  })
  sender: 'user' | 'system' | 'assistant';

  @ApiProperty({
    description: 'The content of the message',
    example: 'Can you explain how neural networks work?'
  })
  content: string;

  @ApiProperty({
    description: 'Additional metadata about the message',
    example: { tokens: 150, model: 'gpt-4' },
    required: false
  })
  meta?: Record<string, any>;

  @ApiProperty({
    description: 'When the message was created',
    example: '2025-11-05T12:00:00Z'
  })
  createdAt: Date;
}