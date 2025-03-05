
import { useState, useEffect } from "react";
import { Routine } from "@/types/rutina";
import { sortRoutines } from "@/components/routines/rutinas-page/utils/routineUtils";

// Mock data imported from a separate file
import { mockRoutines } from "@/data/mockRoutines";

export function useRoutines() {
  const [routines, setRoutines] = useState<Routine[]>(mockRoutines);
  const [filteredRoutines, setFilteredRoutines] = useState<Routine[]>(mockRoutines);
  const [activeRoutines, setActiveRoutines] = useState<Routine[]>([]);
  const [showAllView, setShowAllView] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");
  const [sortBy, setSortBy] = useState<"name" | "time" | "created" | "active">("time");

  useEffect(() => {
    // Get active routines
    setActiveRoutines(routines.filter(r => r.isActive));
    
    // Apply filters and sorting for the filtered routines
    let filtered = [...routines];
    
    // Apply status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter(r => 
        filterStatus === "active" ? r.isActive : !r.isActive
      );
    }
    
    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(r => 
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.protocols.some(p => 
          p.protocol.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.protocol.dimension.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.protocol.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      );
    }
    
    // Apply sorting
    filtered = sortRoutines(filtered, sortBy);
    
    setFilteredRoutines(filtered);
  }, [routines, searchTerm, filterStatus, sortBy]);

  const clearFilters = () => {
    setSearchTerm("");
    setFilterStatus("all");
    setSortBy("time");
  };

  return {
    routines,
    setRoutines,
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
  };
}
