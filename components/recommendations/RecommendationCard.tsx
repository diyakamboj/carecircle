'use client';

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FileIcon, LinkIcon } from "lucide-react";

interface RecommendationCardProps {
  doctorName: string;
  specialization: string;
  title: string;
  attachment?: {
    type: 'upload' | 'link';
    url: string;
    name: string;
  };
  notes: string;
  date: Date;
}

export function RecommendationCard({
  doctorName,
  specialization,
  title,
  attachment,
  notes,
  date,
}: RecommendationCardProps) {
  return (
    <Card className="w-full h-full">
      <CardHeader className="flex flex-row items-center gap-4 p-4">
        <Avatar className="h-8 w-8">
          <AvatarImage src="" />
          <AvatarFallback>{doctorName[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h4 className="text-sm font-semibold">{doctorName}</h4>
          <p className="text-xs text-muted-foreground">{specialization}</p>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <h3 className="font-medium mb-2">{title}</h3>
        {attachment && (
          <Button
            variant="outline"
            className="w-full justify-start gap-2 mb-2"
            onClick={() => window.open(attachment.url, '_blank')}
          >
            {attachment.type === 'upload' ? <FileIcon size={16} /> : <LinkIcon size={16} />}
            <span className="truncate">{attachment.name}</span>
          </Button>
        )}
        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{notes}</p>
      </CardContent>
    </Card>
  );
} 