import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import DiaryCalendar from "@/components/DiaryCalendar";
import EmotionSelector from "@/components/EmotionSelector";
import EmotionWords from "@/components/EmotionWords";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
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
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [entries, setEntries] = useState<{[key: string]: DiaryEntry[]}>({});
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const { toast } = useToast();

  const currentDateKey = date?.toISOString().split('T')[0];
  const currentEntries = currentDateKey ? entries[currentDateKey] || [] : [];

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

      <Button
        className="fixed bottom-20 right-4 rounded-full w-12 h-12 shadow-lg"
        onClick={() => navigate("/nueva-entrada")}
      >
        <Plus className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default Diario;