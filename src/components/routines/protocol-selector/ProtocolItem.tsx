
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
        p-4 rounded-lg flex items-center cursor-pointer transition-colors duration-200
        ${isSelected 
          ? 'bg-brand-teal/10 border border-brand-teal/30' 
          : 'bg-secondary/40 border border-secondary/20 hover:bg-secondary/60'}
        active:bg-secondary/80 touch-manipulation mb-3 last:mb-0
      `}
      onClick={onToggle}
    >
      <div className="mr-3 flex items-center justify-center">
        <Checkbox 
          checked={isSelected}
          className={`h-5 w-5 ${isSelected ? 'border-brand-teal bg-brand-teal' : 'border-gray-400'}`}
          onCheckedChange={onToggle}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center">
          <h4 className="text-white text-sm font-medium line-clamp-1">
            {protocol.title}
          </h4>
          {isSelected && !isMobile && (
            <Badge className="ml-2 bg-brand-teal/20 text-brand-teal text-xs">
              Seleccionado
            </Badge>
          )}
        </div>
        
        <div className="flex items-center mt-1 flex-wrap gap-1">
          <Badge variant="outline" className="text-xs bg-secondary/50 text-gray-300">
            {protocol.dimension}
          </Badge>
          <span className="text-xs text-gray-300 ml-1">
            {protocol.duration}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-1">
          {protocol.tags.slice(0, isMobile ? 1 : 2).map(tag => (
            <span 
              key={tag} 
              className="text-[10px] px-1.5 py-0.5 rounded-full bg-secondary/50 text-brand-yellow"
            >
              {tag}
            </span>
          ))}
          {protocol.tags.length > (isMobile ? 1 : 2) && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-secondary/50 text-gray-300">
              +{protocol.tags.length - (isMobile ? 1 : 2)}
            </span>
          )}
        </div>
      </div>
      
      {isSelected && (
        <Check className="h-5 w-5 text-brand-teal flex-shrink-0 ml-2" />
      )}
    </div>
  );
};
