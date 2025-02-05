import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import DiaryCalendar from "@/components/DiaryCalendar";
import DiaryEntryList from "@/components/DiaryEntryList";
import NewDiaryEntry from "@/components/NewDiaryEntry";
import EmotionSelector from "@/components/EmotionSelector";
import EmotionWords from "@/components/EmotionWords";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

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
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
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
      emotion: selectedEmotion || undefined,
      words: selectedWords,
      createdAt: new Date(),
      date: dateKey,
    };
    
    setEntries(prev => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), entry],
    }));
    
    setSelectedEmotion(null);
    setSelectedWords([]);
    
    toast({
      title: "Entrada guardada",
      description: "Tu registro ha sido guardado exitosamente.",
    });
  };

  const handleEntryClick = (entry: DiaryEntry) => {
    console.log("Entry clicked:", entry);
  };

  const currentDateKey = date?.toISOString().split('T')[0];
  const currentEntries = currentDateKey ? entries[currentDateKey] || [] : [];

  return (
    <div className="flex flex-col min-h-screen pb-20 p-4 pt-16 space-y-4 bg-gradient-to-b from-black/90 to-black/70">
      <Tabs defaultValue="today" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-black/50 backdrop-blur-sm rounded-xl p-1">
          <TabsTrigger value="today" className="data-[state=active]:bg-white/10">Lista</TabsTrigger>
          <TabsTrigger value="calendar" className="data-[state=active]:bg-white/10">Calendario</TabsTrigger>
          <TabsTrigger value="attachments" className="data-[state=active]:bg-white/10">Adjuntos</TabsTrigger>
          <TabsTrigger value="map" className="data-[state=active]:bg-white/10">Mapa</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4 mt-4">
          <Card className="p-6 bg-black/40 backdrop-blur-lg border-0 shadow-xl">
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

          {(selectedEmotion || currentEntries.length > 0) && (
            <NewDiaryEntry
              onSave={handleSaveEntry}
              onCancel={() => {
                setSelectedEmotion(null);
                setSelectedWords([]);
              }}
              preselectedEmotion={selectedEmotion}
            />
          )}

          <DiaryEntryList
            entries={currentEntries}
            onEntryClick={handleEntryClick}
          />
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