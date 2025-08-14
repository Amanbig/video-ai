'use client';

import { useState } from 'react';

interface GenerationResult {
  success: boolean;
  data?: {
    originalPrompt: string;
    videoPrompt: string;
    imageUrl: string;
    videoUrl: string;
    imageTask: {
      id: string;
      status: string;
      ratio: string;
    };
    videoTask: {
      id: string;
      status: string;
      ratio: string;
    };
  };
  error?: string;
  details?: string;
}

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [videoPrompt, setVideoPrompt] = useState('');
  const [imageRatio, setImageRatio] = useState('1360:768');
  const [videoRatio, setVideoRatio] = useState('1280:720');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const imageRatios = [
    '1360:768', '1024:1024', '1280:720', '720:1280', '1920:1080',
    '1080:1920', '1080:1080', '1168:880', '1440:1080', '1080:1440',
    '1808:768', '2112:912', '720:720', '960:720', '720:960', '1680:720'
  ];

  const videoRatios = [
    '1280:720', '720:1280', '1104:832', '832:1104',
    '960:960', '1584:672', '1280:768', '768:1280'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          imageRatio,
          videoRatio,
          videoPrompt: videoPrompt.trim() || undefined,
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        error: 'Network error occurred',
        details: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              AI Video Generator
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Transform your ideas into stunning videos using RunwayML
            </p>
          </div>

          {/* Main Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Prompt Input */}
              <div>
                <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Describe your video
                </label>
                <textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="A majestic dragon soaring through cloudy skies..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                  rows={3}
                  required
                />
              </div>

              {/* Advanced Options Toggle */}
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 text-sm font-medium"
              >
                {showAdvanced ? '▼' : '▶'} Advanced Options
              </button>

              {/* Advanced Options */}
              {showAdvanced && (
                <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <label htmlFor="videoPrompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Video-specific prompt (optional)
                    </label>
                    <textarea
                      id="videoPrompt"
                      value={videoPrompt}
                      onChange={(e) => setVideoPrompt(e.target.value)}
                      placeholder="The dragon slowly flaps its wings and breathes fire..."
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-600 dark:text-white resize-none"
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="imageRatio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Image Ratio
                      </label>
                      <select
                        id="imageRatio"
                        value={imageRatio}
                        onChange={(e) => setImageRatio(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-600 dark:text-white"
                      >
                        {imageRatios.map((ratio) => (
                          <option key={ratio} value={ratio}>
                            {ratio}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="videoRatio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Video Ratio
                      </label>
                      <select
                        id="videoRatio"
                        value={videoRatio}
                        onChange={(e) => setVideoRatio(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-600 dark:text-white"
                      >
                        {videoRatios.map((ratio) => (
                          <option key={ratio} value={ratio}>
                            {ratio}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !prompt.trim()}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Generating Video...
                  </div>
                ) : (
                  'Generate Video'
                )}
              </button>
            </form>
          </div>

          {/* Results */}
          {result && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              {result.success && result.data ? (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Generation Complete!
                  </h2>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Generated Image */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                        Generated Image
                      </h3>
                      <div className="relative bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                        <img
                          src={result.data.imageUrl}
                          alt="Generated image"
                          className="w-full h-auto"
                        />
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        Ratio: {result.data.imageTask.ratio}
                      </p>
                    </div>

                    {/* Generated Video */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                        Generated Video
                      </h3>
                      <div className="relative bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                        <video
                          src={result.data.videoUrl}
                          controls
                          className="w-full h-auto"
                          preload="metadata"
                          playsInline
                          muted
                          loop
                        >
                          Your browser does not support the video tag.
                        </video>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        Ratio: {result.data.videoTask.ratio}
                      </p>
                    </div>
                  </div>

                  {/* Prompts Used */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                      Prompts Used:
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      <strong>Image:</strong> {result.data.originalPrompt}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Video:</strong> {result.data.videoPrompt}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-red-500 text-6xl mb-4">⚠️</div>
                  <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
                    Generation Failed
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {result.error || 'An unknown error occurred'}
                  </p>
                  {result.details && (
                    <p className="text-sm text-gray-500 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 p-3 rounded">
                      {result.details}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}