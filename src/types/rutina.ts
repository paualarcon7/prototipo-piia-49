
import { Protocol } from "./protocols";

export type WeekDay = "L" | "M" | "X" | "J" | "V" | "S" | "D";

export type SyncStatus = "synced" | "pending" | "failed";

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
