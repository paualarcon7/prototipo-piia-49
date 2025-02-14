
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Pencil, MapPin, Clock } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

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
    location?: string;
    imageUrl?: string;
  };
  isEditable?: boolean;
  onEdit?: () => void;
}

const DiaryEntry = ({ entry, isEditable = true, onEdit }: DiaryEntryProps) => {
  return (
    <Card className="bg-[#1A1F2C]/90 backdrop-blur-lg border-0 shadow-xl p-6 hover:bg-[#1A1F2C]/95 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col gap-1">
          <div className="text-xl font-semibold text-white whitespace-pre-wrap">
            {entry.text}
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {format(new Date(), "h:mm a", { locale: es })}
            </span>
            {entry.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {entry.location}
              </span>
            )}
          </div>
        </div>
        {isEditable && onEdit && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onEdit}
            className="text-gray-400 hover:text-gray-300 hover:bg-white/10"
          >
            <Pencil className="h-5 w-5" />
          </Button>
        )}
      </div>

      {entry.words && entry.words.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {entry.words.map((word) => (
              <span 
                key={word} 
                className="bg-white/10 text-gray-300 px-3 py-1 rounded-xl text-sm"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      )}

      {entry.imageUrl && (
        <div className="mt-4 rounded-lg overflow-hidden">
          <img
            src={entry.imageUrl}
            alt=""
            className="w-full h-48 object-cover"
          />
        </div>
      )}
    </Card>
  );
};

export default DiaryEntry;
