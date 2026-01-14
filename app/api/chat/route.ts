import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;

    // Check if API key is configured
    if (!apiKey) {
      console.error('OpenAI API key not configured');
      return NextResponse.json(
        { error: 'API configuration error', message: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { messages, model = 'gpt-4o-mini', max_tokens = 500, temperature = 0.7 } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid request', message: 'Messages array is required' },
        { status: 400 }
      );
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens,
        temperature
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenAI API error:', response.status, errorData);

      // Return specific error types for client handling
      if (response.status === 401) {
        return NextResponse.json(
          { error: 'Authentication failed', message: 'Invalid API key' },
          { status: 401 }
        );
      }

      if (response.status === 429) {
        return NextResponse.json(
          { error: 'Rate limited', message: 'Too many requests. Please try again later.' },
          { status: 429 }
        );
      }

      return NextResponse.json(
        { error: 'OpenAI API error', message: errorData.error?.message || 'Unknown error' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Server error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Only allow POST requests
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed', message: 'Use POST to send chat messages' },
    { status: 405 }
  );
}
