'use client';

import { useState } from 'react';
import { format, startOfWeek, addWeeks, parseISO } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RecommendationCard } from './RecommendationCard';
import { RecommendationModal } from './RecommendationModal';
import { type Recommendation } from './types';

// Mock recommendations data
const mockRecommendations: Recommendation[] = [
  {
    id: 'rec1',
    weekStart: '2024-05-05',
    title: 'Prenatal Yoga Basics',
    type: 'video',
    embedUrl: 'https://youtu.be/dQw4w9WgXcQ',
    notes: 'A gentle yoga routine to ease lower-back pain.',
    uploadedBy: { name: 'Dr. Emily Smith' }
  },
  {
    id: 'rec2',
    weekStart: '2024-05-05',
    title: 'Healthy Pregnancy Nutrition',
    type: 'article',
    embedUrl: 'https://example.com/nutrition',
    notes: 'Tips on balanced meals and key nutrients.',
    uploadedBy: { name: 'Nurse Jamie Lee' }
  },
  {
    id: 'rec3',
    weekStart: '2024-05-12',
    title: 'Relaxation Techniques',
    type: 'audio',
    embedUrl: 'https://example.com/audio/relaxation.mp3',
    notes: 'Guided meditation for stress relief.',
    uploadedBy: { name: 'Dr. Sarah Wilson' }
  },
  {
    id: 'rec4',
    weekStart: '2024-05-19',
    title: 'Third Trimester Exercise Guide',
    type: 'text',
    embedUrl: '',
    notes: 'Safe exercises for the final trimester.',
    uploadedBy: { name: 'Dr. Michael Brown' }
  }
];

interface WeeklyViewProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  pregnancyStartDate?: Date;
}

function getWeeksToShow(baseDate: Date): Date[] {
  const weeks: Date[] = [];
  const firstWeek = startOfWeek(baseDate, { weekStartsOn: 1 });
  
  // Get 3 weeks before and 3 weeks after
  for (let i = -3; i <= 3; i++) {
    weeks.push(addWeeks(firstWeek, i));
  }
  
  return weeks;
}

export function WeeklyView({ 
  currentDate,
  onDateChange,
  pregnancyStartDate = new Date('2024-02-01')
}: WeeklyViewProps) {
  const [selectedRecommendation, setSelectedRecommendation] = useState<Recommendation | null>(null);
  const weeks = getWeeksToShow(currentDate);

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = direction === 'prev' 
      ? addWeeks(currentDate, -1)
      : addWeeks(currentDate, 1);
    onDateChange(newDate);
  };

  // Group recommendations by week
  const recommendationsByWeek = new Map<string, Recommendation[]>();
  mockRecommendations.forEach(rec => {
    const weekKey = rec.weekStart;
    if (!recommendationsByWeek.has(weekKey)) {
      recommendationsByWeek.set(weekKey, []);
    }
    recommendationsByWeek.get(weekKey)?.push(rec);
  });

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <Button 
          variant="ghost" 
          onClick={() => navigateWeek('prev')}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-semibold">
            {format(weeks[0], 'MMM d')} - {format(weeks[6], 'MMM d, yyyy')}
          </h2>
        </div>
        <Button 
          variant="ghost" 
          onClick={() => navigateWeek('next')}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <div className="grid grid-cols-7 flex-1 min-w-[800px]">
          {weeks.map((weekStart) => {
            const weekKey = format(weekStart, 'yyyy-MM-dd');
            const weekRecs = recommendationsByWeek.get(weekKey) || [];
            
            return (
              <div
                key={weekKey}
                className="border-r last:border-r-0 min-h-[600px]"
              >
                <div className="p-2 text-center border-b sticky top-0 bg-background">
                  <div className="font-medium">Week {format(weekStart, 'w')}</div>
                  <div className="text-xs text-muted-foreground">
                    {format(weekStart, 'MMM d')}
                  </div>
                </div>
                <div className="p-2 space-y-2">
                  {weekRecs.length > 0 ? (
                    weekRecs.map((rec) => (
                      <RecommendationCard
                        key={rec.id}
                        recommendation={rec}
                        onClick={setSelectedRecommendation}
                      />
                    ))
                  ) : (
                    <div className="text-center text-sm text-muted-foreground py-4">
                      No recommendations
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <RecommendationModal
        recommendation={selectedRecommendation}
        onClose={() => setSelectedRecommendation(null)}
      />
    </div>
  );
} 