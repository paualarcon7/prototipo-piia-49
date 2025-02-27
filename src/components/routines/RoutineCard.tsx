
import { Clock, Calendar, ChevronRight } from "lucide-react";
import { Routine } from "@/types/rutina";
import { SyncStatusBadge } from "./SyncStatusBadge";

interface RoutineCardProps {
  routine: Routine;
  onClick: () => void;
}

export const RoutineCard = ({ routine, onClick }: RoutineCardProps) => {
  // Convert day codes to label
  const formatDays = (days: string[]) => {
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
    
    return days.join(", ");
  };

  return (
    <div 
      className="p-4 rounded-lg bg-gradient-to-br from-secondary/50 to-secondary/30 backdrop-blur-sm border border-secondary/20 flex items-center cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={onClick}
    >
      <div 
        className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
        style={{ backgroundColor: `${routine.color}30` }}
      >
        <Clock className="h-6 w-6" style={{ color: routine.color }} />
      </div>
      
      <div className="flex-1">
        <h3 className="text-white font-medium">{routine.name}</h3>
        
        <div className="flex items-center text-gray-400 text-sm mt-1">
          <Clock className="h-3.5 w-3.5 mr-1" />
          <span className="mr-2">{routine.time.start} - {routine.time.end}</span>
          <Calendar className="h-3.5 w-3.5 mr-1" />
          <span>{formatDays(routine.days)}</span>
        </div>
        
        <div className="flex items-center gap-2 mt-2">
          <SyncStatusBadge status={routine.syncStatus} />
          <span className="text-xs text-gray-400 bg-gray-800/50 px-2 py-0.5 rounded-full">
            {routine.protocols.length} {routine.protocols.length === 1 ? 'protocolo' : 'protocolos'}
          </span>
        </div>
      </div>
      
      <ChevronRight className="h-5 w-5 text-gray-400" />
    </div>
  );
};
