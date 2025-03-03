
import { WorkDay } from "@/types/module";
import { Lock, CheckCircle, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface WorkDayCardProps extends WorkDay {
  isActive: boolean;
  onSelect: () => void;
}

export const WorkDayCard = ({
  day,
  title,
  description,
  color,
  status,
  isActive,
  onSelect
}: WorkDayCardProps) => {
  // Definir colores basados en la nueva paleta y el estado
  const getCardStyles = () => {
    if (status === 'locked') {
      return 'bg-[#1A1F2C]/80 border-gray-700/30 cursor-not-allowed';
    } else if (status === 'completed') {
      return `bg-[#1A1F2C]/90 border-[#9b87f5]/50 cursor-pointer hover:border-[#9b87f5]/80 hover:shadow-md hover:shadow-[#9b87f5]/10`;
    } else if (status === 'current') {
      return `bg-[#1A1F2C]/90 border-[#7E69AB]/70 cursor-pointer hover:border-[#7E69AB] hover:shadow-md hover:shadow-[#7E69AB]/20`;
    } else {
      return `bg-[#1A1F2C]/90 border-gray-700/50 cursor-pointer hover:border-gray-600 hover:shadow-md`;
    }
  };

  // Definir el badge basado en el estado
  const getStatusBadge = () => {
    if (status === 'locked') {
      return (
        <Badge className="bg-gray-700/70 text-gray-300 border-0 py-1 font-lato text-xs">
          Bloqueado
        </Badge>
      );
    } else if (status === 'completed') {
      return (
        <Badge className="bg-[#9b87f5]/20 text-[#9b87f5] border border-[#9b87f5]/30 py-1 font-lato text-xs">
          Completado
        </Badge>
      );
    } else if (status === 'current') {
      return (
        <Badge className="bg-[#7E69AB]/20 text-[#7E69AB] border border-[#7E69AB]/30 py-1 font-lato text-xs">
          En progreso
        </Badge>
      );
    }
    return null;
  };

  return (
    <div
      onClick={() => status !== 'locked' && onSelect()}
      className={`p-6 rounded-xl border transition-all duration-300 ${getCardStyles()} 
        transform hover:translate-y-[-2px] shadow-sm hover:shadow-lg`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className={`text-[#9b87f5] text-sm font-medium font-lato`}>
            Día {day}
          </span>
          <h3 className="text-xl font-semibold text-white font-oswald tracking-wide">{title}</h3>
        </div>
        
        <div className="flex items-center gap-2">
          {getStatusBadge()}
          
          {status === 'locked' ? (
            <Lock className="w-5 h-5 text-gray-500" />
          ) : status === 'completed' ? (
            <CheckCircle className="w-5 h-5 text-[#9b87f5]" />
          ) : status === 'current' ? (
            <ChevronRight className="w-5 h-5 text-[#7E69AB] animate-pulse" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </div>
      
      <p className="text-sm text-gray-300 font-lato mb-2 leading-relaxed">{description}</p>
      
      {status !== 'locked' && (
        <div className="flex gap-2 mt-4">
          <Badge 
            variant="outline" 
            className="bg-transparent border-gray-600 text-gray-400 text-xs font-lato"
          >
            Actividades: 3
          </Badge>
          <Badge 
            variant="outline" 
            className="bg-transparent border-gray-600 text-gray-400 text-xs font-lato"
          >
            Tiempo: 30 min
          </Badge>
        </div>
      )}
    </div>
  );
};
