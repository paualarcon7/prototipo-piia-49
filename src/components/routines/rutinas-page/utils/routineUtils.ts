
import { Routine, SortOption } from "@/types/rutina";

export const sortRoutines = (routinesToSort: Routine[], sortOption: SortOption): Routine[] => {
  switch (sortOption) {
    case "name":
      return [...routinesToSort].sort((a, b) => a.name.localeCompare(b.name));
    case "time":
      return [...routinesToSort].sort((a, b) => {
        // Convert time strings to minutes for comparison
        const aMinutes = convertTimeToMinutes(a.time.start);
        const bMinutes = convertTimeToMinutes(b.time.start);
        return aMinutes - bMinutes;
      });
    case "created":
      return [...routinesToSort].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    case "active":
      return [...routinesToSort].sort((a, b) => {
        if (a.isActive === b.isActive) return 0;
        return a.isActive ? -1 : 1;
      });
    default:
      return routinesToSort;
  }
};

export const convertTimeToMinutes = (timeStr: string): number => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
};
