
import { ProtocolDimension, Tag } from "@/types/protocols";
import { useState } from "react";
import { FilterSheet, SearchBar, ActiveFilters } from "./filters";

interface ProtocolFiltersProps {
  selectedDimension: ProtocolDimension;
  setSelectedDimension: (dimension: ProtocolDimension) => void;
  selectedTag: Tag;
  setSelectedTag: (tag: Tag) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const ProtocolFilters = ({
  selectedDimension,
  setSelectedDimension,
  selectedTag,
  setSelectedTag,
  searchTerm,
  setSearchTerm
}: ProtocolFiltersProps) => {
  const clearFilters = () => {
    setSelectedDimension("all");
    setSelectedTag("all");
  };

  const hasActiveFilters = selectedDimension !== "all" || selectedTag !== "all";

  return (
    <div className="bg-[#1A1F2C]/60 backdrop-blur-sm rounded-lg p-4 border border-[#1A1F2C]/20 space-y-3">
      {/* Filter button first */}
      <div className="flex justify-end mb-2">
        <FilterSheet
          selectedDimension={selectedDimension}
          setSelectedDimension={setSelectedDimension}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          clearFilters={clearFilters}
          hasActiveFilters={hasActiveFilters}
        />
      </div>

      {/* Search bar below the filter button */}
      <SearchBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      
      {/* Active Filters Display */}
      <ActiveFilters
        selectedDimension={selectedDimension}
        setSelectedDimension={setSelectedDimension}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        clearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
      />
    </div>
  );
};

export default ProtocolFilters;
