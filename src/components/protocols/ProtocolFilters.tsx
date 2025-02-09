
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity, Heart, Stethoscope } from "lucide-react";
import { ProtocolDimension, Tag } from "@/types/protocols";

interface ProtocolFiltersProps {
  selectedDimension: ProtocolDimension;
  setSelectedDimension: (dimension: ProtocolDimension) => void;
  selectedTag: Tag;
  setSelectedTag: (tag: Tag) => void;
}

const ProtocolFilters = ({
  selectedDimension,
  setSelectedDimension,
  selectedTag,
  setSelectedTag
}: ProtocolFiltersProps) => {
  return (
    <div className="bg-secondary/30 backdrop-blur-sm rounded-lg p-3">
      <div className="flex flex-col gap-3">
        {/* Dimension Filter */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={selectedDimension === "all" ? "secondary" : "outline"}
            onClick={() => setSelectedDimension("all")}
            className={`h-8 px-3 ${
              selectedDimension === "all" ? "bg-white/20" : "bg-white/5"
            }`}
          >
            Todos
          </Button>
          <Button
            size="sm"
            variant={selectedDimension === "rendimiento" ? "secondary" : "outline"}
            onClick={() => setSelectedDimension("rendimiento")}
            className={`h-8 px-3 ${
              selectedDimension === "rendimiento" ? "bg-white/20" : "bg-white/5"
            }`}
          >
            <Activity className="w-4 h-4 mr-2" />
            Rendimiento
          </Button>
          <Button
            size="sm"
            variant={selectedDimension === "bienestar" ? "secondary" : "outline"}
            onClick={() => setSelectedDimension("bienestar")}
            className={`h-8 px-3 ${
              selectedDimension === "bienestar" ? "bg-white/20" : "bg-white/5"
            }`}
          >
            <Heart className="w-4 h-4 mr-2" />
            Bienestar
          </Button>
          <Button
            size="sm"
            variant={selectedDimension === "salud" ? "secondary" : "outline"}
            onClick={() => setSelectedDimension("salud")}
            className={`h-8 px-3 ${
              selectedDimension === "salud" ? "bg-white/20" : "bg-white/5"
            }`}
          >
            <Stethoscope className="w-4 h-4 mr-2" />
            Salud
          </Button>
        </div>

        {/* Tags Filter */}
        <div className="overflow-x-auto flex gap-2 pb-1">
          {["all", "estrés", "ansiedad", "meditación", "concentración", "productividad", "bienestar", "equilibrio"].map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className={`cursor-pointer whitespace-nowrap px-2 py-1 text-xs ${
                selectedTag === tag 
                  ? "bg-white/30 hover:bg-white/40" 
                  : "bg-white/10 hover:bg-white/20"
              }`}
              onClick={() => setSelectedTag(tag as Tag)}
            >
              {tag === "all" ? "Todas" : tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProtocolFilters;
