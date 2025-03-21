
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBar = ({ searchTerm, setSearchTerm }: SearchBarProps) => {
  return (
    <div className="relative w-full">
      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-[#8A898C]" />
      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar protocolos"
        className="pl-7 h-8 bg-[#1A1F2C]/50 border-[#1A1F2C]/30 text-white text-xs py-1 pr-6"
      />
      {searchTerm && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-5 w-5 p-0"
          onClick={() => setSearchTerm("")}
        >
          <X className="h-3 w-3 text-[#8A898C]" />
        </Button>
      )}
    </div>
  );
};

export default SearchBar;
