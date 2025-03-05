
import { Palette } from "lucide-react";
import { useRef, useState, useEffect } from "react";
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
  const colorSelectorRef = useRef<HTMLDivElement>(null);
  
  // Close the color selector when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (colorSelectorRef.current && !colorSelectorRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  // When currentColor changes externally, make sure our component stays in sync
  useEffect(() => {
    console.log("ColorSelector: currentColor updated to", currentColor);
  }, [currentColor]);
  
  const handleColorSelection = (color: string) => {
    console.log("ColorSelector: color selected", color);
    onColorChange(color);
    setIsOpen(false);
  };
  
  return (
    <div className="relative" ref={colorSelectorRef}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-white font-medium">Color de la rutina</h3>
          <p className="text-xs text-[#C8C8C9] mt-1">
            Personaliza el color de esta rutina
          </p>
        </div>
        <div className="flex items-center">
          <Button
            variant="outline"
            size="icon"
            className={`relative ${disabled ? 'opacity-70' : 'hover:border-white'} transition-all duration-200`}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            disabled={disabled}
          >
            <div 
              className={`absolute inset-2 rounded-sm ${disabled ? '' : 'animate-pulse'}`}
              style={{ backgroundColor: currentColor || '#FF4081' }}
            />
            <Palette className="h-4 w-4 text-white opacity-0" />
          </Button>
          
          {!disabled && (
            <span className="ml-2 text-xs text-[#02b1bb] font-medium">Editable</span>
          )}
        </div>
      </div>
      
      {isOpen && !disabled && (
        <div className="absolute right-0 mt-2 p-3 bg-[#1A1F2C] border border-[#1A1F2C]/50 rounded-lg shadow-lg z-20 animate-fade-in">
          <p className="text-xs text-white mb-2 font-medium">Selecciona un color:</p>
          <div className="grid grid-cols-5 gap-2">
            {ROUTINE_COLORS.map((color) => (
              <button
                key={color}
                className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
                  color === currentColor 
                    ? 'border-white scale-110 shadow-lg' 
                    : 'border-transparent hover:border-white/50'
                }`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelection(color)}
                aria-label={`Select color ${color}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
