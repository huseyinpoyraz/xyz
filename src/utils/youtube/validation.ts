import { YOUTUBE_URL_PATTERNS } from './patterns';

export interface YouTubeValidationResult {
  isValid: boolean;
  videoId: string | null;
}

export const extractYouTubeId = (url: string): string | null => {
  if (!url) return null;
  const cleanUrl = url.trim();
  
  // Extract video ID from embed URL
  const embedMatch = cleanUrl.match(/^(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^/?]{11})/);
  if (embedMatch?.[1]) {
    return embedMatch[1];
  }

  // Check against other patterns
  for (const pattern of YOUTUBE_URL_PATTERNS) {
    const match = cleanUrl.match(pattern);
    if (match?.[1]) {
      return match[1];
    }
  }

  return null;
};

export const validateYouTubeUrl = (url: string): YouTubeValidationResult => {
  const videoId = extractYouTubeId(url);
  return {
    isValid: videoId !== null,
    videoId
  };
};