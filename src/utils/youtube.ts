// Valid YouTube URL patterns with query parameters support
const YOUTUBE_URL_PATTERNS = [
  /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]{11})/, // Standard watch URLs
  /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^/?]{11})(?:\?[^#]*)?$/, // Embed URLs with query params
  /^(?:https?:\/\/)?youtu\.be\/([^/?]{11})/, // Short URLs
  /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([^/?]{11})/, // Legacy URLs
  /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([^/?]{11})/ // Shorts URLs
];

export const validateYouTubeUrl = (url: string): { isValid: boolean; videoId: string | null } => {
  if (!url) {
    return { isValid: false, videoId: null };
  }

  // Clean the URL
  const cleanUrl = url.trim();
  
  // Extract video ID from embed URL with query parameters
  const embedMatch = cleanUrl.match(/^(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^/?]{11})/);
  if (embedMatch && embedMatch[1]) {
    return { isValid: true, videoId: embedMatch[1] };
  }

  // Check against other patterns
  for (const pattern of YOUTUBE_URL_PATTERNS) {
    const match = cleanUrl.match(pattern);
    if (match && match[1]) {
      return { isValid: true, videoId: match[1] };
    }
  }

  return { isValid: false, videoId: null };
};

export const getYouTubeEmbedUrl = (videoId: string): string => {
  return `https://www.youtube.com/embed/${videoId}?si=${generateSiParam()}&rel=0`;
};

// Generate a random si parameter similar to YouTube's format
const generateSiParam = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';
  const length = 16;
  return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
};

export const getYouTubeThumbnail = (
  videoId: string,
  quality: 'default' | 'hq' | 'mq' | 'sd' | 'maxres' = 'maxres'
): string => {
  const qualityMap = {
    default: 'default',
    hq: 'hqdefault',
    mq: 'mqdefault',
    sd: 'sddefault',
    maxres: 'maxresdefault'
  };
  
  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
};