
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
            className="bg-secondary/50 backdrop-blur-sm border-secondary/20 p-4 cursor-pointer hover:bg-secondary/60 transition-colors"
            onClick={() => onEntryClick(entry)}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                {entry.emotion && (
                  <span className={`${entry.emotion.color} w-8 h-8 rounded-xl flex items-center justify-center`}>
                    {entry.emotion.icon}
                  </span>
                )}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">
                    {entry.text.split('\n').map((line, index) => (
                      <div key={index} className="whitespace-pre-wrap">{line}</div>
                    ))}
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
              </div>
              {entry.imageUrl && (
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
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
