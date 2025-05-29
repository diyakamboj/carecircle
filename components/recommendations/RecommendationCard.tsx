'use client';

import { Card, CardContent } from "@/components/ui/card";
import { type Recommendation } from "./types";
import { FileText, Video, Newspaper, Music } from "lucide-react";

interface RecommendationCardProps {
  recommendation: Recommendation;
  onClick: (recommendation: Recommendation) => void;
}

const typeIcons = {
  video: Video,
  article: Newspaper,
  audio: Music,
  text: FileText
};

export function RecommendationCard({ recommendation, onClick }: RecommendationCardProps) {
  const Icon = typeIcons[recommendation.type];

  return (
    <Card 
      className="w-full cursor-pointer hover:bg-accent transition-colors"
      onClick={() => onClick(recommendation)}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="rounded-full p-2 bg-primary/10">
            <Icon className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm truncate">{recommendation.title}</h4>
            <p className="text-xs text-muted-foreground truncate">
              By {recommendation.uploadedBy.name}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 