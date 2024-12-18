import React from 'react';
import { Content } from '../../types/content';
import { VideoContent } from './VideoContent';
import { CourseContent } from './CourseContent';
import { ArticleContent } from './ArticleContent';
import { ContentEditor } from './ContentEditor';

interface ContentCardProps {
  content: Content;
  isEditing?: boolean;
  onUpdate?: (data: Partial<Content>) => void;
  onDelete?: () => void;
}

export const ContentCard: React.FC<ContentCardProps> = ({
  content,
  isEditing,
  onUpdate,
  onDelete
}) => {
  if (isEditing) {
    return <ContentEditor content={content} onUpdate={onUpdate} onDelete={onDelete} />;
  }

  switch (content.type) {
    case 'video':
      return <VideoContent content={content} />;
    case 'course':
      return <CourseContent content={content} />;
    case 'article':
      return <ArticleContent content={content} />;
  }
};