
import { useState } from "react";
import { Card } from "./ui/card";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { MapPin, Clock, Zap, Heart } from "lucide-react";

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
  words?: string[];  // Agregamos la propiedad words como opcional
};

interface DiaryEntryListProps {
  entries: DiaryEntryItem[];
  onEntryClick: (entry: DiaryEntryItem) => void;
}

const DiaryEntryList = ({ entries, onEntryClick }: DiaryEntryListProps) => {
  const [selectedDate] = useState(new Date());

  const formattedDate = format(selectedDate, "MMMM 'de' yyyy", { locale: es });

  const getEmotionColor = (id: number) => {
    if (id <= 2) return "from-red-500/20 to-red-600/20";
    if (id <= 4) return "from-orange-500/20 to-orange-600/20";
    if (id === 5) return "from-yellow-500/20 to-yellow-600/20";
    if (id <= 7) return "from-green-500/20 to-green-600/20";
    return "from-purple-500/20 to-purple-600/20";
  };

  const formatEntryText = (text: string) => {
    const lines = text.split('\n');
    const transformedLines = lines.map(line => {
      if (line.startsWith('⚡')) {
        return `⚡ ${line.replace('⚡', '')}`;  // Mantenemos el rayo al principio
      }
      // Eliminar el emoji de satisfacción si la línea lo contiene
      if (line.match(/^[😠🙁😕😞😐🙂😊😄😁🥰]/)) {
        return line.slice(2);
      }
      return line;
    });
    return transformedLines;
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
                  <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-2xl">
                    {entry.emotion.icon}
                  </div>
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
