
import { ChevronLeft, Edit, X, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
        <div className="flex items-center">
          {isEditing ? (
            <>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleEditMode}
                className="text-white mr-1"
                title="Cancelar"
              >
                <X className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={saveChanges}
                className="text-[#FF4081]"
                title="Guardar cambios"
              >
                <Save className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleEditMode}
              className="text-white"
            >
              <Edit className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
