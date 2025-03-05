
import { Palette } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ROUTINE_COLORS } from "@/types/rutina";

interface ColorSelectorProps {
  currentColor: string;
  onColorChange: (color: string) => void;
  disabled?: boolean;
}

export const ColorSelector = ({ 
  currentColor, 
  onColorChange,
  disabled = false 
}: ColorSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white font-medium">Color de la rutina</h3>
          <p className="text-xs text-[#C8C8C9] mt-1">
            Personaliza el color de esta rutina
          </p>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="relative"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
        >
          <div 
            className="absolute inset-2 rounded-sm"
            style={{ backgroundColor: currentColor }}
          />
          <Palette className="h-4 w-4 text-white opacity-0" />
        </Button>
      </div>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 p-3 bg-[#1A1F2C] border border-[#1A1F2C]/50 rounded-lg shadow-lg z-20">
          <div className="grid grid-cols-5 gap-2">
            {ROUTINE_COLORS.map((color) => (
              <button
                key={color}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  color === currentColor 
                    ? 'border-white scale-110' 
                    : 'border-transparent hover:scale-105'
                }`}
                style={{ backgroundColor: color }}
                onClick={() => {
                  onColorChange(color);
                  setIsOpen(false);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
