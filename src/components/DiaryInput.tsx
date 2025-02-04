import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Pencil, SmilePlus, Mic, Square } from "lucide-react";
import DiaryPromptMenu from "./DiaryPromptMenu";

interface DiaryInputProps {
  currentEntry: string;
  onEntryChange: (text: string) => void;
  onSave: () => void;
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  date: Date | undefined;
}

const DiaryInput = ({
  currentEntry,
  onEntryChange,
  onSave,
  isRecording,
  onStartRecording,
  onStopRecording,
  date,
}: DiaryInputProps) => {
  const handlePromptSelect = (prompt: string) => {
    const newText = currentEntry
      ? `${currentEntry}\n\n${prompt}\n`
      : `${prompt}\n`;
    onEntryChange(newText);
  };

  return (
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
          onClick={isRecording ? onStopRecording : onStartRecording}
        >
          {isRecording ? <Square className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
        </Button>
      </div>

      <div className="relative">
        <DiaryPromptMenu onSelectPrompt={handlePromptSelect} />
        <Textarea
          value={currentEntry}
          onChange={(e) => onEntryChange(e.target.value)}
          placeholder="¿Cómo te sientes hoy?"
          className="min-h-[150px] bg-secondary/30 border-secondary/20 text-white placeholder:text-gray-400 pl-10"
        />
      </div>

      <div className="flex justify-end mt-4">
        <Button 
          onClick={onSave}
          className="bg-purple-500 hover:bg-purple-600"
        >
          <Pencil className="w-4 h-4 mr-2" />
          Guardar
        </Button>
      </div>
    </Card>
  );
};

export default DiaryInput;