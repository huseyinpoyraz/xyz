import React from 'react';
import { Play } from 'lucide-react';
import { getYouTubeThumbnail } from '../../utils/youtube';

interface VideoThumbnailProps {
  videoId: string;
  title: string;
  onClick: () => void;
}

export const VideoThumbnail: React.FC<VideoThumbnailProps> = ({ videoId, title, onClick }) => {
  return (
    <div 
      className="relative aspect-video bg-gray-100 cursor-pointer group overflow-hidden rounded-lg"
      onClick={onClick}
    >
      <img
        src={getYouTubeThumbnail(videoId, 'maxres')}
        alt={title}
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        onError={(e) => {
          (e.target as HTMLImageElement).src = getYouTubeThumbnail(videoId, 'mq');
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