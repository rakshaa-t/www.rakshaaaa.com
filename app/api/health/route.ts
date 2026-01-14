import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.OPENAI_API_KEY;

  // Check if key is configured
  if (!apiKey) {
    return NextResponse.json({
      status: 'error',
      keyConfigured: false,
      error: 'OPENAI_API_KEY environment variable is not set',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }

  // Check if key looks valid (starts with sk-)
  if (!apiKey.startsWith('sk-')) {
    return NextResponse.json({
      status: 'error',
      keyConfigured: true,
      keyValid: false,
      error: 'API key format appears invalid (should start with sk-)',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }

  // Optionally test the key with a minimal API call
  try {
    const response = await fetch('https://api.openai.com/v1/models', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      if (response.status === 401) {
        return NextResponse.json({
          status: 'error',
          keyConfigured: true,
          keyValid: false,
          error: 'API key is invalid or expired',
          timestamp: new Date().toISOString()
        }, { status: 401 });
      }

      return NextResponse.json({
        status: 'error',
        keyConfigured: true,
        error: `OpenAI API error: ${errorData.error?.message || response.statusText}`,
        timestamp: new Date().toISOString()
      }, { status: response.status });
    }

    return NextResponse.json({
      status: 'ok',
      keyConfigured: true,
      keyValid: true,
      message: 'OpenAI API is accessible and key is valid',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    return NextResponse.json({
      status: 'error',
      keyConfigured: true,
      error: `Network error: ${error instanceof Error ? error.message : 'Unknown'}`,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
