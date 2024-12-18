export interface Technology {
  name: string;
  url: string;
}

export interface Transcript {
  text: string;
  timestamp: number;
}

export interface VideoDetails {
  id: string;
  title: string;
  description: string;
  url: string;
  transcript: Transcript[];
  technologies: Technology[];
}