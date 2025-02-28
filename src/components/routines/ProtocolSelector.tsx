
import { useState, useRef } from "react";
import { Search, X, GripVertical, Info, ChevronDown, ChevronUp, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { RoutineProtocol } from "@/types/rutina";
import { Protocol } from "@/types/protocols";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface ProtocolSelectorProps {
  availableProtocols: Protocol[];
  selectedProtocols: RoutineProtocol[];
  onAddProtocol: (protocol: Protocol) => void;
  onRemoveProtocol: (index: number) => void;
  onReorderProtocols: (protocols: RoutineProtocol[]) => void;
}

// Group protocols by dimension
const groupByDimension = (protocols: Protocol[]) => {
  const groups: Record<string, Protocol[]> = {};
  
  protocols.forEach(protocol => {
    if (!groups[protocol.dimension]) {
      groups[protocol.dimension] = [];
    }
    groups[protocol.dimension].push(protocol);
  });
  
  return groups;
};

export const ProtocolSelector = ({
  availableProtocols,
  selectedProtocols,
  onAddProtocol,
  onRemoveProtocol,
  onReorderProtocols
}: ProtocolSelectorProps) => {
  const [search, setSearch] = useState("");
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [isSelectionPanelExpanded, setIsSelectionPanelExpanded] = useState(selectedProtocols.length > 0);
  const selectedPanelRef = useRef<HTMLDivElement>(null);
  
  // All protocols (selected and unselected)
  const allProtocols = [...availableProtocols];
  
  // Filter protocols based on search
  const filteredProtocols = allProtocols.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.dimension.toLowerCase().includes(search.toLowerCase()) ||
    p.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
  );
  
  // Group filtered protocols by dimension
  const groupedProtocols = groupByDimension(filteredProtocols);
  
  // Check if a protocol is selected
  const isSelected = (protocol: Protocol) => {
    return selectedProtocols.some(sp => sp.protocol.id === protocol.id);
  };
  
  // Handle protocol selection/deselection
  const handleToggleProtocol = (protocol: Protocol) => {
    if (isSelected(protocol)) {
      const index = selectedProtocols.findIndex(sp => sp.protocol.id === protocol.id);
      if (index !== -1) {
        onRemoveProtocol(index);
      }
    } else {
      onAddProtocol(protocol);
      
      // Expand selection panel if it's not already expanded
      if (!isSelectionPanelExpanded) {
        setIsSelectionPanelExpanded(true);
        
        // Scroll to selection panel after a short delay to let it render
        setTimeout(() => {
          selectedPanelRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  };

  const handleDragStart = (index: number) => {
    setDragIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;
    
    // Reorder the protocols
    const newProtocols = [...selectedProtocols];
    const draggedProtocol = newProtocols[dragIndex];
    
    // Remove from old position
    newProtocols.splice(dragIndex, 1);
    // Add to new position
    newProtocols.splice(index, 0, draggedProtocol);
    
    // Update drag index and protocol order
    setDragIndex(index);
    onReorderProtocols(newProtocols);
  };

  // Calculate total duration
  const calculateTotalDuration = () => {
    let totalMinutes = 0;
    
    selectedProtocols.forEach(({ protocol }) => {
      const durationMatch = protocol.duration.match(/(\d+)/);
      if (durationMatch) {
        totalMinutes += parseInt(durationMatch[0], 10);
      }
    });
    
    if (totalMinutes >= 60) {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return `${hours}h ${minutes > 0 ? `${minutes}m` : ""}`;
    }
    
    return `${totalMinutes}m`;
  };

  // Toggle selection panel
  const toggleSelectionPanel = () => {
    setIsSelectionPanelExpanded(!isSelectionPanelExpanded);
    
    // Scroll to selection panel if expanding
    if (!isSelectionPanelExpanded) {
      setTimeout(() => {
        selectedPanelRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };
  
  return (
    <div className="flex flex-col space-y-4">
      {/* Search bar - fixed at top */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm pb-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar protocolos"
            className="pl-9 bg-secondary/50 border-secondary/30 text-white"
          />
        </div>
        
        {/* Selection summary */}
        <div className="flex justify-between items-center mt-2 text-sm">
          <div className="text-gray-400">
            {selectedProtocols.length} {selectedProtocols.length === 1 ? 'protocolo' : 'protocolos'} seleccionados
          </div>
          {selectedProtocols.length > 0 && (
            <Badge className="bg-[#FF4081]/20 text-[#FF4081]">
              Duración total: {calculateTotalDuration()}
            </Badge>
          )}
        </div>
      </div>
      
      {/* Info message */}
      <div className="mb-2 bg-secondary/50 p-2 rounded-md flex items-center text-xs">
        <Info className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
        <span className="text-gray-300">
          Selecciona los protocolos para tu rutina. Puedes arrastrar para reordenar.
        </span>
      </div>
      
      {/* Main protocols list grouped by dimension */}
      <ScrollArea className="flex-1 pr-3" style={{ maxHeight: '60vh' }}>
        {Object.keys(groupedProtocols).length > 0 ? (
          <Accordion type="multiple" defaultValue={Object.keys(groupedProtocols)} className="space-y-2">
            {Object.entries(groupedProtocols).map(([dimension, protocols]) => (
              <AccordionItem 
                key={dimension} 
                value={dimension}
                className="border-secondary/20 bg-secondary/30 rounded-md overflow-hidden"
              >
                <AccordionTrigger className="px-3 py-2 text-white hover:bg-secondary/50 hover:no-underline">
                  <div className="flex items-center">
                    <span className="capitalize">{dimension}</span>
                    <Badge className="ml-2 bg-secondary/70 text-white">
                      {protocols.length}
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-1">
                  <div className="space-y-2 px-1">
                    {protocols.map(protocol => (
                      <div
                        key={protocol.id}
                        className={`
                          p-3 rounded-md flex items-center cursor-pointer transition-colors duration-200
                          ${isSelected(protocol) 
                            ? 'bg-secondary/80 border border-[#FF4081]/30' 
                            : 'bg-secondary/40 border border-secondary/20 hover:bg-secondary/60'}
                        `}
                        onClick={() => handleToggleProtocol(protocol)}
                      >
                        <div className="mr-3 flex items-center justify-center">
                          <Checkbox 
                            checked={isSelected(protocol)}
                            className={`${isSelected(protocol) ? 'border-[#FF4081] bg-[#FF4081]' : 'border-gray-500'}`}
                            onCheckedChange={() => handleToggleProtocol(protocol)}
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
                        
                        {isSelected(protocol) ? (
                          <Check className="h-4 w-4 text-[#FF4081]" />
                        ) : null}
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-400 text-sm">
              No hay protocolos disponibles{search ? " para tu búsqueda" : ""}
            </p>
          </div>
        )}
      </ScrollArea>
      
      {/* Bottom panel with selected protocols */}
      {selectedProtocols.length > 0 && (
        <div 
          ref={selectedPanelRef}
          className="mt-4 border-t border-secondary/30 pt-2 transition-all duration-300"
        >
          <button
            onClick={toggleSelectionPanel}
            className="w-full flex items-center justify-center py-1 text-sm text-gray-300 hover:bg-secondary/30 rounded-md"
          >
            <span>Seleccionados ({selectedProtocols.length})</span>
            {isSelectionPanelExpanded ? (
              <ChevronDown className="ml-1 h-4 w-4" />
            ) : (
              <ChevronUp className="ml-1 h-4 w-4" />
            )}
          </button>
          
          {isSelectionPanelExpanded && (
            <div className="mt-2 space-y-2 max-h-[40vh] overflow-auto pr-1">
              {selectedProtocols.map((item, index) => (
                <div
                  key={`${item.protocol.id}-${index}`}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={() => setDragIndex(null)}
                  className={`
                    p-3 rounded-md bg-secondary/60 border border-[#FF4081]/20 flex items-center
                    transition-colors duration-200
                    ${dragIndex === index ? 'bg-secondary/80 border-[#FF4081]/50' : ''}
                  `}
                >
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-secondary/70 mr-3 text-xs font-medium text-white">
                    {index + 1}
                  </div>
                  <GripVertical className="h-5 w-5 text-gray-500 mr-2 cursor-grab flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="text-white text-sm font-medium line-clamp-1">
                      {item.protocol.title}
                    </h4>
                    <div className="flex items-center mt-1">
                      <Badge variant="outline" className="text-xs bg-secondary/30 mr-2">
                        {item.protocol.dimension}
                      </Badge>
                      <span className="text-xs text-gray-400">
                        {item.protocol.duration}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveProtocol(index);
                    }}
                    className="p-1 rounded-full hover:bg-secondary/80"
                  >
                    <X className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
