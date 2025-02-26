
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
      <div className="flex items-center gap-2">
        <span className="text-sm bg-[#FF4081]/30 text-[#FF4081] px-3 py-1.5 rounded-full font-medium flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#FF4081] animate-pulse" />
          En progreso
        </span>
      </div>
    </div>
  </>
);

