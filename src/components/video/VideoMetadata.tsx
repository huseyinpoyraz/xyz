import React from 'react';
import { Eye, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

interface VideoMetadataProps {
  videoId: string;
  viewCount: number;
}

export const VideoMetadata: React.FC<VideoMetadataProps> = ({ videoId, viewCount }) => {
  return (
    <div className="flex items-center gap-4 text-gray-600">
      <div className="flex items-center gap-1">
        <Eye className="w-4 h-4" />
        <span className="text-sm">{viewCount} views</span>
      </div>
      <Link
        to={`/video/${videoId}/transcript`}
        className="flex items-center gap-1 hover:text-gray-800 transition-colors"
        title="View Transcript"
      >
        <FileText className="w-4 h-4" />
        <span className="text-sm">Transcript</span>
      </Link>
    </div>
  );
};