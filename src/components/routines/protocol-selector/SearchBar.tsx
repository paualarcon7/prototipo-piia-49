
import { Search, X, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { RoutineProtocol } from "@/types/rutina";
import { useProtocolDuration } from "@/hooks/routine/useProtocolDuration";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
  selectedProtocols: RoutineProtocol[];
  onOpenFilters?: () => void;
}

export const SearchBar = ({ 
  search, 
  setSearch, 
  selectedProtocols,
  onOpenFilters 
}: SearchBarProps) => {
  const { formattedDuration } = useProtocolDuration(selectedProtocols);
  const isMobile = useIsMobile();

  return (
    <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm pb-3 pt-1">
      <div className="flex gap-2 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar protocolos..."
            className="pl-9 h-11 bg-secondary/50 border-secondary/30 text-white pr-8 placeholder:text-gray-400"
          />
          {search && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
              onClick={() => setSearch('')}
            >
              <X className="h-4 w-4 text-gray-400" />
            </Button>
          )}
        </div>

        {onOpenFilters && (
          <Button 
            variant="outline" 
            size="icon" 
            onClick={onOpenFilters}
            className="h-11 w-11 bg-secondary/50 border-secondary/30 hover:bg-secondary/70 transition-colors"
          >
            <Filter className="h-5 w-5 text-gray-300" />
          </Button>
        )}
      </div>
      
      {/* Selection summary */}
      {selectedProtocols.length > 0 && (
        <div className={`flex ${isMobile ? 'flex-col gap-1' : 'justify-between'} items-start sm:items-center mt-2 text-sm`}>
          <div className="text-gray-300 font-medium text-xs sm:text-sm">
            {selectedProtocols.length} {selectedProtocols.length === 1 ? 'protocolo' : 'protocolos'} seleccionados
          </div>
          <Badge className="bg-brand-teal/20 text-brand-teal font-medium">
            ⏱️ {formattedDuration}
          </Badge>
        </div>
      )}
    </div>
  );
};
