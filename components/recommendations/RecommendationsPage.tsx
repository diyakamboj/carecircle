'use client';

import { useState } from 'react';
import { WeeklyView } from './WeeklyView';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format, differenceInWeeks } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface RecommendationsPageProps {
  recommendations: Array<{
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
  }>;
  pregnancyStartDate?: Date;
}

function getPregnancyWeek(date: Date, startDate: Date): number {
  return Math.min(40, Math.max(1, differenceInWeeks(date, startDate) + 1));
}

export function RecommendationsPage({ 
  recommendations,
  pregnancyStartDate = new Date('2024-02-01') // Changed to February for week 14 in May
}: RecommendationsPageProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Recommendations</h1>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(currentDate, "MMMM d, yyyy")} (Week {getPregnancyWeek(currentDate, pregnancyStartDate)})
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={currentDate}
                onSelect={(date) => date && setCurrentDate(date)}
                initialFocus
                modifiers={{
                  // Disable dates that would be beyond week 40
                  disabled: [
                    (date) => getPregnancyWeek(date, pregnancyStartDate) > 40
                  ]
                }}
                modifiersStyles={{
                  disabled: { opacity: 0.5, cursor: 'not-allowed' }
                }}
                components={{
                  DayContent: ({ date }) => (
                    <div className="relative group">
                      <div>{format(date, "d")}</div>
                      <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-popover text-popover-foreground text-xs py-1 px-2 rounded shadow whitespace-nowrap">
                        Week {getPregnancyWeek(date, pregnancyStartDate)}
                      </div>
                    </div>
                  )
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <WeeklyView
        recommendations={recommendations}
        currentDate={currentDate}
        onDateChange={setCurrentDate}
        pregnancyStartDate={pregnancyStartDate}
      />
    </div>
  );
} 