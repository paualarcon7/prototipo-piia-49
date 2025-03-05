
import { ChevronLeft, X, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";

interface RoutineDetailHeaderProps {
  isEditing: boolean;
  toggleEditMode: () => void;
  saveChanges: () => void;
}

export const RoutineDetailHeader = ({
  isEditing,
  toggleEditMode,
  saveChanges
}: RoutineDetailHeaderProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <div className="px-4 py-4 border-b border-secondary/20 backdrop-blur-sm sticky top-0 z-10 bg-secondary/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/rutinas')}
            className="text-white mr-2"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold font-oswald text-white">
            {isEditing ? "Editar rutina" : "Detalle de rutina"}
          </h1>
        </div>
        
        {isEditing && (
          <div className={isMobile ? "flex space-x-2 items-center mr-12" : "flex space-x-2 items-center mr-16"}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    onClick={toggleEditMode}
                    className="text-white border-white/20"
                    size={isMobile ? "sm" : "default"}
                  >
                    <X className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} mr-1`} />
                    {isMobile ? "" : "Cancelar"}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Cancelar cambios</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="default" 
                    onClick={saveChanges}
                    className="bg-[#FF4081] hover:bg-[#FF4081]/80 text-white"
                    size={isMobile ? "sm" : "default"}
                  >
                    <Save className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'} mr-1`} />
                    {isMobile ? "" : "Guardar"}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Guardar cambios</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </div>
    </div>
  );
};
