import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import DiaryCalendar from "@/components/DiaryCalendar";
import EmotionSelector from "@/components/EmotionSelector";
import EmotionWords from "@/components/EmotionWords";
import DiaryInput from "@/components/DiaryInput";
import DiaryEntry from "@/components/DiaryEntry";

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
    if (!date || !selectedEmotion) return;
    
    const dateKey = date.toISOString().split('T')[0];
    setEntries(prev => ({
      ...prev,
      [dateKey]: {
        text: currentEntry,
        emotion: selectedEmotion,
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

  const currentDateKey = date?.toISOString().split('T')[0];
  const currentDateEntry = currentDateKey ? entries[currentDateKey] : undefined;

  return (
    <div className="flex flex-col min-h-screen pb-20 p-4 space-y-4">
      <DiaryCalendar
        date={date}
        onSelectDate={setDate}
        hasEntryForDate={hasEntryForDate}
      />

      <EmotionSelector 
        onSelect={setSelectedEmotion}
        selectedEmotion={selectedEmotion}
      />

      {selectedEmotion && (
        <>
          <EmotionWords
            emotionName={selectedEmotion?.name || null}
            onSelectWord={handleWordSelect}
            selectedWords={selectedWords}
          />

          <DiaryInput
            currentEntry={currentEntry}
            onEntryChange={setCurrentEntry}
            onSave={handleSaveEntry}
            isRecording={isRecording}
            onStartRecording={startRecording}
            onStopRecording={stopRecording}
            date={date}
          />
        </>
      )}

      {currentDateEntry && <DiaryEntry entry={currentDateEntry} />}
    </div>
  );
};

export default Diario;