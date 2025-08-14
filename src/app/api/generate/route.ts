import RunwayML, { TaskFailedError } from '@runwayml/sdk';
import { NextRequest, NextResponse } from 'next/server';

const client = new RunwayML();

interface RequestBody {
  prompt: string;
  imageRatio?: '1360:768' | '1024:1024' | '1280:720' | '720:1280' | '1920:1080' | '1080:1920' | '1080:1080' | '1168:880' | '1440:1080' | '1080:1440' | '1808:768' | '2112:912' | '720:720' | '960:720' | '720:960' | '1680:720';
  videoRatio?: '1280:720' | '720:1280' | '1104:832' | '832:1104' | '960:960' | '1584:672' | '1280:768' | '768:1280';
  videoPrompt?: string; // Optional different prompt for video generation
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

    const imageRatio = body.imageRatio || '1360:768';
    const videoRatio = body.videoRatio || '1280:720';
    const videoPrompt = body.videoPrompt || body.prompt;

    console.log('Starting text-to-image generation with prompt:', body.prompt);

    // Task 1: Generate image from text
    const imageTask = await client.textToImage
      .create({
        model: 'gen4_image',
        promptText: body.prompt,
        ratio: imageRatio,
      })
      .waitForTaskOutput();

    console.log('Image generation completed:', imageTask);

    // Check if image generation was successful
    if (!imageTask.output || !imageTask.output.length) {
      return NextResponse.json(
        { error: 'Image generation failed - no output received' },
        { status: 500 }
      );
    }

    const generatedImageUrl = imageTask.output[0];
    console.log('Generated image URL:', generatedImageUrl);
    console.log('Starting image-to-video generation...');

    // Task 2: Generate video from the created image
    const videoTask = await client.imageToVideo
      .create({
        model: 'gen4_turbo',
        promptImage: generatedImageUrl,
        promptText: videoPrompt,
        ratio: videoRatio,
      })
      .waitForTaskOutput();

    console.log('Video generation completed:', videoTask);

    // Check if video generation was successful
    if (!videoTask.output || !videoTask.output.length) {
      return NextResponse.json(
        { 
          error: 'Video generation failed - no output received',
          imageUrl: generatedImageUrl // Return the image URL in case it's useful
        },
        { status: 500 }
      );
    }

    // Return both outputs
    return NextResponse.json({
      success: true,
      data: {
        originalPrompt: body.prompt,
        videoPrompt: videoPrompt,
        imageUrl: generatedImageUrl,
        videoUrl: videoTask.output[0],
        imageTask: {
          id: imageTask.id,
          status: imageTask.status,
          ratio: imageRatio
        },
        videoTask: {
          id: videoTask.id,
          status: videoTask.status,
          ratio: videoRatio
        }
      }
    });

  } catch (error) {
    console.error('Error in text-to-image-to-video pipeline:', error);

    // Handle specific RunwayML errors
    if (error instanceof TaskFailedError) {
      return NextResponse.json(
        { 
          error: 'Task failed',
          details: error.message,
        //   taskId: error.task?.id 
        },
        { status: 500 }
      );
    }

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
    message: 'RunwayML Text-to-Image-to-Video API',
    usage: {
      method: 'POST',
      contentType: 'application/json',
      body: {
        prompt: 'string (required) - Text prompt for image and video generation',
        imageRatio: 'string (optional) - Image aspect ratio: 1360:768 | 1024:1024 | 1280:720 | 720:1280 | 1920:1080 | 1080:1920 | 1080:1080 | 1168:880 | 1440:1080 | 1080:1440 | 1808:768 | 2112:912 | 720:720 | 960:720 | 720:960 | 1680:720',
        videoRatio: 'string (optional) - Video aspect ratio: 1280:720 | 720:1280 | 1104:832 | 832:1104 | 960:960 | 1584:672 | 1280:768 | 768:1280',
        videoPrompt: 'string (optional) - Different prompt for video generation, defaults to main prompt'
      }
    },
    example: {
      prompt: 'A majestic dragon soaring through cloudy skies',
      imageRatio: '1920:1080',
      videoRatio: '1280:720',
      videoPrompt: 'The dragon slowly flaps its wings and breathes fire'
    }
  });
}