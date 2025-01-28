import { Calendar } from "@/components/ui/calendar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Calendar as CalendarIcon } from "lucide-react";

interface DiaryCalendarProps {
  date: Date | undefined;
  onSelectDate: (date: Date | undefined) => void;
  hasEntryForDate: (date: Date) => boolean;
}

const DiaryCalendar = ({ date, onSelectDate, hasEntryForDate }: DiaryCalendarProps) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="calendar">
        <AccordionTrigger className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5" />
          <span>Calendario</span>
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex justify-center pt-2">
            <Calendar
              mode="single"
              selected={date}
              onSelect={onSelectDate}
              className="rounded-lg border bg-secondary/50 backdrop-blur-sm border-secondary/20"
              modifiers={{
                booked: (date) => hasEntryForDate(date),
              }}
              modifiersStyles={{
                booked: {
                  backgroundColor: "rgba(168, 85, 247, 0.4)",
                  color: "white",
                }
              }}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default DiaryCalendar;