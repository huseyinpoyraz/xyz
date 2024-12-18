import { useState, useEffect, useCallback } from 'react';

interface UseVideoPlayerProps {
  url: string;
  title: string;
  onPlay?: () => void;
}

export const useVideoPlayer = ({ url, title, onPlay }: UseVideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
    onPlay?.();
  }, [onPlay]);

  return {
    isPlaying,
    handlePlay
  };
};