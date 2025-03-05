
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useRoutines } from "@/hooks/useRoutines";
import { AllRoutinesView } from "@/components/routines/rutinas-page/AllRoutinesView";
import { ActiveRoutinesView } from "@/components/routines/rutinas-page/ActiveRoutinesView";

const Rutinas = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    filteredRoutines,
    activeRoutines,
    showAllView,
    setShowAllView,
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    sortBy,
    setSortBy,
    clearFilters
  } = useRoutines();

  return (
    <div className="flex flex-col min-h-screen bg-transparent pt-4 pb-20">
      {showAllView ? (
        <AllRoutinesView 
          filteredRoutines={filteredRoutines}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          sortBy={sortBy}
          setSortBy={setSortBy}
          clearFilters={clearFilters}
          setShowAllView={setShowAllView}
        />
      ) : (
        <ActiveRoutinesView 
          activeRoutines={activeRoutines}
          setShowAllView={setShowAllView}
        />
      )}
    </div>
  );
};

export default Rutinas;
