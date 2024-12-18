// Types for different content types
export type ContentType = 'video' | 'course' | 'article';

export interface BaseContent {
  id: string;
  title: string;
  description: string;
  url: string;
  type: ContentType;
}

export interface VideoContent extends BaseContent {
  type: 'video';
  thumbnailUrl?: string;
}

export interface CourseContent extends BaseContent {
  type: 'course';
  platform: 'udemy' | 'coursera' | 'other';
}

export interface ArticleContent extends BaseContent {
  type: 'article';
  source?: string;
}

export type Content = VideoContent | CourseContent | ArticleContent;