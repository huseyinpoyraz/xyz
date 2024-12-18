import React, { createContext, useContext, useState, useEffect } from 'react';
import { Category, Section, Video } from '../types';
import { initialCategories } from '../data/initialData';

interface DataContextType {
  categories: Category[];
  updateCategory: (categoryId: string, newData: Partial<Category>) => void;
  updateSection: (categoryId: string, sectionId: string, heading: string) => void;
  updateVideo: (categoryId: string, sectionId: string, videoId: string, data: Partial<Video>) => void;
  incrementViewCount: (categoryId: string, sectionId: string, videoId: string) => void;
  addSection: (categoryId: string, heading: string) => void;
  deleteSection: (categoryId: string, sectionId: string) => void;
  addVideo: (categoryId: string, sectionId: string) => void;
  deleteVideo: (categoryId: string, sectionId: string, videoId: string) => void;
  addCategory: (name: string) => void;
  deleteCategory: (categoryId: string) => void;
}

const STORAGE_KEY = 'videoCarouselData';

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      return parsedData.map((cat: Category) => ({
        ...cat,
        sections: cat.sections.map(section => ({
          ...section,
          videos: section.videos.map(video => ({
            ...video,
            viewCount: video.viewCount || 0,
            type: video.type || 'video'
          }))
        }))
      }));
    }
    return initialCategories;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
  }, [categories]);

  const updateCategory = (categoryId: string, newData: Partial<Category>) => {
    setCategories(prev => prev.map(cat => 
      cat.id === categoryId ? { ...cat, ...newData } : cat
    ));
  };

  const updateSection = (categoryId: string, sectionId: string, heading: string) => {
    setCategories(prev => prev.map(cat => 
      cat.id === categoryId 
        ? {
            ...cat,
            sections: cat.sections.map(section =>
              section.id === sectionId ? { ...section, heading } : section
            )
          }
        : cat
    ));
  };

  const updateVideo = (categoryId: string, sectionId: string, videoId: string, data: Partial<Video>) => {
    setCategories(prev => prev.map(cat => 
      cat.id === categoryId 
        ? {
            ...cat,
            sections: cat.sections.map(section =>
              section.id === sectionId 
                ? {
                    ...section,
                    videos: section.videos.map(video =>
                      video.id === videoId ? { ...video, ...data } : video
                    )
                  }
                : section
            )
          }
        : cat
    ));
  };

  const incrementViewCount = (categoryId: string, sectionId: string, videoId: string) => {
    setCategories(prev => prev.map(cat => 
      cat.id === categoryId 
        ? {
            ...cat,
            sections: cat.sections.map(section =>
              section.id === sectionId 
                ? {
                    ...section,
                    videos: section.videos.map(video =>
                      video.id === videoId 
                        ? { ...video, viewCount: (video.viewCount || 0) + 1 }
                        : video
                    )
                  }
                : section
            )
          }
        : cat
    ));
  };

  const addSection = (categoryId: string, heading: string) => {
    const newSection: Section = {
      id: `section-${Date.now()}`,
      heading,
      videos: []
    };

    setCategories(prev => prev.map(cat =>
      cat.id === categoryId
        ? { ...cat, sections: [...cat.sections, newSection] }
        : cat
    ));
  };

  const deleteSection = (categoryId: string, sectionId: string) => {
    setCategories(prev => prev.map(cat =>
      cat.id === categoryId
        ? { ...cat, sections: cat.sections.filter(section => section.id !== sectionId) }
        : cat
    ));
  };

  const addVideo = (categoryId: string, sectionId: string) => {
    const newVideo: Video = {
      id: `video-${Date.now()}`,
      title: 'New Video',
      description: 'Enter video description',
      url: '',
      type: 'video',
      viewCount: 0
    };

    setCategories(prev => prev.map(cat =>
      cat.id === categoryId
        ? {
            ...cat,
            sections: cat.sections.map(section =>
              section.id === sectionId
                ? { ...section, videos: [...section.videos, newVideo] }
                : section
            )
          }
        : cat
    ));
  };

  const deleteVideo = (categoryId: string, sectionId: string, videoId: string) => {
    setCategories(prev => prev.map(cat =>
      cat.id === categoryId
        ? {
            ...cat,
            sections: cat.sections.map(section =>
              section.id === sectionId
                ? { ...section, videos: section.videos.filter(video => video.id !== videoId) }
                : section
            )
          }
        : cat
    ));
  };

  const addCategory = (name: string) => {
    const newCategory: Category = {
      id: `category-${Date.now()}`,
      name,
      sections: []
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const deleteCategory = (categoryId: string) => {
    setCategories(prev => prev.filter(cat => cat.id !== categoryId));
  };

  return (
    <DataContext.Provider value={{
      categories,
      updateCategory,
      updateSection,
      updateVideo,
      incrementViewCount,
      addSection,
      deleteSection,
      addVideo,
      deleteVideo,
      addCategory,
      deleteCategory
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};