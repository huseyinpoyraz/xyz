export type ThumbnailQuality = 'default' | 'hq' | 'mq' | 'sd' | 'maxres';

const QUALITY_MAP: Record<ThumbnailQuality, string> = {
  default: 'default',
  hq: 'hqdefault',
  mq: 'mqdefault',
  sd: 'sddefault',
  maxres: 'maxresdefault'
};

export const getYouTubeThumbnail = (
  videoId: string,
  quality: ThumbnailQuality = 'maxres'
): string => {
  return `https://img.youtube.com/vi/${videoId}/${QUALITY_MAP[quality]}.jpg`;
};