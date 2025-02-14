
import { useState } from "react";
import { Card } from "./ui/card";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { MapPin, Clock } from "lucide-react";

type DiaryEntryItem = {
  id: string;
  text: string;
  emotion?: {
    id: number;
    name: string;
    color: string;
    icon: string;
  };
  location?: string;
  imageUrl?: string;
  createdAt: Date;
  words?: string[];
};

interface DiaryEntryListProps {
  entries: DiaryEntryItem[];
  onEntryClick: (entry: DiaryEntryItem) => void;
}

const DiaryEntryList = ({ entries, onEntryClick }: DiaryEntryListProps) => {
  const [selectedDate] = useState(new Date());

  const formattedDate = format(selectedDate, "MMMM 'de' yyyy", { locale: es });

  const getEmotionColor = (id: number) => {
    if (id <= 2) return "bg-[#BE0712]"; // Rojo intenso - alta energía, baja satisfacción
    if (id <= 4) return "bg-[#FF6B35]"; // Naranja - energía media-alta, satisfacción media-baja
    if (id === 5) return "bg-[#B7C7C7]"; // Gris azulado - energía y satisfacción neutras
    if (id <= 7) return "bg-[#7DB249]"; // Verde medio - energía media, satisfacción media-alta
    return "bg-[#FFB563]"; // Amarillo cálido - alta energía, alta satisfacción
  };

  const formatEntryText = (text: string) => {
    const lines = text.split('\n');
    return lines
      .filter(line => {
        const normalizedLine = line.toLowerCase().trim();
        return !normalizedLine.startsWith('me siento:') && 
               !normalizedLine.startsWith('me siento ') && 
               line.trim() !== '';
      });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white mb-6">{formattedDate}</h2>
      <div className="space-y-4">
        {entries.map((entry) => (
          <Card
            key={entry.id}
            className="bg-[#1A1F2C]/90 backdrop-blur-sm border-0 p-4 cursor-pointer hover:bg-[#1A1F2C]/95 transition-all duration-200 shadow-lg"
            onClick={() => onEntryClick(entry)}
          >
            <div className="flex justify-between items-start gap-4">
              {entry.emotion && (
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 rounded-full ${getEmotionColor(entry.emotion.id)} shadow-lg`} />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="space-y-2">
                  {formatEntryText(entry.text).map((line, index) => (
                    line && <p key={index} className="text-white/90 leading-relaxed">{line}</p>
                  ))}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {entry.words?.map((word) => (
                      <span 
                        key={word} 
                        className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-sm backdrop-blur-sm"
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-white/60 mt-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {format(entry.createdAt, "h:mm a")}
                  </span>
                  {entry.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {entry.location}
                    </span>
                  )}
                </div>
              </div>
              {entry.imageUrl && (
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={entry.imageUrl}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DiaryEntryList;
