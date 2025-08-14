import { NextRequest, NextResponse } from 'next/server';
import Bytez from 'bytez.js';

interface RequestBody {
  prompt: string;
}

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body: RequestBody = await request.json();

    if (!body.prompt || typeof body.prompt !== 'string') {
      return NextResponse.json(
        { error: 'Invalid or missing prompt' },
        { status: 400 }
      );
    }

    console.log('Starting text-to-video generation with prompt:', body.prompt);

    // Initialize Bytez SDK
    const sdk = new Bytez(process.env.BYTEZ_KEY!);
    const model = sdk.model("ali-vilab/text-to-video-ms-1.7b");

    // Generate video from text
    const { error, output } = await model.run(body.prompt);

    if (error) {
      console.error('Bytez API error:', error);
      return NextResponse.json(
        {
          error: 'Video generation failed',
          details: error
        },
        { status: 500 }
      );
    }

    if (!output) {
      return NextResponse.json(
        { error: 'Video generation failed - no output received' },
        { status: 500 }
      );
    }

    console.log('Video generation completed successfully');

    // Return the generated video
    return NextResponse.json({
      success: true,
      data: {
        prompt: body.prompt,
        videoUrl: output,
        generatedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error in text-to-video generation:', error);

    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Optional: Add a GET handler for API documentation
export async function GET() {
  return NextResponse.json({
    message: 'Bytez Text-to-Video API',
    usage: {
      method: 'POST',
      contentType: 'application/json',
      body: {
        prompt: 'string (required) - Text prompt for video generation'
      }
    },
    example: {
      prompt: 'A cat playing with a rose in a beautiful garden'
    }
  });
}