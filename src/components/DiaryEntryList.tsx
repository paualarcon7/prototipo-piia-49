import { useState } from "react";
import { Card } from "./ui/card";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Image as ImageIcon, MapPin, Clock } from "lucide-react";

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
};

interface DiaryEntryListProps {
  entries: DiaryEntryItem[];
  onEntryClick: (entry: DiaryEntryItem) => void;
}

const DiaryEntryList = ({ entries, onEntryClick }: DiaryEntryListProps) => {
  const [selectedDate] = useState(new Date());

  const formattedDate = format(selectedDate, "MMMM 'de' yyyy", { locale: es });

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white mb-6">{formattedDate}</h2>
      <div className="space-y-4">
        {entries.map((entry) => (
          <Card
            key={entry.id}
            className="bg-black/40 backdrop-blur-sm border-0 p-4 cursor-pointer hover:bg-black/50 transition-colors"
            onClick={() => onEntryClick(entry)}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white line-clamp-1">
                  {entry.text.split('\n')[0]}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-400 mt-2">
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
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 ml-4">
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