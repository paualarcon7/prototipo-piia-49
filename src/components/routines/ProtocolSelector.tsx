
import { useState, useRef, useEffect } from "react";
import { Filter, Info } from "lucide-react";
import { Protocol } from "@/types/protocols";
import { RoutineProtocol } from "@/types/rutina";
import { groupByDimension } from "./utils/protocolUtils";
import { SearchBar } from "./protocol-selector/SearchBar";
import { ProtocolCategories } from "./protocol-selector/ProtocolCategories";
import { SelectedProtocolsPanel } from "./protocol-selector/SelectedProtocolsPanel";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProtocolSelectorProps {
  availableProtocols: Protocol[];
  selectedProtocols: RoutineProtocol[];
  onAddProtocol: (protocol: Protocol) => void;
  onRemoveProtocol: (index: number) => void;
  onReorderProtocols: (protocols: RoutineProtocol[]) => void;
}

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
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // Open first category by default if none are open
  useEffect(() => {
    if (openCategories.length === 0 && Object.keys(groupByDimension(availableProtocols)).length > 0) {
      setOpenCategories([Object.keys(groupByDimension(availableProtocols))[0]]);
    }
  }, [availableProtocols, openCategories.length]);
  
  // Expand selection panel when protocols are selected
  useEffect(() => {
    if (selectedProtocols.length > 0 && !isSelectionPanelExpanded) {
      setIsSelectionPanelExpanded(true);
    }
  }, [selectedProtocols.length, isSelectionPanelExpanded]);
  
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
      
      // Scroll to selection panel after a short delay to let it render
      setTimeout(() => {
        selectedPanelRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
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

  // Toggle selection panel
  const toggleSelectionPanel = () => {
    setIsSelectionPanelExpanded(!isSelectionPanelExpanded);
  };
  
  // Check if search has no results
  const hasNoResults = search.length > 0 && Object.keys(groupedProtocols).length === 0;
  
  return (
    <div className="flex flex-col space-y-4 relative">
      {/* Search bar - fixed at top */}
      <SearchBar 
        search={search}
        setSearch={setSearch}
        selectedProtocols={selectedProtocols}
        onOpenFilters={() => setIsFilterOpen(true)}
      />
      
      {/* Mobile Filter Sheet */}
      {isMobile && (
        <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <SheetContent side="bottom" className="h-[80vh] pb-16">
            <SheetHeader>
              <SheetTitle>Filtrar por dimensión</SheetTitle>
            </SheetHeader>
            <div className="mt-4 space-y-2">
              {Object.keys(groupByDimension(availableProtocols)).map(dimension => (
                <button
                  key={dimension}
                  className={`w-full p-3 text-left rounded-md ${
                    openCategories.includes(dimension) 
                      ? 'bg-[#02b1bb]/10 border border-[#02b1bb]/30' 
                      : 'bg-[#1A1F2C]/40 border border-[#1A1F2C]/20'
                  }`}
                  onClick={() => {
                    setOpenCategories(prev => 
                      prev.includes(dimension) 
                        ? prev.filter(d => d !== dimension) 
                        : [...prev, dimension]
                    );
                    setIsFilterOpen(false);
                  }}
                >
                  <span className="font-medium">{dimension}</span>
                  <div className="text-xs text-gray-400 mt-1">
                    {availableProtocols.filter(p => p.dimension === dimension).length} protocolos
                  </div>
                </button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      )}
      
      {/* Info message */}
      <Alert className="bg-[#02b1bb]/10 border-[#02b1bb]/30 mb-4">
        <AlertDescription className="text-gray-300 flex items-center text-sm">
          <Info className="h-4 w-4 text-[#02b1bb] mr-2 flex-shrink-0" />
          {isMobile ? "Selecciona protocolos para tu rutina." : "Selecciona los protocolos para tu rutina. Puedes reordenarlos arrastrándolos."}
        </AlertDescription>
      </Alert>
      
      {/* No results message */}
      {hasNoResults && (
        <div className="py-8 text-center">
          <p className="text-gray-400">No se encontraron protocolos que coincidan con tu búsqueda.</p>
          <button 
            className="mt-2 text-[#02b1bb] text-sm"
            onClick={() => setSearch("")}
          >
            Borrar búsqueda
          </button>
        </div>
      )}
      
      {/* Main protocols list grouped by dimension */}
      <div className="pb-24">
        <ProtocolCategories
          groupedProtocols={groupedProtocols}
          openCategories={openCategories}
          setOpenCategories={setOpenCategories}
          isSelected={isSelected}
          handleToggleProtocol={handleToggleProtocol}
        />
      </div>
      
      {/* Bottom panel with selected protocols */}
      <SelectedProtocolsPanel
        selectedProtocols={selectedProtocols}
        isExpanded={isSelectionPanelExpanded}
        onToggleExpanded={toggleSelectionPanel}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={() => setDragIndex(null)}
        onRemove={onRemoveProtocol}
        selectedPanelRef={selectedPanelRef}
        dragIndex={dragIndex}
      />
    </div>
  );
};
