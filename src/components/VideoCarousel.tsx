import React from 'react';
import { ChevronLeft, ChevronRight, Plus, Trash2 } from 'lucide-react';
import { Video } from '../types';
import { VideoCard } from './VideoCard';
import { EditableField } from './EditableField';

interface VideoCarouselProps {
  heading: string;
  videos: Video[];
  isEditing?: boolean;
  onUpdateHeading?: (heading: string) => void;
  onUpdateVideo?: (videoId: string, data: Partial<Video>) => void;
  onAddVideo?: () => void;
  onDeleteVideo?: (videoId: string) => void;
  onDeleteSection?: () => void;
}

export const VideoCarousel: React.FC<VideoCarouselProps> = ({
  heading,
  videos,
  isEditing,
  onUpdateHeading,
  onUpdateVideo,
  onAddVideo,
  onDeleteVideo,
  onDeleteSection,
}) => {
  const scrollContainer = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainer.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollContainer.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        {isEditing ? (
          <div className="flex items-center gap-4 w-full">
            <EditableField
              value={heading}
              onSave={onUpdateHeading!}
              className="text-2xl font-bold"
              placeholder="Section heading"
            />
            {onDeleteSection && (
              <button
                onClick={onDeleteSection}
                className="p-2 text-red-500 hover:text-red-600"
                title="Delete section"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>
        ) : (
          <h2 className="text-2xl font-bold">{heading}</h2>
        )}
      </div>
      
      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-md"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <div
          ref={scrollContainer}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {videos.map((video) => (
            <div key={video.id} className="flex-none w-72">
              <VideoCard
                video={video}
                isEditing={isEditing}
                onUpdate={isEditing ? (data) => onUpdateVideo?.(video.id, data) : undefined}
                onDelete={isEditing && onDeleteVideo ? () => onDeleteVideo(video.id) : undefined}
              />
            </div>
          ))}
          {isEditing && onAddVideo && (
            <button
              onClick={onAddVideo}
              className="flex-none w-72 h-full border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center gap-2 text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors"
            >
              <Plus className="w-6 h-6" />
              Add Video
            </button>
          )}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-md"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};