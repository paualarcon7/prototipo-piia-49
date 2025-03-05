
import { Clock, Calendar } from "lucide-react";
import { Routine } from "@/types/rutina";
import { formatDayList } from "@/components/routines/utils/protocolUtils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Edit } from "lucide-react";

interface RoutineInfoCardProps {
  routine: Routine;
  onEditClick: () => void;
}

export const RoutineInfoCard = ({ routine, onEditClick }: RoutineInfoCardProps) => {
  return (
    <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold text-white font-oswald">{routine.name}</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={onEditClick}
                  className="h-8 w-8 p-0 text-brand-teal hover:bg-brand-teal/20 rounded-full"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Editar rutina</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div 
          className="w-4 h-4 rounded-full" 
          style={{ backgroundColor: routine.color }}
        />
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center text-sm text-gray-300">
          <Clock className="h-4 w-4 mr-2 text-brand-teal" />
          <span>{routine.time.start} - {routine.time.end}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-300">
          <Calendar className="h-4 w-4 mr-2 text-brand-teal" />
          <span>{formatDayList(routine.days)}</span>
        </div>
        
        <div className="mt-4">
          <p className="text-xs text-gray-400">
            {routine.protocols.length} {routine.protocols.length === 1 ? 'protocolo' : 'protocolos'}
          </p>
        </div>
      </div>
    </div>
  );
};
