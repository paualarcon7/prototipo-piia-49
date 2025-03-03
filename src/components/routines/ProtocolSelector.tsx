
import { useState, useRef } from "react";
import { Info } from "lucide-react";
import { Protocol } from "@/types/protocols";
import { RoutineProtocol } from "@/types/rutina";
import { groupByDimension } from "./utils/protocolUtils";
import { SearchBar } from "./protocol-selector/SearchBar";
import { ProtocolCategories } from "./protocol-selector/ProtocolCategories";
import { SelectedProtocolsPanel } from "./protocol-selector/SelectedProtocolsPanel";

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
      <SearchBar 
        search={search}
        setSearch={setSearch}
        selectedProtocols={selectedProtocols}
      />
      
      {/* Info message */}
      <div className="mb-2 bg-secondary/50 p-2 rounded-md flex items-center text-xs">
        <Info className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
        <span className="text-gray-300">
          Selecciona los protocolos para tu rutina. Puedes arrastrar para reordenar.
        </span>
      </div>
      
      {/* Main protocols list grouped by dimension */}
      <ProtocolCategories
        groupedProtocols={groupedProtocols}
        openCategories={openCategories}
        setOpenCategories={setOpenCategories}
        isSelected={isSelected}
        handleToggleProtocol={handleToggleProtocol}
      />
      
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
