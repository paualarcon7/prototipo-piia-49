import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import DiaryCalendar from "@/components/DiaryCalendar";
import DiaryEntryList from "@/components/DiaryEntryList";
import NewDiaryEntry from "@/components/NewDiaryEntry";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type Emotion = {
  id: number;
  name: string;
  color: string;
  icon: string;
};

type DiaryEntry = {
  id: string;
  text: string;
  emotion?: Emotion;
  words: string[];
  imageUrl?: string;
  location?: string;
  createdAt: Date;
  date: string;
};

const Diario = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [entries, setEntries] = useState<{[key: string]: DiaryEntry[]}>({});
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const handleSaveEntry = (newEntry: {
    text: string;
    emotion?: Emotion;
    words: string[];
    imageUrl?: string;
  }) => {
    if (!date) return;
    
    const dateKey = date.toISOString().split('T')[0];
    const entry: DiaryEntry = {
      id: crypto.randomUUID(),
      ...newEntry,
      createdAt: new Date(),
      date: dateKey,
    };
    
    setEntries(prev => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), entry],
    }));
    
    setIsCreating(false);
    
    toast({
      title: "Entrada guardada",
      description: "Tu registro ha sido guardado exitosamente.",
    });
  };

  const handleEntryClick = (entry: DiaryEntry) => {
    // Aquí iría la lógica para ver/editar una entrada existente
    console.log("Entry clicked:", entry);
  };

  const currentDateKey = date?.toISOString().split('T')[0];
  const currentEntries = currentDateKey ? entries[currentDateKey] || [] : [];

  return (
    <div className="flex flex-col min-h-screen pb-20 p-4 space-y-4">
      {isCreating ? (
        <NewDiaryEntry
          onSave={handleSaveEntry}
          onCancel={() => setIsCreating(false)}
        />
      ) : (
        <>
          <DiaryEntryList
            entries={currentEntries}
            onEntryClick={handleEntryClick}
          />

          <Button
            className="fixed bottom-20 right-4 w-14 h-14 rounded-full shadow-lg bg-blue-500 hover:bg-blue-600"
            onClick={() => setIsCreating(true)}
          >
            <Plus className="w-6 h-6" />
          </Button>

          <DiaryCalendar
            date={date}
            onSelectDate={setDate}
            entries={Object.fromEntries(
              Object.entries(entries).map(([key, dayEntries]) => [
                key,
                dayEntries[0], // Usamos la primera entrada del día para mantener compatibilidad
              ])
            )}
          />
        </>
      )}
    </div>
  );
};

export default Diario;
