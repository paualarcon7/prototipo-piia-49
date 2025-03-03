
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Protocol } from "@/types/protocols";

interface ProtocolItemProps {
  protocol: Protocol;
  isSelected: boolean;
  onToggle: () => void;
}

export const ProtocolItem = ({ protocol, isSelected, onToggle }: ProtocolItemProps) => {
  return (
    <div
      className={`
        p-3 rounded-md flex items-center cursor-pointer transition-colors duration-200
        ${isSelected 
          ? 'bg-secondary/80 border border-[#FF4081]/30' 
          : 'bg-secondary/40 border border-secondary/20 hover:bg-secondary/60'}
      `}
      onClick={onToggle}
    >
      <div className="mr-3 flex items-center justify-center">
        <Checkbox 
          checked={isSelected}
          className={`${isSelected ? 'border-[#FF4081] bg-[#FF4081]' : 'border-gray-500'}`}
          onCheckedChange={onToggle}
        />
      </div>
      <div className="flex-1">
        <h4 className="text-white text-sm font-medium line-clamp-1">
          {protocol.title}
        </h4>
        <div className="flex items-center mt-1">
          <Badge variant="outline" className="text-xs bg-secondary/30 mr-2">
            {protocol.dimension}
          </Badge>
          <span className="text-xs text-gray-400">
            {protocol.duration}
          </span>
        </div>
        <div className="flex flex-wrap gap-1 mt-1">
          {protocol.tags.slice(0, 2).map(tag => (
            <span 
              key={tag} 
              className="text-[10px] px-1.5 py-0.5 rounded-full bg-secondary/50 text-gray-300"
            >
              {tag}
            </span>
          ))}
          {protocol.tags.length > 2 && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-secondary/50 text-gray-300">
              +{protocol.tags.length - 2}
            </span>
          )}
        </div>
      </div>
      
      {isSelected ? (
        <Check className="h-4 w-4 text-[#FF4081]" />
      ) : null}
    </div>
  );
};
