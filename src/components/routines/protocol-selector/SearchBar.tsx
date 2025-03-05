
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { RoutineProtocol } from "@/types/rutina";
import { useProtocolDuration } from "@/hooks/routine/useProtocolDuration";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
  selectedProtocols: RoutineProtocol[];
}

export const SearchBar = ({ search, setSearch, selectedProtocols }: SearchBarProps) => {
  const { formattedDuration } = useProtocolDuration(selectedProtocols);

  return (
    <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm pb-3 pt-1">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#8A898C]" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar protocolos por nombre o tipo..."
          className="pl-9 h-10 bg-[#1A1F2C]/50 border-[#1A1F2C]/30 text-white"
        />
        {search && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
            onClick={() => setSearch('')}
          >
            <X className="h-4 w-4 text-[#8A898C]" />
          </Button>
        )}
      </div>
      
      {/* Selection summary */}
      <div className="flex justify-between items-center mt-2 text-sm">
        <div className="text-[#C8C8C9] font-medium">
          {selectedProtocols.length} {selectedProtocols.length === 1 ? 'protocolo' : 'protocolos'} seleccionados
        </div>
        {selectedProtocols.length > 0 && (
          <Badge className="bg-[#02b1bb]/20 text-[#02b1bb] font-medium">
            ⏱️ Duración total: {formattedDuration}
          </Badge>
        )}
      </div>
    </div>
  );
};
