
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
  const getEmotionColor = (id: number) => {
    if (id <= 2) return "bg-[#BE0712]"; // Rojo intenso - alta energía, baja satisfacción
    if (id <= 4) return "bg-[#FF6B35]"; // Naranja - energía media-alta, satisfacción media-baja
    if (id === 5) return "bg-[#B7C7C7]"; // Gris azulado - energía y satisfacción neutras
    if (id <= 7) return "bg-[#7DB249]"; // Verde medio - energía media, satisfacción media-alta
    return "bg-[#FFB563]"; // Amarillo cálido - alta energía, alta satisfacción
  };

  const formatEntryText = (text: string) => {
    const lines = text.split('\n');
    const transformedLines = lines.map(line => {
      if (line.toLowerCase().startsWith('me siento')) {
        return null;
      }
      return line;
    });
    return transformedLines.filter(line => line !== null);
  };

  return (
    <Card className="bg-[#1A1F2C]/90 backdrop-blur-lg border-0 shadow-xl p-6">
      <div className="flex justify-between items-start gap-4">
        {entry.emotion && (
          <div className="flex-shrink-0">
            <div className={`w-14 h-14 rounded-full ${getEmotionColor(entry.emotion.id)} shadow-lg`} />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="space-y-2">
            {formatEntryText(entry.text).map((line, index) => (
              line && <p key={index} className="text-white/90 leading-relaxed">{line}</p>
            ))}
          </div>

          {entry.words && entry.words.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {entry.words.map((word) => (
                <span 
                  key={word} 
                  className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-sm backdrop-blur-sm"
                >
                  {word}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-4 text-sm text-white/60 mt-4">
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
            className="text-white/60 hover:text-white hover:bg-white/10"
          >
            <Pencil className="h-5 w-5" />
          </Button>
        )}
      </div>

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
