import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from './entities/conversation.entity';
import { Message } from './entities/message.entity';
import { MessageRequestDto } from './dtos/message-request.dto';
import { ConversationDto } from './dtos/conversation.dto';
import { MessageDto } from './dtos/message.dto';
import { generateLLMResponse } from '../utils/llm';
import { systemPrompts } from './prompts/system-prompts';
import { ChatCompletionMessageParam } from 'openai/resources/chat';

/**
 * Service for managing chat operations.
 * Contains business logic for conversations and messages.
 */
@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(Conversation) private conversationRepo: Repository<Conversation>,
        @InjectRepository(Message) private messageRepo: Repository<Message>,
    ) {}

    /**
     * Creates a new conversation.
     * @param userId - The ID of the user initiating the conversation.
     * @param title - An optional title for the conversation.
     * @returns The created conversation.
     */
    createConversation(userId: string, title?: string) {
        const conversation = this.conversationRepo.create({ userId, title });
        return this.conversationRepo.save(conversation);
    }

    /**
     * Sends a message in a conversation.
     * @param messageDto - The message data transfer object containing message details.
     * @returns A promise that resolves to the created message
     * @throws NotFoundException if the conversation doesn't exist
     */
    async sendMessage(messageDto: MessageRequestDto): Promise<Message> {
        await this.getConversationById(messageDto.conversationId);

        const userMessage = this.messageRepo.create({
            conversationId: messageDto.conversationId,
            content: messageDto.content,
            sender: 'user',
            meta: messageDto.options
        });
        await this.messageRepo.save(userMessage);

        const chatHistory = await this.getConversationMessages(messageDto.conversationId);
        const messages: ChatCompletionMessageParam[] = chatHistory.messages
            .filter((m) => typeof m.content === "string")
            .map((m) => ({
                role: m.sender === "user" ? "user" : "assistant",
                content: m.content as string
            }));
        messages.unshift(systemPrompts.tutor);  

        const aiResponse = await generateLLMResponse(messages, {
            provider: 'ollama',
            model: messageDto.model || 'llama3:8b',
            temperature: 0.7
        });

        const assistantMessage = this.messageRepo.create({
            conversationId: messageDto.conversationId,
            content: aiResponse,
            sender: 'assistant',
            meta: messageDto.options
        });
        await this.messageRepo.save(assistantMessage);
        return assistantMessage;
    }

    /**
     * Retrieves all conversations for a user.
     * @param userId - The ID of the user whose conversations are to be retrieved.
     * @returns An array of conversations for the user.
     */
    getConversations(userId: string) {
        return this.conversationRepo.find({ where: { userId } });
    }

    /**
     * Retrieves a specific conversation by its ID.
     * @param conversationId - The ID of the conversation to retrieve.
     * @returns The conversation details without messages
     * @throws NotFoundException if the conversation doesn't exist
     */
    async getConversationById(conversationId: string): Promise<ConversationDto> {
        const conversation = await this.conversationRepo.findOne({
            where: { id: conversationId },
            relations: {
                user: true
            }
        });

        if (! conversation) {
            throw new NotFoundException(`Conversation ${conversationId} not found`);
        }
        return {
            id: conversation.id,
            userId: conversation.userId,
            title: conversation.title,
            createdAt: conversation.createdAt.toISOString()
        };
    }

    /**
     * Retrieves messages for a specific conversation with pagination.
     * @param conversationId - The ID of the conversation
     * @param page - The page number (1-based)
     * @param limit - The number of messages per page
     * @returns Paginated messages for the conversation
     */
    async getConversationMessages(
        conversationId: string,
        page: number = 1,
        limit: number = 50
    ) {
        // Ensure conversation exists
        await this.getConversationById(conversationId);

        const [messages, total] = await this.messageRepo.findAndCount({
            where: { conversationId },
            order: { createdAt: 'ASC' },
            skip: (page - 1) * limit,
            take: limit
        });

        return {
            messages: messages.map(message => ({
                id: message.id,
                conversationId: message.conversationId,
                sender: message.sender,
                content: message.content,
                meta: message.meta,
                createdAt: message.createdAt.toISOString()
            })),
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        };
    }
}
