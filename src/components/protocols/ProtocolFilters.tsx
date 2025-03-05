
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
      {/* Search bar and filter button in the same row */}
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <SearchBar 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
        <FilterSheet
          selectedDimension={selectedDimension}
          setSelectedDimension={setSelectedDimension}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          clearFilters={clearFilters}
          hasActiveFilters={hasActiveFilters}
        />
      </div>
      
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
