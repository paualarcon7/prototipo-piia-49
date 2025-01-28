import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
  const [isOpen, setIsOpen] = useState(false);
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
      <Button
        variant="outline"
        className="w-full bg-secondary/50 backdrop-blur-sm border-secondary/20 text-white hover:text-white hover:bg-secondary/70"
        onClick={() => setIsOpen(true)}
      >
        Ver todos mis registros
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-background/95 backdrop-blur-sm border-secondary/20 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-center">Mi bitácora</DialogTitle>
          </DialogHeader>

          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDayClick}
            locale={es}
            className="rounded-lg border bg-secondary/50 backdrop-blur-sm border-secondary/20"
            modifiers={{
              booked: (date) => {
                const dateKey = date.toISOString().split('T')[0];
                return !!entries[dateKey];
              },
            }}
            modifiersStyles={{
              booked: {
                color: "white",
                backgroundColor: "rgba(168, 85, 247, 0.4)",
              }
            }}
            components={{
              DayContent: ({ date }) => {
                const dateKey = date.toISOString().split('T')[0];
                const entry = entries[dateKey];
                return (
                  <div className="relative w-full h-full flex items-center justify-center">
                    {entry?.emotion ? (
                      <div className="w-8 h-8 rounded-full flex items-center justify-center relative" style={{ backgroundColor: entry.emotion.color || 'rgba(168, 85, 247, 0.4)' }}>
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
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DiaryCalendar;