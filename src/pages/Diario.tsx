import { useState } from "react";
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
  date: string;
};

const Diario = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [entries, setEntries] = useState<{[key: string]: DiaryEntry}>({});
  const [currentEntry, setCurrentEntry] = useState("");
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
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
    setIsEditing(false);
    
    toast({
      title: "Entrada guardada",
      description: "Tu registro del día ha sido guardado exitosamente.",
    });
  };

  const handleEditEntry = () => {
    if (!date) return;
    const dateKey = date.toISOString().split('T')[0];
    const entry = entries[dateKey];
    if (entry) {
      setCurrentEntry(entry.text);
      setSelectedEmotion(entry.emotion || null);
      setSelectedWords(entry.words);
      setIsEditing(true);
    }
  };

  const handleWordSelect = (word: string) => {
    setSelectedWords(prev => 
      prev.includes(word) 
        ? prev.filter(w => w !== word)
        : [...prev, word]
    );
  };

  const isCurrentDate = (dateToCheck: Date | undefined) => {
    if (!dateToCheck) return false;
    const today = new Date();
    return (
      dateToCheck.getDate() === today.getDate() &&
      dateToCheck.getMonth() === today.getMonth() &&
      dateToCheck.getFullYear() === today.getFullYear()
    );
  };

  const currentDateKey = date?.toISOString().split('T')[0];
  const currentDateEntry = currentDateKey ? entries[currentDateKey] : undefined;
  const showCalendar = !selectedEmotion || (currentDateEntry && !isEditing);

  return (
    <div className="flex flex-col min-h-screen pb-20 p-4 space-y-4">
      {isCurrentDate(date) && (
        <EmotionSelector 
          onSelect={setSelectedEmotion}
          selectedEmotion={selectedEmotion}
        />
      )}

      {selectedEmotion && isCurrentDate(date) && (
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
            date={date}
          />
        </>
      )}

      {currentDateEntry && !isEditing && (
        <DiaryEntry 
          entry={currentDateEntry}
          isEditable={isCurrentDate(date)}
          onEdit={handleEditEntry}
        />
      )}

      {showCalendar && (
        <DiaryCalendar
          date={date}
          onSelectDate={setDate}
          entries={entries}
        />
      )}
    </div>
  );
};

export default Diario;