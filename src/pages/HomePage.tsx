import React, { useState } from 'react';
import { Header } from '../components/Header';
import { VideoCarousel } from '../components/VideoCarousel';
import { useData } from '../context/DataContext';

export const HomePage: React.FC = () => {
  const { categories } = useData();
  const [activeTab, setActiveTab] = useState(categories[0].id);

  const activeCategory = categories.find(cat => cat.id === activeTab);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 border-b">
          <div className="flex gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`px-4 py-2 font-medium transition-colors relative ${
                  activeTab === category.id
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {category.name}
                {activeTab === category.id && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600" />
                )}
              </button>
            ))}
          </div>
        </div>

        {activeCategory?.sections.map((section) => (
          <VideoCarousel
            key={section.id}
            heading={section.heading}
            videos={section.videos}
          />
        ))}
      </main>
    </div>
  );
};