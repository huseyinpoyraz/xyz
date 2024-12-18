import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';

interface EditableFieldProps {
  value: string;
  onSave: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export const EditableField: React.FC<EditableFieldProps> = ({
  value: initialValue,
  onSave,
  className = '',
  placeholder
}) => {
  const [value, setValue] = useState(initialValue);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    setValue(initialValue);
    setIsModified(false);
  }, [initialValue]);

  const handleSave = () => {
    onSave(value);
    setIsModified(false);
  };

  return (
    <div className="flex items-center gap-2">
      <input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setIsModified(true);
        }}
        className={`px-4 py-2 border rounded ${className}`}
        placeholder={placeholder}
      />
      {isModified && (
        <button
          onClick={handleSave}
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors"
          title="Save changes"
        >
          <Save className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};