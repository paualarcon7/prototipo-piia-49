
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
      className="fixed bottom-0 left-0 right-0 bg-brand-black border-t border-secondary/20 pt-2 transition-all duration-300 rounded-t-xl shadow-lg z-20"
      style={{ 
        maxHeight: isExpanded ? (isMobile ? '80vh' : '40vh') : '4.5rem',
        overflow: 'hidden'
      }}
    >
      {/* Handle para arrastrar el panel */}
      <div 
        onClick={onToggleExpanded}
        className="w-full flex flex-col items-center justify-center py-1 text-sm text-white hover:bg-white/5 rounded-t-md active:bg-white/10 transition-colors cursor-pointer"
      >
        <div className="w-12 h-1.5 bg-gray-500/40 rounded-full mb-2"></div>
        <div className="flex items-center">
          <span className="font-medium">
            {selectedProtocols.length} {selectedProtocols.length === 1 ? 'protocolo' : 'protocolos'}
          </span>
          <Badge className="ml-2 mr-1 bg-brand-teal/20 text-brand-teal font-medium">
            {formattedDuration}
          </Badge>
          {isExpanded ? (
            <ChevronDown className="ml-1 h-4 w-4" />
          ) : (
            <ChevronUp className="ml-1 h-4 w-4" />
          )}
        </div>
      </div>
      
      <div className="p-3 space-y-2 overflow-auto" style={{ maxHeight: 'calc(100% - 3rem)' }}>
        {isExpanded && (
          <>
            <p className="text-xs text-gray-400 mb-2 italic text-center">
              {isMobile ? "Mantén presionado y arrastra para reordenar" : "Arrastra para reordenar los protocolos"}
            </p>
            {selectedProtocols.map((item, index) => (
              <div
                key={`${item.protocol.id}-${index}`}
                draggable
                onDragStart={() => onDragStart(index)}
                onDragOver={(e) => onDragOver(e, index)}
                onDragEnd={onDragEnd}
                className={`
                  p-3 rounded-lg bg-secondary/60 border border-brand-teal/20 flex items-center
                  transition-all duration-200 touch-manipulation mb-2 last:mb-0
                  ${dragIndex === index ? 'border-brand-teal/50 transform scale-[1.02] shadow-md' : ''}
                  ${isMobile ? 'active:scale-[1.02] active:border-brand-teal/50' : 'hover:border-brand-teal/30'}
                `}
              >
                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-brand-teal mr-2 text-xs font-bold text-white flex-shrink-0">
                  {index + 1}
                </div>
                <GripVertical className={`h-5 w-5 text-gray-400 mr-2 cursor-grab flex-shrink-0 ${isMobile ? 'hidden' : 'block'}`} />
                <div className="flex-1 min-w-0">
                  <h4 className="text-white text-sm font-medium line-clamp-1">
                    {item.protocol.title}
                  </h4>
                  <div className="flex items-center flex-wrap gap-1 mt-1">
                    <Badge variant="outline" className="text-xs bg-secondary/70 mr-1 truncate max-w-[100px]">
                      {item.protocol.dimension}
                    </Badge>
                    <span className="text-xs text-gray-300">
                      {item.protocol.duration}
                    </span>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(index);
                  }}
                  className="p-2 rounded-full hover:bg-brand-pink/10 text-brand-pink hover:text-brand-pink-light flex-shrink-0 transition-colors ml-1"
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
