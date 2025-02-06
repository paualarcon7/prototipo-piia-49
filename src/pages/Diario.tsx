
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import DiaryCalendar from "@/components/DiaryCalendar";
import EmotionSelector from "@/components/EmotionSelector";
import EmotionWords from "@/components/EmotionWords";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import DiaryEntryList from "@/components/DiaryEntryList";

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
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [entries, setEntries] = useState<{[key: string]: DiaryEntry[]}>({
    // Ejemplo de entrada para pruebas
    [new Date().toISOString().split('T')[0]]: [
      {
        id: "1",
        text: "Mi primera entrada del día",
        createdAt: new Date(),
        date: new Date().toISOString().split('T')[0],
        words: [],
      }
    ]
  });
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const { toast } = useToast();

  const currentDateKey = date?.toISOString().split('T')[0];
  const currentEntries = currentDateKey ? entries[currentDateKey] || [] : [];

  const handleEntryClick = (entry: DiaryEntry) => {
    // Por ahora solo mostraremos un toast, pero aquí podrías navegar a una vista detallada
    toast({
      title: "Entrada seleccionada",
      description: entry.text.substring(0, 50) + "...",
    });
  };

  return (
    <div className="flex flex-col min-h-screen pb-20 p-4 pt-16 space-y-4">
      <Tabs defaultValue="today" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-secondary/50 backdrop-blur-sm">
          <TabsTrigger value="today">Hoy</TabsTrigger>
          <TabsTrigger value="calendar">Calendario</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4 mt-4">
          <Card className="p-6 bg-white/10 backdrop-blur-lg border-0 shadow-xl">
            <EmotionSelector 
              onSelect={setSelectedEmotion} 
              selectedEmotion={selectedEmotion}
            />

            {selectedEmotion && (
              <EmotionWords
                emotionName={selectedEmotion.name}
                onSelectWord={(word) => {
                  setSelectedWords(prev =>
                    prev.includes(word)
                      ? prev.filter(w => w !== word)
                      : [...prev, word]
                  );
                }}
                selectedWords={selectedWords}
              />
            )}
          </Card>

          {currentEntries.length > 0 && (
            <DiaryEntryList 
              entries={currentEntries}
              onEntryClick={handleEntryClick}
            />
          )}
          
          <Button
            onClick={() => navigate('/diario/nueva')}
            className="fixed bottom-24 right-4 h-14 w-14 rounded-full shadow-lg bg-purple-500 hover:bg-purple-600"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </TabsContent>

        <TabsContent value="calendar" className="mt-4">
          <DiaryCalendar
            date={date}
            onSelectDate={setDate}
            entries={Object.fromEntries(
              Object.entries(entries).map(([key, dayEntries]) => [
                key,
                dayEntries[0],
              ])
            )}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Diario;
