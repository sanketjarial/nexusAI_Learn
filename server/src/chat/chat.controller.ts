import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateConversationDto } from './dtos/create-conversation.dto';
import { MessageRequestDto } from './dtos/message-request.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ConversationResponse } from './swagger/conversation.response';
import { MessageResponse } from './swagger/message.response';

/**
 * Controller handling chat-related HTTP requests.
 * @class
 * @description Provides endpoints for managing chat conversations and messages.
 * This controller handles conversation creation and message sending operations.
 */
@ApiTags('Chat')
@ApiBearerAuth()
@Controller('chat')
export class ChatController {
  constructor(
    private chatService: ChatService
  ) {}

  /**
   * find all conversations for a user.
   * @description Retrieves all conversations associated with a specific user. 
   */
  @ApiOperation({summary: 'Retrieves all conversations for a specific user'})
  @ApiResponse({status: 200, description: 'List of conversations retrieved successfully'})
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get('conversations')
  getConversations() {
    return this.chatService.getConversations('603a01b2-76dd-4cff-b197-421e70a8147e');
  }
  
  /**
   * Creates a new conversation.
   * @param {CreateConversationDto} body - The conversation creation data
   * @returns {Promise<Conversation>} The newly created conversation
   * @description Creates a new conversation for a user with an optional title.
   * This endpoint initializes a new chat conversation that can then be used
   * for message exchange.
   */
  @ApiOperation({summary: 'Creates a new chat conversation for the user with an optional title'})
  @ApiResponse({status: 201, description: 'The conversation has been successfully created', type: ConversationResponse})
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post('conversations/create')
  async createConversation(@Body() body: CreateConversationDto) {
    const conversation = await this.chatService.createConversation(body.userId, body.title);
    return conversation;
  }

  /**
   * Sends a message in a conversation.
   * @param {SendMessageDto} body - The message data
   * @returns {Promise<Message>} The sent message
   * @description Handles sending a new message in a conversation. This can be
   * a user message that will receive an AI response, or other types of
   * messages in the chat flow.
   */
  @ApiOperation({ summary: 'Sends a message in a conversation and processes it through the AI'})
  @ApiResponse({status: 201, description: 'The message has been successfully sent and processed', type: MessageResponse})
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Conversation not found' })
  @Post('message')
  sendMessage(@Body() body: MessageRequestDto) {
    const message = this.chatService.sendMessage(body);
    return message;
  }
}
