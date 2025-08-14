# AI Video Generator

A modern web application that transforms text prompts into stunning videos using Bytez AI's text-to-video technology. Built with Next.js 15, React 19, and Tailwind CSS.

![AI Video Generator](https://img.shields.io/badge/AI-Video%20Generator-purple?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15.4.6-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)

## ✨ Features

### 🎬 Text-to-Video Generation
- **Direct conversion**: Transform any text description into a video
- **AI-powered**: Uses Bytez AI's `ali-vilab/text-to-video-ms-1.7b` model
- **High quality**: Generates professional-looking videos from simple prompts

### 🎨 Modern UI/UX
- **Beautiful interface**: Clean, modern design with gradient backgrounds
- **Responsive design**: Works perfectly on desktop, tablet, and mobile
- **Dark mode support**: Automatically adapts to system theme preferences
- **Loading states**: Visual feedback with animated spinners during generation
- **Error handling**: Clear, user-friendly error messages

### 🎥 Video Playback
- **Built-in player**: HTML5 video player with full controls
- **Playback features**: Play/pause, volume control, progress bar, fullscreen
- **Mobile optimized**: Plays inline on mobile devices
- **Auto-loop**: Videos automatically loop for continuous viewing

### 🔧 Technical Features
- **Fast performance**: Built with Next.js 15 and React 19
- **Type safety**: Full TypeScript implementation
- **API integration**: RESTful API with proper error handling
- **Environment variables**: Secure API key management
- **Modern styling**: Tailwind CSS for responsive design

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- A Bytez API key ([Get one here](https://bytez.com))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Amanbig/video-ai
   cd video-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   BYTEZ_KEY=your_bytez_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 Environment Setup

### Getting Your Bytez API Key

1. Visit [Bytez.com](https://bytez.com)
2. Sign up for an account
3. Navigate to your API dashboard
4. Generate a new API key
5. Copy the key to your `.env.local` file

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `BYTEZ_KEY` | Your Bytez API key for video generation | ✅ Yes |

## 📖 Usage

### Basic Video Generation

1. **Enter your prompt**: Describe the video you want to create
   ```
   Example: "A majestic dragon soaring through cloudy skies"
   ```

2. **Click Generate**: Press the "Generate Video" button

3. **Wait for processing**: The AI will process your request (usually 30-60 seconds)

4. **Watch your video**: The generated video will appear with playback controls

### Example Prompts

Here are some example prompts to get you started:

- `"A cat playing with a rose in a beautiful garden"`
- `"Ocean waves crashing against rocky cliffs at sunset"`
- `"A futuristic city with flying cars and neon lights"`
- `"A peaceful forest with sunlight filtering through trees"`
- `"A chef preparing a delicious meal in a modern kitchen"`

## 🏗️ Project Structure

```
video-ai/
├── src/
│   └── app/
│       ├── api/
│       │   └── generate/
│       │       └── route.ts          # API endpoint for video generation
│       ├── globals.css               # Global styles
│       ├── layout.tsx                # Root layout component
│       └── page.tsx                  # Main application page
├── .env.local                        # Environment variables (create this)
├── .gitignore                        # Git ignore rules
├── package.json                      # Dependencies and scripts
├── tailwind.config.ts                # Tailwind CSS configuration
└── README.md                         # This file
```

## 🛠️ API Reference

### POST `/api/generate`

Generate a video from a text prompt.

**Request Body:**
```json
{
  "prompt": "A cat playing with a rose"
}
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "prompt": "A cat playing with a rose",
    "videoUrl": "https://...",
    "generatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Response (Error):**
```json
{
  "error": "Video generation failed",
  "details": "Error details here"
}
```

### GET `/api/generate`

Get API documentation and usage examples.

## 🎯 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Tech Stack

- **Framework**: Next.js 15 with App Router
- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **AI Service**: Bytez AI (ali-vilab/text-to-video-ms-1.7b)
- **Deployment**: Vercel (recommended)

## 🚀 Deployment

### Deploy on Vercel (Recommended)

1. **Push to GitHub**: Commit your code to a GitHub repository

2. **Connect to Vercel**: 
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository

3. **Set environment variables**:
   - Add `BYTEZ_KEY` in Vercel's environment variables section

4. **Deploy**: Vercel will automatically build and deploy your app

### Deploy on Other Platforms

The app can be deployed on any platform that supports Node.js:
- Netlify
- Railway
- Heroku
- DigitalOcean App Platform

## 🔧 Troubleshooting

### Common Issues

**Video not playing:**
- Check if the video URL is valid
- Ensure your browser supports HTML5 video
- Try refreshing the page

**API errors:**
- Verify your `BYTEZ_KEY` is correct
- Check your internet connection
- Ensure you have sufficient API credits

**Build errors:**
- Run `npm install` to ensure all dependencies are installed
- Check that Node.js version is 18+
- Verify TypeScript configuration

### Getting Help

If you encounter issues:
1. Check the browser console for error messages
2. Verify your environment variables are set correctly
3. Ensure your Bytez API key is valid and has sufficient credits

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- [Bytez AI](https://bytez.com) for providing the text-to-video API
- [Next.js](https://nextjs.org) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework
- [Vercel](https://vercel.com) for seamless deployment

---

**Made with ❤️ using Next.js and Bytez AI**