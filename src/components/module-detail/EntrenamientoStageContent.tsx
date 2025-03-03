import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { useParams } from "react-router-dom";
interface EntrenamientoStageContentProps {
  trainingProgress: number;
  exerciseComplete: boolean;
  startTrainingExercise: () => void;
  goToEnergyMapProtocol: (id?: string, moduleId?: string) => void;
}
export const EntrenamientoStageContent = ({
  trainingProgress,
  exerciseComplete,
  startTrainingExercise,
  goToEnergyMapProtocol
}: EntrenamientoStageContentProps) => {
  const {
    id,
    moduleId
  } = useParams();
  return <div className="space-y-6">
      <div className="bg-secondary/70 p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Mapa de Energía</h2>
        
        <p className="text-gray-300 mb-6">
          El Mapa de Energía te ayudará a identificar y registrar tus niveles de energía
          a lo largo del día, permitiéndote descubrir patrones y optimizar tus actividades.
        </p>

        <div className="flex flex-col items-center">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white w-full max-w-xs" onClick={() => goToEnergyMapProtocol(id, moduleId)}>
            <MapPin className="mr-2 h-5 w-5" />
            Acceder al Mapa de Energía
          </Button>
        </div>
      </div>

      
    </div>;
};