
import { Clock, Calendar, Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SyncStatusBadge } from "@/components/routines/SyncStatusBadge";
import { Routine, WeekDay } from "@/types/rutina";
import { calculateTotalDuration } from "@/components/routines/utils/protocolUtils";

interface RoutineInfoCardProps {
  routine: Routine;
}

export const RoutineInfoCard = ({ routine }: RoutineInfoCardProps) => {
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
    <div className="bg-gradient-to-br from-[#1A1F2C]/50 to-[#1A1F2C]/30 backdrop-blur-sm border border-[#1A1F2C]/20 rounded-lg p-5 mb-6">
      <h2 className="text-xl font-semibold text-white mb-3">{routine.name}</h2>
      
      <div className="space-y-3">
        <div className="flex items-center text-[#C8C8C9]">
          <Clock className="h-4 w-4 mr-2 text-[#02b1bb]" />
          <span>{routine.time.start} - {routine.time.end}</span>
        </div>
        
        <div className="flex items-center text-[#C8C8C9]">
          <Calendar className="h-4 w-4 mr-2 text-[#02b1bb]" />
          <span>{formatDays(routine.days)}</span>
        </div>
        
        <div className="flex items-center text-[#C8C8C9]">
          <Bell className="h-4 w-4 mr-2 text-[#02b1bb]" />
          <span>
            {routine.notification.enabled 
              ? `${routine.notification.minutesBefore} minutos antes` 
              : "Notificaciones desactivadas"}
          </span>
        </div>
        
        <div className="flex items-center mt-4">
          <SyncStatusBadge status={routine.syncStatus} />
          {routine.protocols.length > 0 && (
            <Badge className="ml-2 bg-[#1A1F2C]/70 text-white">
              Duración total: {calculateTotalDuration(routine.protocols)}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};
