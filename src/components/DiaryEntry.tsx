import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Pencil } from "lucide-react";

type Emotion = {
  id: number;
  name: string;
  color: string;
  icon: string;
};

interface DiaryEntryProps {
  entry: {
    text: string;
    emotion?: Emotion;
    words: string[];
    audioUrl?: string;
  };
  isEditable?: boolean;
  onEdit?: () => void;
}

const DiaryEntry = ({ entry, isEditable = true, onEdit }: DiaryEntryProps) => {
  return (
    <Card className="bg-white/10 backdrop-blur-lg border-0 shadow-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-white">
          {isEditable ? "Entrada del día" : "Registro guardado"}
        </h3>
        {isEditable && onEdit && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onEdit}
            className="text-purple-400 hover:text-purple-300 hover:bg-purple-400/20"
          >
            <Pencil className="h-5 w-5" />
          </Button>
        )}
      </div>
      {entry.emotion && (
        <p className="text-gray-200 mb-4 flex items-center gap-2 text-lg">
          <span className={`${entry.emotion.color} w-8 h-8 rounded-xl flex items-center justify-center`}>
            {entry.emotion.icon}
          </span>
          <span>{entry.emotion.name}</span>
        </p>
      )}
      {entry.words && entry.words.length > 0 && (
        <div className="mb-4">
          <p className="text-gray-300 mb-2">Palabras:</p>
          <div className="flex flex-wrap gap-2">
            {entry.words.map((word) => (
              <span 
                key={word} 
                className="bg-purple-400/20 text-purple-200 px-3 py-1 rounded-xl text-sm font-medium"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      )}
      <p className="text-gray-200 whitespace-pre-wrap">
        {entry.text}
      </p>
      {entry.audioUrl && (
        <div className="mt-4">
          <audio
            controls
            src={entry.audioUrl}
            className="w-full"
          />
        </div>
      )}
    </Card>
  );
};

export default DiaryEntry;