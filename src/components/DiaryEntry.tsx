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
    <Card className="card-gradient p-4 border-none shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-white font-semibold">
          {isEditable ? "Entrada del día" : "Registro guardado"}
        </h3>
        {isEditable && onEdit && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onEdit}
            className="text-white hover:text-white/80 hover:bg-white/10"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      </div>
      {entry.emotion && (
        <p className="text-gray-200 mb-2 flex items-center gap-2">
          <span>{entry.emotion.icon}</span>
          <span>{entry.emotion.name}</span>
        </p>
      )}
      {entry.words && entry.words.length > 0 && (
        <div className="mb-2">
          <p className="text-gray-200">Palabras:</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {entry.words.map((word) => (
              <span 
                key={word} 
                className="bg-white/20 text-white px-2 py-1 rounded-full text-sm"
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