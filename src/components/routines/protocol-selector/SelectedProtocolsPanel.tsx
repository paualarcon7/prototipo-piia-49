
import { ChevronDown, ChevronUp, GripVertical, X } from "lucide-react";
import { RoutineProtocol } from "@/types/rutina";
import { Badge } from "@/components/ui/badge";

interface SelectedProtocolsPanelProps {
  selectedProtocols: RoutineProtocol[];
  isExpanded: boolean;
  onToggleExpanded: () => void;
  onDragStart: (index: number) => void;
  onDragOver: (e: React.DragEvent, index: number) => void;
  onDragEnd: () => void;
  onRemove: (index: number) => void;
  selectedPanelRef: React.RefObject<HTMLDivElement>;
  dragIndex: number | null;
}

export const SelectedProtocolsPanel = ({
  selectedProtocols,
  isExpanded,
  onToggleExpanded,
  onDragStart,
  onDragOver,
  onDragEnd,
  onRemove,
  selectedPanelRef,
  dragIndex
}: SelectedProtocolsPanelProps) => {
  if (selectedProtocols.length === 0) {
    return null;
  }

  return (
    <div 
      ref={selectedPanelRef}
      className="mt-4 border-t border-[#1A1F2C]/30 pt-2 transition-all duration-300"
    >
      <button
        onClick={onToggleExpanded}
        className="w-full flex items-center justify-center py-1 text-sm text-[#C8C8C9] hover:bg-[#1A1F2C]/30 rounded-md"
      >
        <span>Seleccionados ({selectedProtocols.length})</span>
        {isExpanded ? (
          <ChevronDown className="ml-1 h-4 w-4" />
        ) : (
          <ChevronUp className="ml-1 h-4 w-4" />
        )}
      </button>
      
      {isExpanded && (
        <div className="mt-2 space-y-2 max-h-[40vh] overflow-auto pr-1">
          {selectedProtocols.map((item, index) => (
            <div
              key={`${item.protocol.id}-${index}`}
              draggable
              onDragStart={() => onDragStart(index)}
              onDragOver={(e) => onDragOver(e, index)}
              onDragEnd={onDragEnd}
              className={`
                p-3 rounded-md bg-[#1A1F2C]/60 border border-[#9b87f5]/20 flex items-center
                transition-colors duration-200
                ${dragIndex === index ? 'bg-[#1A1F2C]/80 border-[#9b87f5]/50' : ''}
              `}
            >
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#1A1F2C]/70 mr-3 text-xs font-medium text-white">
                {index + 1}
              </div>
              <GripVertical className="h-5 w-5 text-[#8A898C] mr-2 cursor-grab flex-shrink-0" />
              <div className="flex-1">
                <h4 className="text-white text-sm font-medium line-clamp-1">
                  {item.protocol.title}
                </h4>
                <div className="flex items-center mt-1">
                  <Badge variant="outline" className="text-xs bg-[#1A1F2C]/30 mr-2">
                    {item.protocol.dimension}
                  </Badge>
                  <span className="text-xs text-[#C8C8C9]">
                    {item.protocol.duration}
                  </span>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(index);
                }}
                className="p-1 rounded-full hover:bg-[#1A1F2C]/80"
              >
                <X className="h-4 w-4 text-[#C8C8C9]" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
