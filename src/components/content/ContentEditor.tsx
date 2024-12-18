import React, { useState, useEffect } from 'react';
import { Content, ContentType } from '../../types/content';
import { Save, Trash2 } from 'lucide-react';
import { detectContentType } from '../../utils/content/validators';

interface ContentEditorProps {
  content: Content;
  onUpdate?: (data: Partial<Content>) => void;
  onDelete?: () => void;
}

export const ContentEditor: React.FC<ContentEditorProps> = ({
  content,
  onUpdate,
  onDelete
}) => {
  const [editedContent, setEditedContent] = useState(content);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    setEditedContent(content);
    setIsModified(false);
  }, [content]);

  const handleChange = (field: keyof Content, value: any) => {
    if (field === 'url') {
      const type = detectContentType(value);
      setEditedContent(prev => ({ 
        ...prev, 
        [field]: value,
        type,
        platform: type === 'course' ? 'udemy' : undefined
      }));
    } else {
      setEditedContent(prev => ({ ...prev, [field]: value }));
    }
    setIsModified(true);
  };

  const handleSave = () => {
    onUpdate?.(editedContent);
    setIsModified(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 space-y-2">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">Edit Content</h3>
        <div className="flex gap-2">
          {isModified && (
            <button
              onClick={handleSave}
              className="p-1 bg-green-500 text-white rounded hover:bg-green-600"
              title="Save changes"
            >
              <Save className="w-4 h-4" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
              title="Delete content"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <input
        className="w-full p-2 border rounded"
        value={editedContent.title}
        onChange={(e) => handleChange('title', e.target.value)}
        placeholder="Title"
      />
      <input
        className="w-full p-2 border rounded"
        value={editedContent.description}
        onChange={(e) => handleChange('description', e.target.value)}
        placeholder="Description"
      />
      <input
        className="w-full p-2 border rounded"
        value={editedContent.url}
        onChange={(e) => handleChange('url', e.target.value)}
        placeholder="URL (YouTube, Udemy, or Article)"
      />
      
      {editedContent.type === 'course' && (
        <select
          className="w-full p-2 border rounded"
          value={editedContent.platform}
          onChange={(e) => handleChange('platform', e.target.value)}
        >
          <option value="udemy">Udemy</option>
          <option value="coursera">Coursera</option>
          <option value="other">Other</option>
        </select>
      )}
    </div>
  );
};