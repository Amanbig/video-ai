'use client';

import { useState } from 'react';

interface GenerationResult {
  success: boolean;
  data?: {
    prompt: string;
    videoUrl: string;
    generatedAt: string;
  };
  error?: string;
  details?: string;
}

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);

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
              Transform your ideas into stunning videos using Bytez AI
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

                  {/* Generated Video */}
                  <div className="max-w-2xl mx-auto">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 text-center">
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
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
                      Generated on: {new Date(result.data.generatedAt).toLocaleString()}
                    </p>
                  </div>

                  {/* Prompt Used */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                      Prompt Used:
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      &ldquo;{result.data.prompt}&rdquo;
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