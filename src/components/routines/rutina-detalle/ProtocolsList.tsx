
import { useNavigate } from "react-router-dom";
import { PlayCircle, Calendar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RoutineProtocol } from "@/types/rutina";

interface ProtocolsListProps {
  protocols: RoutineProtocol[];
  routineColor: string;
  onEditMode: () => void;
}

export const ProtocolsList = ({ protocols, routineColor, onEditMode }: ProtocolsListProps) => {
  const navigate = useNavigate();
  
  if (protocols.length === 0) {
    return (
      <div className="text-center py-8 bg-[#1A1F2C]/30 rounded-lg border border-[#1A1F2C]/20 backdrop-blur-sm">
        <Calendar className="h-12 w-12 mx-auto text-[#8A898C] mb-3" />
        <h3 className="text-white font-medium mb-2">No hay protocolos</h3>
        <p className="text-[#C8C8C9] text-sm mb-4 max-w-xs mx-auto">
          Esta rutina no tiene protocolos. Añade protocolos para comenzar a organizar tu tiempo.
        </p>
        <Button 
          variant="outline" 
          className="border-dashed border-[#8A898C] text-[#C8C8C9]"
          onClick={onEditMode}
        >
          <Plus className="h-4 w-4 mr-2" />
          Añadir protocolos
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-3">
      {protocols.map((item, index) => (
        <div
          key={`${item.protocol.id}-${index}`}
          className="p-4 rounded-md bg-[#1A1F2C]/40 border border-[#1A1F2C]/20 flex items-center"
        >
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
            style={{ backgroundColor: `${routineColor}30` }}
          >
            <span className="text-sm font-medium text-[#02b1bb]">{index + 1}</span>
          </div>
          <div className="flex-1">
            <h4 className="text-white text-sm font-medium line-clamp-1">
              {item.protocol.title}
            </h4>
            <div className="flex items-center mt-1">
              <span className="text-xs text-[#C8C8C9] bg-[#1A1F2C]/70 px-2 py-0.5 rounded-full mr-2">
                {item.protocol.dimension}
              </span>
              <span className="text-xs text-[#C8C8C9]">
                {item.protocol.duration}
              </span>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white"
            onClick={() => navigate(`/protocolos/${item.protocol.id}`)}
          >
            <PlayCircle className="h-5 w-5" />
          </Button>
        </div>
      ))}
    </div>
  );
};
