
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DiaryEntry from "./DiaryEntry";
import { es } from 'date-fns/locale';

type Emotion = {
  id: number;
  name: string;
  color: string;
  icon: string;
};

type DiaryEntry = {
  text: string;
  emotion?: Emotion;
  words: string[];
  audioUrl?: string;
  date: string;
};

interface DiaryCalendarProps {
  date: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
  entries: { [key: string]: DiaryEntry };
}

const DiaryCalendar = ({ date, onSelectDate, entries }: DiaryCalendarProps) => {
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);

  const handleDayClick = (date: Date | undefined) => {
    if (!date) return;
    
    const dateKey = date.toISOString().split('T')[0];
    const entry = entries[dateKey];
    
    if (entry) {
      setSelectedEntry(entry);
    } else {
      setSelectedEntry(null);
    }
    
    onSelectDate(date);
  };

  const isDateInPast = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <div className="w-full space-y-4">
      <Calendar
        mode="single"
        selected={date}
        onSelect={handleDayClick}
        locale={es}
        className="rounded-lg border bg-secondary/50 backdrop-blur-sm border-secondary/20 mx-auto max-w-[350px]"
        classNames={{
          months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4 w-full",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-medium",
          nav: "space-x-1 flex items-center",
          nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",
          head_row: "flex w-full",
          head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem] flex-1",
          row: "flex w-full mt-2",
          cell: "text-center text-sm relative p-0 flex-1 h-8",
          day: "h-8 w-8 p-0 mx-auto font-normal aria-selected:opacity-100",
          day_range_end: "day-range-end",
          day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          day_today: "bg-accent text-accent-foreground",
          day_outside: "text-muted-foreground opacity-50",
          day_disabled: "text-muted-foreground opacity-50",
          day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
        }}
        modifiers={{
          booked: (date) => {
            const dateKey = date.toISOString().split('T')[0];
            return !!entries[dateKey];
          },
        }}
        modifiersStyles={{
          booked: {
            color: "white",
            backgroundColor: "rgba(255, 64, 129, 0.4)",
          }
        }}
        components={{
          DayContent: ({ date }) => {
            const dateKey = date.toISOString().split('T')[0];
            const entry = entries[dateKey];
            return (
              <div className="relative w-full h-full flex items-center justify-center">
                {entry?.emotion ? (
                  <div className="w-7 h-7 rounded-full flex items-center justify-center relative" style={{ backgroundColor: entry.emotion.color || 'rgba(255, 64, 129, 0.4)' }}>
                    <span className="absolute text-white text-sm">{date.getDate()}</span>
                  </div>
                ) : (
                  <span>{date.getDate()}</span>
                )}
              </div>
            );
          },
        }}
      />

      {selectedEntry && (
        <div className="mt-4">
          <DiaryEntry 
            entry={selectedEntry} 
            isEditable={!isDateInPast(new Date(selectedEntry.date))}
          />
        </div>
      )}
    </div>
  );
};

export default DiaryCalendar;
