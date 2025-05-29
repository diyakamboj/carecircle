export type RecommendationType = 'video' | 'article' | 'audio' | 'text';

export interface Recommendation {
  id: string;
  weekStart: string;
  title: string;
  type: RecommendationType;
  embedUrl: string;
  notes: string;
  uploadedBy: {
    name: string;
  };
} 