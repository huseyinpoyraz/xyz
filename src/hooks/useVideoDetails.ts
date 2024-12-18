import { useState, useEffect } from 'react';
import { VideoDetails } from '../types/transcript';
import { fetchVideoDetails } from '../services/youtube';

export const useVideoDetails = (videoId: string | undefined) => {
  const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadVideoDetails = async () => {
      if (!videoId) {
        setError('No video ID provided');
        setLoading(false);
        return;
      }

      try {
        const details = await fetchVideoDetails(videoId);
        setVideoDetails(details);
        setError(null);
      } catch (err) {
        setError('Failed to load video details');
        setVideoDetails(null);
      } finally {
        setLoading(false);
      }
    };

    loadVideoDetails();
  }, [videoId]);

  return { videoDetails, loading, error };
};