// Default thumbnail for different content types
const DEFAULT_THUMBNAIL = 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&auto=format&fit=crop';

// Cache for thumbnails to avoid repeated fetches
const thumbnailCache = new Map<string, string>();

export const getThumbnailForUrl = async (url: string): Promise<string> => {
  // Return cached thumbnail if available
  if (thumbnailCache.has(url)) {
    return thumbnailCache.get(url)!;
  }

  try {
    // Try to extract Open Graph image using fetch
    const response = await fetch(url);
    const html = await response.text();
    
    // Look for Open Graph image meta tag
    const ogImage = html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]*)"[^>]*>/i)?.[1];
    
    if (ogImage) {
      thumbnailCache.set(url, ogImage);
      return ogImage;
    }

    // If no OG image found, use default thumbnail
    thumbnailCache.set(url, DEFAULT_THUMBNAIL);
    return DEFAULT_THUMBNAIL;
  } catch (error) {
    // If fetch fails, use default thumbnail
    thumbnailCache.set(url, DEFAULT_THUMBNAIL);
    return DEFAULT_THUMBNAIL;
  }
};