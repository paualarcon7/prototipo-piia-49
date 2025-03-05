
import { ChevronDown, ChevronUp, GripVertical, X } from "lucide-react";
import { RoutineProtocol } from "@/types/rutina";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { useProtocolDuration } from "@/hooks/routine/useProtocolDuration";

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
  const isMobile = useIsMobile();
  const { formattedDuration } = useProtocolDuration(selectedProtocols);

  if (selectedProtocols.length === 0) {
    return null;
  }

  return (
    <div 
      ref={selectedPanelRef}
      className="fixed bottom-0 left-0 right-0 bg-[#1A1F2C] border-t border-[#1A1F2C]/30 pt-2 transition-all duration-300 rounded-t-xl shadow-lg z-20"
      style={{ 
        maxHeight: isExpanded ? (isMobile ? '70vh' : '40vh') : '4.5rem',
        overflow: 'hidden'
      }}
    >
      <button
        onClick={onToggleExpanded}
        className="w-full flex items-center justify-center py-2 text-sm text-white hover:bg-[#1A1F2C]/30 rounded-t-md"
      >
        <div className="w-10 h-1 bg-gray-500/30 rounded-full mb-2"></div>
        <div className="flex items-center">
          <span className="font-medium">
            {selectedProtocols.length} {selectedProtocols.length === 1 ? 'protocolo' : 'protocolos'}
          </span>
          <Badge className="ml-2 mr-1 bg-[#02b1bb]/20 text-[#02b1bb] font-medium">
            {formattedDuration}
          </Badge>
          {isExpanded ? (
            <ChevronDown className="ml-1 h-4 w-4" />
          ) : (
            <ChevronUp className="ml-1 h-4 w-4" />
          )}
        </div>
      </button>
      
      <div className="p-3 space-y-2 overflow-auto" style={{ maxHeight: 'calc(100% - 3rem)' }}>
        {isExpanded && (
          <>
            <p className="text-xs text-gray-400 mb-2 italic">
              {isMobile ? "Mantén presionado para reordenar" : "Arrastra para reordenar los protocolos"}
            </p>
            {selectedProtocols.map((item, index) => (
              <div
                key={`${item.protocol.id}-${index}`}
                draggable
                onDragStart={() => onDragStart(index)}
                onDragOver={(e) => onDragOver(e, index)}
                onDragEnd={onDragEnd}
                className={`
                  p-3 rounded-md bg-[#1A1F2C]/60 border border-[#02b1bb]/20 flex items-center
                  transition-all duration-200 touch-manipulation
                  ${dragIndex === index ? 'bg-[#1A1F2C]/80 border-[#02b1bb]/50 transform scale-[1.02] shadow-md' : ''}
                `}
              >
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#02b1bb] mr-3 text-xs font-medium text-white flex-shrink-0">
                  {index + 1}
                </div>
                <GripVertical className="h-5 w-5 text-[#8A898C] mr-2 cursor-grab flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-white text-sm font-medium line-clamp-1">
                    {item.protocol.title}
                  </h4>
                  <div className="flex items-center mt-1">
                    <Badge variant="outline" className="text-xs bg-[#1A1F2C]/30 mr-2 truncate max-w-[100px]">
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
                  className="p-2 rounded-full hover:bg-[#1A1F2C]/80 text-red-400 hover:text-red-300 flex-shrink-0"
                  aria-label="Eliminar protocolo"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
