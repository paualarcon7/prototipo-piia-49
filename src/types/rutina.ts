
import { Protocol } from "./protocols";

export type WeekDay = "L" | "M" | "X" | "J" | "V" | "S" | "D";

export type SyncStatus = "synced" | "pending" | "failed";

export type SortOption = "name" | "time" | "created" | "active";

export interface RoutineProtocol {
  protocol: Protocol;
  order: number;
}

export interface Routine {
  id: string;
  name: string;
  time: {
    start: string; // Format: "HH:MM"
    end: string;   // Format: "HH:MM"
  };
  days: WeekDay[];
  protocols: RoutineProtocol[];
  syncStatus: SyncStatus;
  calendarId?: string;
  notification: {
    enabled: boolean;
    minutesBefore: number;
  };
  color: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Predefined color options for routines
export const ROUTINE_COLORS = [
  "#FF4081", // Pink (default)
  "#02b1bb", // Teal
  "#9b87f5", // Purple
  "#F97316", // Orange
  "#0EA5E9", // Blue
  "#10B981", // Green
  "#F43F5E", // Red
  "#8B5CF6", // Violet
  "#FACC15", // Yellow
  "#64748B"  // Slate
];
