
import { BadgeAlert } from "lucide-react";

export const EnergyScaleLegend = () => {
  return (
    <div className="flex items-start gap-4">
      <BadgeAlert className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
      <div>
        <h3 className="font-medium mb-2">Escala de Energía</h3>
        <ul className="space-y-2 text-sm text-gray-300">
          <li className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-red-500/20 text-red-300 flex items-center justify-center text-xs">1</span>
            <span>Agotador - La actividad drena completamente tu energía</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-300 flex items-center justify-center text-xs">2</span>
            <span>Cansador - Requiere esfuerzo significativo</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-yellow-500/20 text-yellow-300 flex items-center justify-center text-xs">3</span>
            <span>Neutral - No afecta significativamente tu energía</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-green-500/20 text-green-300 flex items-center justify-center text-xs">4</span>
            <span>Estimulante - Te da un impulso de energía</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-xs">5</span>
            <span>Energizante - Te llena de vitalidad y motivación</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
