
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Routine } from "@/types/rutina";
import { RoutineCard } from "@/components/routines/RoutineCard";
import { SearchFilters } from "./SearchFilters";
import { NoResultsView } from "./NoResultsView";

interface AllRoutinesViewProps {
  filteredRoutines: Routine[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterStatus: "all" | "active" | "inactive";
  setFilterStatus: (status: "all" | "active" | "inactive") => void;
  sortBy: "name" | "time" | "created" | "active";
  setSortBy: (sort: "name" | "time" | "created" | "active") => void;
  clearFilters: () => void;
  setShowAllView: (show: boolean) => void;
}

export const AllRoutinesView = ({
  filteredRoutines,
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
  sortBy,
  setSortBy,
  clearFilters,
  setShowAllView
}: AllRoutinesViewProps) => {
  const navigate = useNavigate();

  const handleRoutineClick = (routine: Routine) => {
    navigate(`/rutinas/${routine.id}`);
  };

  return (
    <>
      <div className="flex items-center mb-2 px-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setShowAllView(false)}
          className="text-white mr-2"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold font-oswald text-white">Todas las rutinas</h1>
      </div>
      
      <SearchFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        sortBy={sortBy}
        setSortBy={setSortBy}
        filteredRoutinesCount={filteredRoutines.length}
        clearFilters={clearFilters}
      />
      
      <div className="px-4 space-y-3 pb-4">
        {filteredRoutines.length > 0 ? (
          filteredRoutines.map(routine => (
            <RoutineCard 
              key={routine.id} 
              routine={routine} 
              onClick={() => handleRoutineClick(routine)}
            />
          ))
        ) : (
          <NoResultsView clearFilters={clearFilters} />
        )}
      </div>
      
      <Button
        onClick={() => navigate('/rutinas/nueva')}
        className="fixed right-4 bottom-24 bg-[#02b1bb] hover:bg-[#02b1bb]/80 rounded-full h-14 w-14 shadow-lg flex items-center justify-center"
      >
        <Plus className="h-7 w-7" />
      </Button>
    </>
  );
};
