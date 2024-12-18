import React from 'react';
import { Video } from '../types';
import { VideoPlayer } from './video/VideoPlayer';
import { VideoMetadata } from './video/VideoMetadata';
import { useData } from '../context/DataContext';

interface VideoCardProps {
  video: Video;
  categoryId: string;
  sectionId: string;
  isEditing?: boolean;
  onUpdate?: (data: Partial<Video>) => void;
  onDelete?: () => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  video,
  categoryId,
  sectionId,
  isEditing,
  onUpdate,
  onDelete
}) => {
  const { incrementViewCount } = useData();

  const handleVideoPlay = () => {
    incrementViewCount(categoryId, sectionId, video.id);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <VideoPlayer
        url={video.url}
        title={video.title}
        onPlay={handleVideoPlay}
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{video.title}</h3>
        <div className="flex flex-col gap-2">
          <VideoMetadata videoId={video.id} viewCount={video.viewCount || 0} />
          <p className="text-gray-600 text-sm">{video.description}</p>
        </div>
      </div>
    </div>
  );
};