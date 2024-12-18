// YouTube URL validation patterns
export const YOUTUBE_URL_PATTERNS = [
  /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]{11})/, // Standard watch URLs
  /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^/?]{11})(?:\?[^#]*)?$/, // Embed URLs with query params
  /^(?:https?:\/\/)?youtu\.be\/([^/?]{11})/, // Short URLs
  /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([^/?]{11})/, // Legacy URLs
  /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([^/?]{11})/ // Shorts URLs
];