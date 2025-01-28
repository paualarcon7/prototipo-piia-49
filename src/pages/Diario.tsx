import { useState, useRef } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, SmilePlus, Calendar as CalendarIcon, Mic, Square } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import EmotionSelector from "@/components/EmotionSelector";
import EmotionWords from "@/components/EmotionWords";
import { useToast } from "@/hooks/use-toast";

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

const Diario = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [entries, setEntries] = useState<{[key: string]: DiaryEntry}>({});
  const [currentEntry, setCurrentEntry] = useState("");
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();

  const handleSaveEntry = () => {
    if (!date) return;
    
    const dateKey = date.toISOString().split('T')[0];
    setEntries(prev => ({
      ...prev,
      [dateKey]: {
        text: currentEntry,
        emotion: selectedEmotion || undefined,
        words: selectedWords,
        date: dateKey
      }
    }));
    
    setCurrentEntry("");
    setSelectedEmotion(null);
    setSelectedWords([]);
    
    toast({
      title: "Entrada guardada",
      description: "Tu registro del día ha sido guardado exitosamente.",
    });
  };

  const handleWordSelect = (word: string) => {
    setSelectedWords(prev => 
      prev.includes(word) 
        ? prev.filter(w => w !== word)
        : [...prev, word]
    );
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        if (date) {
          const dateKey = date.toISOString().split('T')[0];
          setEntries(prev => ({
            ...prev,
            [dateKey]: {
              ...prev[dateKey],
              audioUrl
            }
          }));
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        title: "Error",
        description: "No se pudo acceder al micrófono.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast({
        title: "Audio grabado",
        description: "La grabación de audio ha sido guardada.",
      });
    }
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

      <EmotionSelector 
        onSelect={setSelectedEmotion}
        selectedEmotion={selectedEmotion}
      />

      <EmotionWords
        emotionName={selectedEmotion?.name || null}
        onSelectWord={handleWordSelect}
        selectedWords={selectedWords}
      />

      <Card className="bg-secondary/50 backdrop-blur-sm border-secondary/20 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <SmilePlus className="w-6 h-6 text-purple-500" />
            <h2 className="text-lg font-semibold text-white">
              {date?.toLocaleDateString('es-ES', { 
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={isRecording ? "text-red-500 animate-pulse" : "text-purple-500"}
            onClick={isRecording ? stopRecording : startRecording}
          >
            {isRecording ? <Square className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
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
          {entries[date.toISOString().split('T')[0]].emotion && (
            <p className="text-gray-300 mb-2">
              Emoción: {entries[date.toISOString().split('T')[0]].emotion?.name}
            </p>
          )}
          {entries[date.toISOString().split('T')[0]].words.length > 0 && (
            <div className="mb-2">
              <p className="text-gray-300">Palabras:</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {entries[date.toISOString().split('T')[0]].words.map((word) => (
                  <span key={word} className="bg-purple-500/20 text-purple-200 px-2 py-1 rounded-full text-sm">
                    {word}
                  </span>
                ))}
              </div>
            </div>
          )}
          <p className="text-gray-300 whitespace-pre-wrap">
            {entries[date.toISOString().split('T')[0]].text}
          </p>
          {entries[date.toISOString().split('T')[0]].audioUrl && (
            <div className="mt-4">
              <audio
                controls
                src={entries[date.toISOString().split('T')[0]].audioUrl}
                className="w-full"
              />
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default Diario;