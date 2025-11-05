import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/chat';

export type { ChatCompletionMessageParam as Message };

export type LLMProvider = 'ollama' | 'openai';

export type LLMConfig = {
  provider?: LLMProvider;
  model?: string;
  temperature?: number;
  maxTokens?: number;
  apiKey?: string;
  baseURL?: string;
};

const defaultConfig: LLMConfig = {
  provider: 'ollama',
  model: 'llama3:8b',
  temperature: 0.7,
  maxTokens: 2000,
  baseURL: 'http://localhost:11434/v1'
};

/**
 * Creates an OpenAI compatible client for either Ollama or OpenAI
 */
function createClient(config: LLMConfig) {
  return new OpenAI({
    apiKey: config.apiKey || 'ollama', // dummy key for Ollama
    baseURL: config.baseURL,
    dangerouslyAllowBrowser: true
  });
}

/**
 * Generates a response using either Ollama or OpenAI
 * @param messages - Array of conversation messages
 * @param config - Configuration for the LLM
 * @returns The generated response text
 */
export async function generateLLMResponse(
  messages: ChatCompletionMessageParam[],
  config: LLMConfig = {}
): Promise<string> {
  const mergedConfig = { ...defaultConfig, ...config };
  const openai = createClient(mergedConfig);

  try {
    const completion = await openai.chat.completions.create({
      model: mergedConfig.model || 'llama3:8b',
      messages: messages as Array<ChatCompletionMessageParam>,
      temperature: mergedConfig.temperature,
      max_tokens: mergedConfig.maxTokens,
    });

    return completion.choices[0].message.content || '';
  } catch (error) {
    console.error('Error calling LLM:', error);
    throw new Error('Failed to generate AI response');
  }
}