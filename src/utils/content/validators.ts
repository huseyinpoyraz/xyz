import { ContentType } from '../../types/content';

const YOUTUBE_PATTERNS = [
  /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^/?]{11})(?:\?si=([^&]+))?/,
  /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]{11})/,
  /^(?:https?:\/\/)?youtu\.be\/([^/?]{11})/
];

export const isYouTubeUrl = (url: string): boolean => {
  if (!url) return false;
  return YOUTUBE_PATTERNS.some(pattern => pattern.test(url.trim()));
};

export const extractYouTubeId = (url: string): string | null => {
  if (!url) return null;
  const cleanUrl = url.trim();
  
  for (const pattern of YOUTUBE_PATTERNS) {
    const match = cleanUrl.match(pattern);
    if (match?.[1]) {
      return match[1];
    }
  }
  return null;
};

export const extractSiParam = (url: string): string | null => {
  if (!url) return null;
  const match = url.trim().match(/[?&]si=([^&]+)/);
  return match?.[1] || null;
};

export const detectContentType = (url: string): ContentType => {
  if (!url) return 'article';
  const cleanUrl = url.trim().toLowerCase();
  
  if (isYouTubeUrl(cleanUrl)) return 'video';
  if (cleanUrl.includes('udemy.com') || cleanUrl.includes('coursera.org')) return 'course';
  return 'article';
};