'use client';

import { useState } from 'react';
import { format, startOfWeek, addDays, isSameDay, differenceInWeeks, addWeeks, subWeeks } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RecommendationCard } from './RecommendationCard';

interface Recommendation {
  id: string;
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

interface WeeklyViewProps {
  recommendations: Recommendation[];
  currentDate: Date;
  onDateChange: (date: Date) => void;
  pregnancyStartDate?: Date;
}

function getTrimester(week: number): string {
  if (week <= 12) return "First Trimester";
  if (week <= 27) return "Second Trimester";
  return "Third Trimester";
}

function getPregnancyWeek(date: Date, startDate: Date): number {
  return Math.min(40, Math.max(1, differenceInWeeks(date, startDate) + 1));
}

function getWeeksToShow(currentWeek: number): number[] {
  // Get 7 weeks centered around the current week, but stay within 1-40 range
  const weeks = [];
  const start = Math.max(1, Math.min(34, currentWeek - 3));
  for (let i = 0; i < 7; i++) {
    const week = start + i;
    if (week <= 40) {
      weeks.push(week);
    }
  }
  return weeks;
}

export function WeeklyView({ 
  recommendations, 
  currentDate, 
  onDateChange,
  pregnancyStartDate = new Date('2024-02-01')
}: WeeklyViewProps) {
  // Calculate current pregnancy week
  const pregnancyWeek = getPregnancyWeek(currentDate, pregnancyStartDate);
  const weeksToShow = getWeeksToShow(pregnancyWeek);

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = direction === 'prev' 
      ? subWeeks(currentDate, 1)
      : addWeeks(currentDate, 1);
    
    const newPregnancyWeek = getPregnancyWeek(newDate, pregnancyStartDate);
    if (newPregnancyWeek >= 1 && newPregnancyWeek <= 40) {
      onDateChange(newDate);
    }
  };

  // Group recommendations by pregnancy week
  const recommendationsByWeek = new Map<number, Recommendation[]>();
  recommendations.forEach(rec => {
    const week = getPregnancyWeek(rec.date, pregnancyStartDate);
    if (!recommendationsByWeek.has(week)) {
      recommendationsByWeek.set(week, []);
    }
    recommendationsByWeek.get(week)?.push(rec);
  });

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <Button 
          variant="ghost" 
          onClick={() => navigateWeek('prev')}
          disabled={pregnancyWeek <= 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-semibold">{getTrimester(pregnancyWeek)}</h2>
          <p className="text-sm text-muted-foreground">
            Currently at Week {pregnancyWeek}
          </p>
        </div>
        <Button 
          variant="ghost" 
          onClick={() => navigateWeek('next')}
          disabled={pregnancyWeek >= 40}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-7 flex-1">
        {weeksToShow.map((week) => (
          <div
            key={week}
            className="border-r last:border-r-0 min-h-[600px]"
          >
            <div className="p-2 text-center border-b sticky top-0 bg-background">
              <div className="font-medium">Week {week}</div>
              <div className="text-xs text-muted-foreground">
                {getTrimester(week)}
              </div>
            </div>
            <div className="p-2 space-y-2">
              {recommendationsByWeek.get(week)?.map((rec) => (
                <RecommendationCard
                  key={rec.id}
                  doctorName={rec.doctorName}
                  specialization={rec.specialization}
                  title={rec.title}
                  attachment={rec.attachment}
                  notes={rec.notes}
                  date={rec.date}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 