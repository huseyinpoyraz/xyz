import React from 'react';
import { getYouTubeEmbedUrl } from '../../utils/youtube/embed';

interface VideoEmbedProps {
  url: string;
  title: string;
}

export const VideoEmbed: React.FC<VideoEmbedProps> = ({ url, title }) => {
  const embedUrl = getYouTubeEmbedUrl(url);
  
  if (!embedUrl) {
    return (
      <div className="relative aspect-video bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Invalid video URL</p>
      </div>
    );
  }

  return (
    <div className="relative aspect-video bg-black">
      <iframe
        width="100%"
        height="100%"
        src={embedUrl}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>
  );
};