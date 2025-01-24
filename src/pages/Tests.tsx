import { Card } from "@/components/ui/card";
import { Lock, AlertTriangle } from "lucide-react";

const Tests = () => {
  return (
    <div className="flex flex-col min-h-screen pb-20 p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Tests Disponibles</h1>
      
      <Card className="p-4 bg-secondary/50 backdrop-blur-sm border-secondary/20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Test de Orlick</h2>
            <p className="text-sm text-gray-500">Evaluación de habilidades mentales</p>
          </div>
          <AlertTriangle className="w-6 h-6 text-yellow-500" />
        </div>
        <p className="text-sm mt-2 text-muted-foreground">Temporalmente deshabilitado</p>
      </Card>

      <Card className="p-4 bg-secondary/50 backdrop-blur-sm border-secondary/20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Test de Burnout</h2>
            <p className="text-sm text-gray-500">Evaluación de agotamiento</p>
          </div>
          <Lock className="w-6 h-6 text-gray-400" />
        </div>
        <p className="text-sm mt-2 text-muted-foreground">Bloqueado</p>
      </Card>

      <Card className="p-4 bg-secondary/50 backdrop-blur-sm border-secondary/20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Test de Depresión</h2>
            <p className="text-sm text-gray-500">Evaluación del estado de ánimo</p>
          </div>
          <Lock className="w-6 h-6 text-gray-400" />
        </div>
        <p className="text-sm mt-2 text-muted-foreground">Bloqueado</p>
      </Card>
    </div>
  );
};

export default Tests;