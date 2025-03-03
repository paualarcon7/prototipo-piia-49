
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
  const { id, moduleId } = useParams();

  return (
    <div className="space-y-6">
      <div className="bg-secondary/70 p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Mapa de Energía</h2>
        
        <p className="text-gray-300 mb-6">
          El Mapa de Energía te ayudará a identificar y registrar tus niveles de energía
          a lo largo del día, permitiéndote descubrir patrones y optimizar tus actividades.
        </p>

        <div className="flex flex-col items-center">
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-white w-full max-w-xs" 
            onClick={() => goToEnergyMapProtocol(id, moduleId)}
          >
            <MapPin className="mr-2 h-5 w-5" />
            Acceder al Mapa de Energía
          </Button>
        </div>
      </div>

      <div className="bg-secondary/70 p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Ejercicio de flujo</h2>
        
        <div className="flex flex-col items-center">
          <div className="relative w-48 h-48 flex items-center justify-center mb-4">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                className="text-gray-700 stroke-current"
                strokeWidth="4"
                cx="50"
                cy="50"
                r="44"
                fill="none"
              ></circle>
              <circle
                className="text-purple-500 stroke-current"
                strokeWidth="4"
                strokeLinecap="round"
                cx="50"
                cy="50"
                r="44"
                fill="none"
                strokeDasharray="276.5"
                strokeDashoffset={276.5 - (trainingProgress / 100) * 276.5}
                transform="rotate(-90 50 50)"
              ></circle>
            </svg>
            <span className="absolute text-xl font-bold">
              {exerciseComplete ? "¡Hecho!" : `${Math.floor(trainingProgress)}%`}
            </span>
          </div>
          
          {!exerciseComplete ? (
            trainingProgress === 0 ? (
              <Button onClick={startTrainingExercise}>
                Iniciar ejercicio
              </Button>
            ) : (
              <p className="text-center text-gray-300">
                Mantén tu atención en la respiración...
              </p>
            )
          ) : (
            <div className="text-center space-y-4">
              <p className="text-green-400">
                ¡Ejercicio completado con éxito!
              </p>
              <Button variant="outline" onClick={startTrainingExercise}>
                Repetir ejercicio
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
