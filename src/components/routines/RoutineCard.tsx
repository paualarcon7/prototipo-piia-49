
import { Clock, Calendar, ChevronRight, Bell } from "lucide-react";
import { Routine } from "@/types/rutina";
import { SyncStatusBadge } from "./SyncStatusBadge";
import { Badge } from "@/components/ui/badge";

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

  // Calculate total duration
  const calculateTotalDuration = () => {
    let totalMinutes = 0;
    
    routine.protocols.forEach(({ protocol }) => {
      const durationMatch = protocol.duration.match(/(\d+)/);
      if (durationMatch) {
        totalMinutes += parseInt(durationMatch[0], 10);
      }
    });
    
    if (totalMinutes >= 60) {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return `${hours}h ${minutes > 0 ? `${minutes}m` : ""}`;
    }
    
    return `${totalMinutes}m`;
  };

  return (
    <div 
      className={`
        p-4 rounded-lg bg-gradient-to-br from-[#1A1F2C]/50 to-[#1A1F2C]/30 backdrop-blur-sm 
        border border-[#1A1F2C]/20 flex items-center cursor-pointer hover:shadow-lg 
        transition-all duration-200 hover:translate-y-[-2px]
        ${!routine.isActive ? 'opacity-70' : ''}
      `}
      onClick={onClick}
    >
      <div 
        className="w-12 h-12 rounded-full flex items-center justify-center mr-4 transition-all duration-300"
        style={{ backgroundColor: routine.isActive ? `${routine.color}30` : 'rgba(2, 177, 187, 0.2)' }}
      >
        <Clock className="h-6 w-6" style={{ color: routine.isActive ? routine.color : '#02b1bb' }} />
      </div>
      
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-medium">{routine.name}</h3>
          {!routine.isActive && (
            <Badge variant="outline" className="text-xs bg-[#403E43]/50 text-[#C8C8C9] border-[#8A898C]">
              Inactiva
            </Badge>
          )}
        </div>
        
        <div className="flex items-center flex-wrap text-[#C8C8C9] text-sm mt-1 gap-x-2">
          <div className="flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1" />
            <span>{routine.time.start}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-3.5 w-3.5 mr-1" />
            <span>{formatDays(routine.days)}</span>
          </div>
          {routine.notification.enabled && (
            <div className="flex items-center">
              <Bell className="h-3.5 w-3.5 mr-1" />
              <span>{routine.notification.minutesBefore}m</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <SyncStatusBadge status={routine.syncStatus} />
          {routine.protocols.length > 0 ? (
            <Badge className="text-xs bg-[#1A1F2C]/70 text-white">
              {routine.protocols.length} {routine.protocols.length === 1 ? 'protocolo' : 'protocolos'} ({calculateTotalDuration()})
            </Badge>
          ) : (
            <Badge variant="outline" className="text-xs border-[#8A898C] text-[#C8C8C9]">
              Sin protocolos
            </Badge>
          )}
        </div>
      </div>
      
      <ChevronRight className="h-5 w-5 text-[#8A898C]" />
    </div>
  );
};
