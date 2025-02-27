
import { Calendar as CalendarIcon } from "lucide-react";
import { WeekDay } from "@/types/rutina";

interface CalendarPreviewProps {
  routineName: string;
  startTime: string;
  endTime: string;
  days: WeekDay[];
}

export const CalendarPreview = ({
  routineName,
  startTime,
  endTime,
  days
}: CalendarPreviewProps) => {
  // Format days for display
  const formatDays = (days: WeekDay[]) => {
    const dayMap: Record<WeekDay, string> = {
      "L": "Lunes",
      "M": "Martes",
      "X": "Miércoles",
      "J": "Jueves",
      "V": "Viernes",
      "S": "Sábado",
      "D": "Domingo"
    };
    
    if (days.length === 7) return "Todos los días";
    if (days.length === 5 && 
        days.includes("L") && 
        days.includes("M") && 
        days.includes("X") && 
        days.includes("J") && 
        days.includes("V")) {
      return "Lunes a viernes";
    }
    if (days.length === 2 && 
        days.includes("S") && 
        days.includes("D")) {
      return "Fines de semana";
    }
    
    return days.map(d => dayMap[d]).join(", ");
  };

  return (
    <div className="bg-secondary/50 border border-secondary/30 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-[#FF4081]/10 rounded-lg">
          <CalendarIcon className="h-5 w-5 text-[#FF4081]" />
        </div>
        
        <div className="flex-1">
          <div className="px-3 py-2 bg-secondary/70 rounded-lg mb-2">
            <h4 className="text-sm font-semibold text-white">{routineName}</h4>
            <p className="text-xs text-gray-400 mt-1">
              {startTime} - {endTime}
            </p>
          </div>
          
          <div className="bg-secondary/70 rounded-lg p-3">
            <h5 className="text-xs text-gray-400 mb-1">Repetir</h5>
            <p className="text-sm text-white">{formatDays(days)}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-[#4285F4] mr-1"></span>
          <span className="text-xs text-gray-400">Google Calendar</span>
        </div>
        <button className="text-xs text-[#FF4081]">
          Personalizar
        </button>
      </div>
    </div>
  );
};
