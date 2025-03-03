
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, X } from "lucide-react";
import { ProtocolDimension, Tag } from "@/types/protocols";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

interface FilterSheetProps {
  selectedDimension: ProtocolDimension;
  setSelectedDimension: (dimension: ProtocolDimension) => void;
  selectedTag: Tag;
  setSelectedTag: (tag: Tag) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
}

const FilterSheet = ({
  selectedDimension,
  setSelectedDimension,
  selectedTag,
  setSelectedTag,
  clearFilters,
  hasActiveFilters
}: FilterSheetProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className={`relative bg-[#1A1F2C]/50 border-[#1A1F2C]/30 ${hasActiveFilters ? 'text-[#ffcc08]' : 'text-white'}`}
        >
          <Filter className="h-4 w-4" />
          {hasActiveFilters && (
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-[#ffcc08] rounded-full" />
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-[#1A1F2C] border-[#1A1F2C]/30">
        <SheetHeader>
          <SheetTitle className="text-white">Filtros</SheetTitle>
        </SheetHeader>
        
        <div className="py-4 space-y-5">
          {/* Dimension Filter */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-[#C8C8C9]">Dimensión</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant={selectedDimension === "all" ? "secondary" : "outline"}
                onClick={() => setSelectedDimension("all")}
                className={`h-8 px-3 ${
                  selectedDimension === "all" 
                    ? "bg-[#ffcc08]/20 hover:bg-[#ffcc08]/30 text-[#ffcc08]" 
                    : "bg-white/5 hover:bg-white/10 text-gray-300"
                }`}
              >
                Todos
              </Button>
              <Button
                size="sm"
                variant={selectedDimension === "rendimiento" ? "secondary" : "outline"}
                onClick={() => setSelectedDimension("rendimiento")}
                className={`h-8 px-3 ${
                  selectedDimension === "rendimiento" 
                    ? "bg-[#ffcc08]/20 hover:bg-[#ffcc08]/30 text-[#ffcc08]" 
                    : "bg-white/5 hover:bg-white/10 text-gray-300"
                }`}
              >
                Rendimiento
              </Button>
              <Button
                size="sm"
                variant={selectedDimension === "bienestar" ? "secondary" : "outline"}
                onClick={() => setSelectedDimension("bienestar")}
                className={`h-8 px-3 ${
                  selectedDimension === "bienestar" 
                    ? "bg-[#ffcc08]/20 hover:bg-[#ffcc08]/30 text-[#ffcc08]" 
                    : "bg-white/5 hover:bg-white/10 text-gray-300"
                }`}
              >
                Bienestar
              </Button>
              <Button
                size="sm"
                variant={selectedDimension === "salud" ? "secondary" : "outline"}
                onClick={() => setSelectedDimension("salud")}
                className={`h-8 px-3 ${
                  selectedDimension === "salud" 
                    ? "bg-[#ffcc08]/20 hover:bg-[#ffcc08]/30 text-[#ffcc08]" 
                    : "bg-white/5 hover:bg-white/10 text-gray-300"
                }`}
              >
                Salud
              </Button>
            </div>
          </div>

          {/* Tags Filter */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-[#C8C8C9]">Etiquetas</h3>
            <div className="flex flex-wrap gap-2">
              {["all", "estrés", "ansiedad", "meditación", "concentración", "productividad", "bienestar", "equilibrio", "energía", "flujo", "rendimiento"].map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className={`cursor-pointer whitespace-nowrap px-2 py-1 text-xs ${
                    selectedTag === tag 
                      ? "bg-[#ffcc08]/30 hover:bg-[#ffcc08]/40 text-[#ffcc08]" 
                      : "bg-white/10 hover:bg-white/20 text-gray-300"
                  }`}
                  onClick={() => setSelectedTag(tag as Tag)}
                >
                  {tag === "all" ? "Todas" : tag}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <Button 
              variant="outline" 
              className="w-full mt-4 border-dashed border-[#8A898C] text-[#C8C8C9]"
              onClick={() => {
                clearFilters();
                setOpen(false);
              }}
            >
              <X className="h-4 w-4 mr-2" />
              Limpiar filtros
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FilterSheet;
