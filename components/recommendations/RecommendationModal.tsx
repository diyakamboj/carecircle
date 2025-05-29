'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { type Recommendation } from "./types";

interface RecommendationModalProps {
  recommendation: Recommendation | null;
  onClose: () => void;
}

export function RecommendationModal({ recommendation, onClose }: RecommendationModalProps) {
  if (!recommendation) return null;

  return (
    <Dialog open={!!recommendation} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{recommendation.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {recommendation.type === 'video' && (
            <div className="relative pb-[56.25%] h-0">
              <iframe
                src={recommendation.embedUrl}
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
          {recommendation.type === 'article' && (
            <iframe
              src={recommendation.embedUrl}
              className="w-full h-[600px] rounded-lg"
            />
          )}
          {recommendation.type === 'audio' && (
            <audio
              src={recommendation.embedUrl}
              controls
              className="w-full"
            />
          )}
          {recommendation.type === 'text' && (
            <div className="prose max-w-none">
              <p>{recommendation.notes}</p>
            </div>
          )}
          <div className="text-sm text-muted-foreground">
            Pushed by {recommendation.uploadedBy.name}
          </div>
          <div className="text-sm mt-2">
            {recommendation.notes}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 