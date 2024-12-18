export interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'video' | 'article';
  viewCount: number;
}

export interface Category {
  id: string;
  name: string;
  sections: Section[];
}

export interface Section {
  id: string;
  heading: string;
  videos: Video[];
}

export interface AddCategoryFormProps {
  onAdd: (name: string) => void;
  onCancel: () => void;
}