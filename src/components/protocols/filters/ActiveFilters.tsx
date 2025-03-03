
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { ProtocolDimension, Tag } from "@/types/protocols";

interface ActiveFiltersProps {
  selectedDimension: ProtocolDimension;
  setSelectedDimension: (dimension: ProtocolDimension) => void;
  selectedTag: Tag;
  setSelectedTag: (tag: Tag) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
}

const ActiveFilters = ({
  selectedDimension,
  setSelectedDimension,
  selectedTag,
  setSelectedTag,
  clearFilters,
  hasActiveFilters
}: ActiveFiltersProps) => {
  if (!hasActiveFilters) return null;
  
  return (
    <div className="flex flex-wrap gap-2">
      {selectedDimension !== "all" && (
        <Badge 
          className="bg-[#ffcc08]/20 text-[#ffcc08] pl-2 pr-1 py-1 flex items-center gap-1"
        >
          Dimensión: {selectedDimension}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-4 w-4 rounded-full hover:bg-white/10"
            onClick={() => setSelectedDimension("all")}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      )}
      
      {selectedTag !== "all" && (
        <Badge 
          className="bg-[#ffcc08]/20 text-[#ffcc08] pl-2 pr-1 py-1 flex items-center gap-1"
        >
          Etiqueta: {selectedTag}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-4 w-4 rounded-full hover:bg-white/10"
            onClick={() => setSelectedTag("all")}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      )}
      
      <Button
        variant="ghost"
        size="sm"
        className="text-[#8A898C] text-xs hover:text-white"
        onClick={clearFilters}
      >
        Limpiar todos
      </Button>
    </div>
  );
};

export default ActiveFilters;
