
import { Calendar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyRoutinesStateProps {
  onCreateClick: () => void;
}

export const EmptyRoutinesState = ({ onCreateClick }: EmptyRoutinesStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center mb-4">
        <Calendar className="h-8 w-8 text-gray-400" />
      </div>
      
      <h3 className="text-white font-semibold text-lg mb-2">No tienes rutinas</h3>
      
      <p className="text-gray-400 text-sm mb-6 max-w-xs">
        Crea tu primera rutina para organizar tus protocolos y hábitos diarios
      </p>
      
      <Button 
        onClick={onCreateClick}
        className="bg-[#FF4081] hover:bg-[#FF4081]/90"
      >
        <Plus className="h-4 w-4 mr-2" />
        Crear primera rutina
      </Button>
    </div>
  );
};
