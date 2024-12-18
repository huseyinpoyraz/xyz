import React from 'react';
import { Play } from 'lucide-react';
import { VideoEmbed } from './VideoEmbed';
import { VideoThumbnail } from './VideoThumbnail';
import { useVideoPlayer } from './hooks/useVideoPlayer';
import { extractYouTubeId } from '../../utils/youtube/validation';

interface VideoPlayerProps {
  url: string;
  title: string;
  onPlay?: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, title, onPlay }) => {
  const { isPlaying, handlePlay } = useVideoPlayer({ url, title, onPlay });
  const videoId = extractYouTubeId(url);

  if (!videoId) {
    return (
      <div className="relative aspect-video bg-gray-100 flex flex-col items-center justify-center">
        <Play className="w-12 h-12 text-gray-400" />
        <p className="text-gray-500 mt-2">Invalid video URL</p>
      </div>
    );
  }

  if (isPlaying) {
    return <VideoEmbed url={url} title={title} />;
  }

  return <VideoThumbnail videoId={videoId} title={title} onClick={handlePlay} />;
};