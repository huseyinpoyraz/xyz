import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { validateYouTubeUrl, getYouTubeThumbnail, getYouTubeEmbedUrl } from '../utils/youtube';

interface VideoPlayerProps {
  url: string;
  title: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { isValid, videoId } = validateYouTubeUrl(url);

  if (!isValid) {
    return (
      <div className="relative aspect-video bg-gray-100 flex flex-col items-center justify-center">
        <Play className="w-12 h-12 text-gray-400" />
        <p className="text-gray-500 mt-2">Invalid YouTube URL</p>
      </div>
    );
  }

  if (isPlaying && videoId) {
    return (
      <div className="relative aspect-video bg-black">
        <iframe
          src={`${getYouTubeEmbedUrl(videoId)}&autoplay=1`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>
    );
  }

  return (
    <div 
      className="relative aspect-video bg-gray-100 cursor-pointer group overflow-hidden rounded-lg"
      onClick={() => setIsPlaying(true)}
    >
      <img
        src={getYouTubeThumbnail(videoId!, 'maxres')}
        alt={title}
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        onError={(e) => {
          // Fallback to medium quality thumbnail if maxresdefault is not available
          (e.target as HTMLImageElement).src = getYouTubeThumbnail(videoId!, 'mq');
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
        <div className="w-16 h-16 flex items-center justify-center bg-red-600 rounded-full group-hover:scale-110 transition-transform duration-300">
          <Play className="w-8 h-8 text-white fill-current" fill="currentColor" />
        </div>
      </div>
    </div>
  );
};