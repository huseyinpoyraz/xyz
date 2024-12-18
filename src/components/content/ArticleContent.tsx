import React, { useEffect, useState } from 'react';
import { ArticleContent as ArticleContentType } from '../../types/content';
import { FileText, ExternalLink } from 'lucide-react';
import { getThumbnailUrl } from '../../utils/content/thumbnails';

interface ArticleContentProps {
  content: ArticleContentType;
}

export const ArticleContent: React.FC<ArticleContentProps> = ({ content }) => {
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
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors" />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <ExternalLink className="w-12 h-12 mb-2" />
          {content.source && (
            <div className="text-sm font-medium bg-black/50 px-3 py-1 rounded">
              {content.source}
            </div>
          )}
        </div>
      </a>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{content.title}</h3>
        <p className="text-gray-600 text-sm">{content.description}</p>
      </div>
    </div>
  );
};