
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NoResultsViewProps {
  clearFilters: () => void;
}

export const NoResultsView = ({ clearFilters }: NoResultsViewProps) => {
  return (
    <div className="text-center py-10 bg-[#1A1F2C]/30 rounded-lg border border-[#1A1F2C]/20 backdrop-blur-sm">
      <Search className="h-12 w-12 mx-auto text-[#8A898C] mb-3" />
      <h3 className="text-white font-medium mb-2">No se encontraron rutinas</h3>
      <p className="text-[#C8C8C9] text-sm mb-4 max-w-xs mx-auto">
        No hay rutinas que coincidan con tu búsqueda o filtros.
      </p>
      <Button 
        variant="outline" 
        onClick={clearFilters}
        className="border-[#02b1bb] text-[#02b1bb]"
      >
        Limpiar filtros
      </Button>
    </div>
  );
};
