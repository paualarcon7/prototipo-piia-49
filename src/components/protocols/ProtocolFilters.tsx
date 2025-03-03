
import { useState } from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity, Heart, Stethoscope } from "lucide-react";
import { ProtocolDimension, Tag } from "@/types/protocols";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet";

interface ProtocolFiltersProps {
  selectedDimension: ProtocolDimension;
  setSelectedDimension: (dimension: ProtocolDimension) => void;
  selectedTag: Tag;
  setSelectedTag: (tag: Tag) => void;
  searchTerm?: string;
  setSearchTerm?: (term: string) => void;
  filteredProtocolsCount?: number;
}

const ProtocolFilters = ({
  selectedDimension,
  setSelectedDimension,
  selectedTag,
  setSelectedTag,
  searchTerm = "",
  setSearchTerm = () => {},
  filteredProtocolsCount = 0
}: ProtocolFiltersProps) => {
  const [showFilters, setShowFilters] = useState(false);
  
  const clearFilters = () => {
    setSelectedDimension("all");
    setSelectedTag("all");
    if (setSearchTerm) setSearchTerm("");
  };

  return (
    <div className="px-4 mb-4 sticky top-0 z-10 bg-[#1A1F2C]/10 backdrop-blur-sm pb-2 pt-2">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#8A898C]" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar protocolos"
            className="w-full bg-[#1A1F2C]/50 border-[#1A1F2C]/30 text-white pl-9 pr-8"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <X className="h-4 w-4 text-[#8A898C]" />
            </button>
          )}
        </div>
        
        <Button 
          variant="outline" 
          size="icon"
          onClick={() => setShowFilters(true)}
          className="bg-[#1A1F2C]/50 border-[#1A1F2C]/30 text-white"
        >
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </div>
      
      {(searchTerm || selectedDimension !== "all" || selectedTag !== "all") && (
        <div className="flex items-center justify-between mt-2 text-xs text-[#C8C8C9]">
          <span>
            {filteredProtocolsCount} resultado{filteredProtocolsCount !== 1 ? 's' : ''}
          </span>
          <button 
            onClick={clearFilters}
            className="text-[#02b1bb]"
          >
            Limpiar filtros
          </button>
        </div>
      )}

      <Sheet open={showFilters} onOpenChange={setShowFilters}>
        <SheetContent side="right" className="bg-[#1A1F2C]/95 border-[#1A1F2C]/30 w-[280px] sm:w-[350px]">
          <SheetHeader>
            <SheetTitle className="text-white">Filtros</SheetTitle>
            <SheetDescription className="text-[#C8C8C9]">
              Personaliza cómo quieres ver tus protocolos
            </SheetDescription>
          </SheetHeader>
          
          <div className="py-6 space-y-6">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-white">Dimensión</h3>
              <div className="flex flex-col space-y-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="radio" 
                    checked={selectedDimension === "all"} 
                    onChange={() => setSelectedDimension("all")}
                    className="form-radio text-[#02b1bb]"
                  />
                  <span className="text-[#C8C8C9]">Todas</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="radio" 
                    checked={selectedDimension === "rendimiento"} 
                    onChange={() => setSelectedDimension("rendimiento")}
                    className="form-radio text-[#02b1bb]"
                  />
                  <span className="text-[#C8C8C9]">Rendimiento</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="radio" 
                    checked={selectedDimension === "bienestar"} 
                    onChange={() => setSelectedDimension("bienestar")}
                    className="form-radio text-[#02b1bb]"
                  />
                  <span className="text-[#C8C8C9]">Bienestar</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="radio" 
                    checked={selectedDimension === "salud"} 
                    onChange={() => setSelectedDimension("salud")}
                    className="form-radio text-[#02b1bb]"
                  />
                  <span className="text-[#C8C8C9]">Salud</span>
                </label>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-white">Etiquetas</h3>
              <div className="flex flex-col space-y-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="radio" 
                    checked={selectedTag === "all"} 
                    onChange={() => setSelectedTag("all")}
                    className="form-radio text-[#02b1bb]"
                  />
                  <span className="text-[#C8C8C9]">Todas</span>
                </label>
                {["estrés", "ansiedad", "meditación", "concentración", "productividad", "bienestar", "equilibrio"].map((tag) => (
                  <label key={tag} className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="radio" 
                      checked={selectedTag === tag} 
                      onChange={() => setSelectedTag(tag as Tag)}
                      className="form-radio text-[#02b1bb]"
                    />
                    <span className="text-[#C8C8C9]">{tag}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          <SheetFooter className="flex flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              onClick={clearFilters}
              className="w-full border-[#8A898C] text-[#C8C8C9]"
            >
              Limpiar
            </Button>
            <SheetClose asChild>
              <Button className="w-full bg-[#02b1bb] hover:bg-[#02b1bb]/80">
                Aplicar
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ProtocolFilters;
