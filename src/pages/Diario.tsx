import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, SmilePlus, Calendar as CalendarIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Diario = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [entries, setEntries] = useState<{[key: string]: string}>({});
  const [currentEntry, setCurrentEntry] = useState("");

  const handleSaveEntry = () => {
    if (!date || !currentEntry.trim()) return;
    
    const dateKey = date.toISOString().split('T')[0];
    setEntries(prev => ({
      ...prev,
      [dateKey]: currentEntry
    }));
    setCurrentEntry("");
  };

  const hasEntryForDate = (date: Date) => {
    const dateKey = date.toISOString().split('T')[0];
    return !!entries[dateKey];
  };

  return (
    <div className="flex flex-col min-h-screen pb-20 p-4 space-y-4">
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
                onSelect={setDate}
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

      <Card className="bg-secondary/50 backdrop-blur-sm border-secondary/20 p-4">
        <div className="flex items-center gap-2 mb-4">
          <SmilePlus className="w-6 h-6 text-purple-500" />
          <h2 className="text-lg font-semibold text-white">
            {date?.toLocaleDateString('es-ES', { 
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </h2>
        </div>

        <Textarea
          value={currentEntry}
          onChange={(e) => setCurrentEntry(e.target.value)}
          placeholder="¿Cómo te sientes hoy?"
          className="min-h-[150px] bg-secondary/30 border-secondary/20 text-white placeholder:text-gray-400"
        />

        <div className="flex justify-end mt-4">
          <Button 
            onClick={handleSaveEntry}
            className="bg-purple-500 hover:bg-purple-600"
          >
            <Pencil className="w-4 h-4 mr-2" />
            Guardar
          </Button>
        </div>
      </Card>

      {date && entries[date.toISOString().split('T')[0]] && (
        <Card className="bg-secondary/50 backdrop-blur-sm border-secondary/20 p-4">
          <h3 className="text-white font-semibold mb-2">Entrada del día</h3>
          <p className="text-gray-300 whitespace-pre-wrap">
            {entries[date.toISOString().split('T')[0]]}
          </p>
        </Card>
      )}
    </div>
  );
};

export default Diario;