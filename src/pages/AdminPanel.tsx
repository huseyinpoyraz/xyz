import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { AdminHeader } from '../components/AdminHeader';
import { VideoCarousel } from '../components/VideoCarousel';
import { AddSection } from '../components/AddSection';
import { EditableField } from '../components/EditableField';
import { AddCategoryForm } from '../components/AddCategoryForm';
import { useData } from '../context/DataContext';

export const AdminPanel: React.FC = () => {
  const {
    categories,
    updateCategory,
    updateSection,
    updateVideo,
    addSection,
    deleteSection,
    addVideo,
    deleteVideo,
    addCategory,
    deleteCategory
  } = useData();
  
  const [activeTab, setActiveTab] = useState(categories[0]?.id);
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  const activeCategory = categories.find(cat => cat.id === activeTab);

  const handleAddCategory = (name: string) => {
    addCategory(name);
    setIsAddingCategory(false);
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (categories.length > 1) {
      deleteCategory(categoryId);
      if (activeTab === categoryId) {
        setActiveTab(categories[0].id);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 border-b">
          <div className="flex items-center gap-4 flex-wrap">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center gap-2">
                <EditableField
                  value={category.name}
                  onSave={(name) => updateCategory(category.id, { name })}
                  className="px-4 py-2"
                />
                <button
                  onClick={() => setActiveTab(category.id)}
                  className={`px-4 py-2 font-medium transition-colors ${
                    activeTab === category.id
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  Edit
                </button>
                {categories.length > 1 && (
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="p-2 text-red-500 hover:text-red-600"
                    title="Delete category"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
            
            {isAddingCategory ? (
              <AddCategoryForm
                onAdd={handleAddCategory}
                onCancel={() => setIsAddingCategory(false)}
              />
            ) : (
              <button
                onClick={() => setIsAddingCategory(true)}
                className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add Category
              </button>
            )}
          </div>
        </div>

        {activeCategory?.sections.map((section) => (
          <VideoCarousel
            key={section.id}
            heading={section.heading}
            videos={section.videos}
            isEditing={true}
            onUpdateHeading={(heading) => updateSection(activeCategory.id, section.id, heading)}
            onUpdateVideo={(videoId, data) => updateVideo(activeCategory.id, section.id, videoId, data)}
            onAddVideo={() => addVideo(activeCategory.id, section.id)}
            onDeleteVideo={(videoId) => deleteVideo(activeCategory.id, section.id, videoId)}
            onDeleteSection={() => deleteSection(activeCategory.id, section.id)}
          />
        ))}

        <div className="mt-8">
          <AddSection onAdd={(heading) => addSection(activeCategory!.id, heading)} />
        </div>
      </main>
    </div>
  );
};