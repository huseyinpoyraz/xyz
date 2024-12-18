import { Category } from '../types';

export const initialCategories: Category[] = [
  {
    id: '1',
    name: 'Entertainment',
    sections: [
      {
        id: 'e1',
        heading: 'Popular Movies',
        videos: Array(5).fill(null).map((_, i) => ({
          id: `e1-${i}`,
          title: `Movie Trailer ${i + 1}`,
          description: 'An exciting movie that will keep you on the edge of your seat',
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          type: 'video',
          viewCount: 0
        }))
      },
      {
        id: 'e2',
        heading: 'TV Shows',
        videos: Array(5).fill(null).map((_, i) => ({
          id: `e2-${i}`,
          title: `TV Show Trailer ${i + 1}`,
          description: 'A compelling TV series with amazing characters',
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          type: 'video',
          viewCount: 0
        }))
      }
    ]
  }
];