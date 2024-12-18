import { VideoDetails, Transcript, Technology } from '../types/transcript';

// Mock transcript data - in a real app, this would come from an API
const mockTranscript: Transcript[] = [
  { timestamp: 0, text: "Hello and welcome to this video tutorial." },
  { timestamp: 5, text: "Today we'll be discussing modern web development." },
  // Add more mock transcript entries as needed
];

// Mock technologies - in a real app, this would be extracted from transcript
const mockTechnologies: Technology[] = [
  { name: "React", url: "https://reactjs.org" },
  { name: "TypeScript", url: "https://www.typescriptlang.org" },
  // Add more mock technologies as needed
];

export const fetchVideoDetails = async (videoId: string): Promise<VideoDetails | null> => {
  // In a real app, this would make an API call to get video details
  // For now, we'll return mock data
  return {
    id: videoId,
    title: "Web Development Tutorial",
    description: "Learn modern web development techniques",
    url: `https://www.youtube.com/embed/${videoId}`,
    transcript: mockTranscript,
    technologies: mockTechnologies
  };
};