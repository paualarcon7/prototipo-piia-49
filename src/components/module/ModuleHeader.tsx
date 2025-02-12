
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface ModuleHeaderProps {
  onBack: () => void;
}

export const ModuleHeader = ({ onBack }: ModuleHeaderProps) => (
  <>
    <Button
      variant="ghost"
      className="mb-4"
      onClick={onBack}
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      Volver al programa
    </Button>

    <div className="bg-secondary/50 backdrop-blur-sm rounded-lg p-6 mb-6">
      <h1 className="text-2xl font-bold mb-4">ALMA - PARTE 1: ACTIVA TU ENERGÍA Y DETECTA TU FLUJO</h1>
      <p className="text-gray-300 mb-4">
        El modelo ALMA está diseñado para ayudarte a alinear tu energía, talento, impacto y sostenibilidad, 
        con el fin de encontrar un camino profesional y personal pleno y significativo. Cada paso te guiará 
        a través de reflexiones y ejercicios prácticos para conectar con tu esencia y construir una estrategia de acción.
      </p>
      <div className="bg-purple-500/20 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Objetivo del Módulo</h2>
        <p className="text-gray-300">
          Identificar las actividades y momentos en los que tu energía se expande y experimentas el estado de "flujo".
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <span className="text-sm bg-purple-500/30 text-purple-300 px-3 py-1.5 rounded-full font-medium flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          En progreso
        </span>
      </div>
    </div>
  </>
);
