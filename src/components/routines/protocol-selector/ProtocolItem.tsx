
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Protocol } from "@/types/protocols";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProtocolItemProps {
  protocol: Protocol;
  isSelected: boolean;
  onToggle: () => void;
}

export const ProtocolItem = ({ protocol, isSelected, onToggle }: ProtocolItemProps) => {
  const isMobile = useIsMobile();

  return (
    <div
      className={`
        p-3 sm:p-4 rounded-md flex items-center cursor-pointer transition-colors duration-200
        ${isSelected 
          ? 'bg-[#02b1bb]/10 border border-[#02b1bb]/30' 
          : 'bg-[#1A1F2C]/40 border border-[#1A1F2C]/20 hover:bg-[#1A1F2C]/60'}
        active:bg-[#1A1F2C]/80 touch-manipulation
      `}
      onClick={onToggle}
    >
      <div className="mr-3 flex items-center justify-center">
        <Checkbox 
          checked={isSelected}
          className={`h-5 w-5 ${isSelected ? 'border-[#02b1bb] bg-[#02b1bb]' : 'border-[#8A898C]'}`}
          onCheckedChange={onToggle}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center">
          <h4 className="text-white text-sm font-medium line-clamp-1">
            {protocol.title}
          </h4>
          {isSelected && !isMobile && (
            <Badge className="ml-2 bg-[#02b1bb]/20 text-[#02b1bb] text-xs">
              Seleccionado
            </Badge>
          )}
        </div>
        <div className="flex items-center mt-1 flex-wrap gap-1">
          <Badge variant="outline" className="text-xs bg-[#1A1F2C]/30">
            {protocol.dimension}
          </Badge>
          <span className="text-xs text-[#C8C8C9] ml-1">
            {protocol.duration}
          </span>
        </div>
        {!isMobile && (
          <div className="flex flex-wrap gap-1 mt-1">
            {protocol.tags.slice(0, 2).map(tag => (
              <span 
                key={tag} 
                className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#1A1F2C]/50 text-[#ffcc08]"
              >
                {tag}
              </span>
            ))}
            {protocol.tags.length > 2 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#1A1F2C]/50 text-[#C8C8C9]">
                +{protocol.tags.length - 2}
              </span>
            )}
          </div>
        )}
      </div>
      
      {isSelected && (
        <Check className="h-5 w-5 text-[#02b1bb] flex-shrink-0 ml-2" />
      )}
    </div>
  );
};
