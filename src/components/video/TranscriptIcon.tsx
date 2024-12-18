import React from 'react';
import { FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TranscriptIconProps {
  videoId: string;
}

export const TranscriptIcon: React.FC<TranscriptIconProps> = ({ videoId }) => {
  return (
    <Link
      to={`/video/${videoId}/transcript`}
      className="absolute top-2 right-2 z-10 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
      title="View Transcript"
    >
      <FileText className="w-5 h-5 text-gray-700" />
    </Link>
  );
};