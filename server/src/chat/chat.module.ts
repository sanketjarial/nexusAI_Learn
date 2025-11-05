import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatController } from './chat.controller';
import { Conversation } from './entities/conversation.entity';
import { Message } from './entities/message.entity';
import { ChatService } from './chat.service';

/**
 * Module for chat functionality.
 * @class
 * @description Provides the chat feature set including conversation management,
 * message handling, and integration with AI services. This module encapsulates
 * all chat-related functionality and dependencies.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Conversation, Message])],
  controllers: [ChatController],
  providers: [ChatService],
  exports: [TypeOrmModule, ChatService]
})
export class ChatModule {}
