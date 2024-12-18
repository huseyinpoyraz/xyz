import React from 'react';
import { VideoContent as VideoContentType } from '../../types/content';
import { VideoEmbed } from '../video/VideoEmbed';

interface VideoContentProps {
  content: VideoContentType;
}

export const VideoContent: React.FC<VideoContentProps> = ({ content }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <VideoEmbed url={content.url} title={content.title} />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{content.title}</h3>
        <p className="text-gray-600 text-sm">{content.description}</p>
      </div>
    </div>
  );
};