import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Flower2, Wind } from "lucide-react";
import { ExerciseType, Tag } from "@/types/exercises";

interface ExerciseFiltersProps {
  selectedType: ExerciseType;
  setSelectedType: (type: ExerciseType) => void;
  selectedTag: Tag;
  setSelectedTag: (tag: Tag) => void;
}

const ExerciseFilters = ({
  selectedType,
  setSelectedType,
  selectedTag,
  setSelectedTag
}: ExerciseFiltersProps) => {
  return (
    <div className="bg-secondary/30 backdrop-blur-sm rounded-lg p-3">
      <div className="flex flex-col gap-3">
        {/* Exercise Type Filter */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={selectedType === "all" ? "secondary" : "outline"}
            onClick={() => setSelectedType("all")}
            className={`h-8 px-3 ${
              selectedType === "all" ? "bg-white/20" : "bg-white/5"
            }`}
          >
            Todos
          </Button>
          <Button
            size="sm"
            variant={selectedType === "meditation" ? "secondary" : "outline"}
            onClick={() => setSelectedType("meditation")}
            className={`h-8 px-3 ${
              selectedType === "meditation" ? "bg-white/20" : "bg-white/5"
            }`}
          >
            <Flower2 className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant={selectedType === "breathing" ? "secondary" : "outline"}
            onClick={() => setSelectedType("breathing")}
            className={`h-8 px-3 ${
              selectedType === "breathing" ? "bg-white/20" : "bg-white/5"
            }`}
          >
            <Wind className="w-4 h-4" />
          </Button>
        </div>

        {/* Tags Filter */}
        <div className="overflow-x-auto flex gap-2 pb-1">
          {["all", "estrés", "ansiedad", "relajación", "gratitud"].map((tag) => (
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

export default ExerciseFilters;