import { RAKSHA_CORE_PROMPT, GREETING_MESSAGE } from './prompts/core-prompt';
import { CASE_STUDIES_PROMPT } from './prompts/case-studies';
import { injectContext, buildContextPrompt } from './prompts/context-injector';

export interface ChatMessage {
  id: string;
  type: 'text' | 'card-with-question' | 'greeting';
  content?: string;
  card?: {
    id: string;
    image: string;
    title: string;
  };
  sender: 'user' | 'system';
  timestamp: number;
}

export interface AIResponse {
  message: string;
  success: boolean;
  error?: string;
  errorType?: 'config' | 'auth' | 'rate_limit' | 'network' | 'unknown';
}

const FALLBACK_RESPONSES = [
  "sorry, i'm having trouble connecting right now. try again in a sec",
  "hmm something's not working on my end. give it another shot?",
  "looks like there's a connection issue. try again in a moment"
];

function getRandomFallback(): string {
  const index = Math.floor(Math.random() * FALLBACK_RESPONSES.length);
  return FALLBACK_RESPONSES[index] ?? FALLBACK_RESPONSES[0] ?? "sorry, having trouble connecting";
}

export function buildSystemPrompt(userMessage: string): { prompt: string; maxTokens: number } {
  const contextResult = injectContext(userMessage);
  const contextPrompt = buildContextPrompt(contextResult);

  const fullPrompt = `${RAKSHA_CORE_PROMPT}

${CASE_STUDIES_PROMPT}

${contextPrompt}`;

  return {
    prompt: fullPrompt,
    maxTokens: contextResult.suggestedMaxTokens
  };
}

export async function sendToAI(
  messages: ChatMessage[],
  currentMessage: string
): Promise<AIResponse> {
  try {
    const { prompt: systemPrompt, maxTokens } = buildSystemPrompt(currentMessage);

    // Convert chat history to OpenAI format
    const conversationHistory = messages
      .filter(m => m.content && (m.type === 'text' || m.type === 'greeting'))
      .slice(-10) // Keep last 10 messages for context
      .map(m => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.content
      }));

    // Add current message
    conversationHistory.push({
      role: 'user',
      content: currentMessage
    });

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: systemPrompt },
          ...conversationHistory
        ],
        model: 'gpt-4o-mini',
        max_tokens: maxTokens,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      // Categorize the error
      let errorType: AIResponse['errorType'] = 'unknown';
      let errorMessage = getRandomFallback();

      if (response.status === 401) {
        errorType = 'auth';
        errorMessage = "api key seems invalid. check the configuration";
      } else if (response.status === 429) {
        errorType = 'rate_limit';
        errorMessage = "too many requests right now. try again in a bit";
      } else if (response.status === 500 && errorData.error?.includes('not configured')) {
        errorType = 'config';
        errorMessage = "api not configured yet. let me know if you need help setting it up";
      }

      console.error('AI Chat Error:', response.status, errorData);

      return {
        message: errorMessage,
        success: false,
        error: errorData.error || 'Unknown error',
        errorType
      };
    }

    const data = await response.json();
    const aiMessage = data.choices?.[0]?.message?.content || getRandomFallback();

    return {
      message: aiMessage,
      success: true
    };
  } catch (error) {
    console.error('AI Chat network error:', error);
    return {
      message: getRandomFallback(),
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
      errorType: 'network'
    };
  }
}

export { GREETING_MESSAGE };
