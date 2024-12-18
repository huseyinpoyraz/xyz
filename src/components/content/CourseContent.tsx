import React, { useEffect, useState } from 'react';
import { CourseContent as CourseContentType } from '../../types/content';
import { GraduationCap } from 'lucide-react';
import { getThumbnailUrl } from '../../utils/content/thumbnails';

interface CourseContentProps {
  content: CourseContentType;
}

export const CourseContent: React.FC<CourseContentProps> = ({ content }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);

  useEffect(() => {
    getThumbnailUrl(content).then(setThumbnailUrl);
  }, [content]);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <a 
        href={content.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative aspect-video group"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${thumbnailUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/80 to-purple-600/80 group-hover:from-blue-500/90 group-hover:to-purple-600/90 transition-colors" />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <GraduationCap className="w-12 h-12 mb-2" />
          <div className="text-sm font-medium bg-black/50 px-3 py-1 rounded">
            {content.platform.charAt(0).toUpperCase() + content.platform.slice(1)} Course
          </div>
        </div>
      </a>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{content.title}</h3>
        <p className="text-gray-600 text-sm">{content.description}</p>
      </div>
    </div>
  );
};