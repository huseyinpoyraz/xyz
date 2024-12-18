import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface AddSectionProps {
  onAdd: (heading: string) => void;
}

export const AddSection: React.FC<AddSectionProps> = ({ onAdd }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [heading, setHeading] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heading.trim()) {
      onAdd(heading.trim());
      setHeading('');
      setIsAdding(false);
    }
  };

  if (!isAdding) {
    return (
      <button
        onClick={() => setIsAdding(true)}
        className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center gap-2 text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors"
      >
        <Plus className="w-5 h-5" />
        Add New Section
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg">
      <input
        autoFocus
        value={heading}
        onChange={(e) => setHeading(e.target.value)}
        placeholder="Enter section heading"
        className="w-full px-4 py-2 border rounded mb-4"
      />
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => setIsAdding(false)}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Section
        </button>
      </div>
    </form>
  );
};