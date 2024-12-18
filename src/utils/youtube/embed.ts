import { extractYouTubeId } from './validation';

const generateSiParam = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';
  const length = 16;
  return Array.from(
    { length }, 
    () => chars.charAt(Math.floor(Math.random() * chars.length))
  ).join('');
};

export const getYouTubeEmbedUrl = (url: string): string => {
  const videoId = extractYouTubeId(url);
  if (!videoId) return '';
  
  const si = generateSiParam();
  return `https://www.youtube.com/embed/${videoId}?si=${si}&rel=0`;
};