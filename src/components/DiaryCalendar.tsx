import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, ArrowLeft, ArrowRight } from "lucide-react";
import DiaryEntry from "./DiaryEntry";

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
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

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

          <div className="flex justify-between items-center mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-xl">
              {currentMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDayClick}
            month={currentMonth}
            onMonthChange={setCurrentMonth}
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