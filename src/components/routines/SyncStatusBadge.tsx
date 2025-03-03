
import { Badge } from "@/components/ui/badge";
import { CloudCheck, CloudX, CloudOff } from "lucide-react";

type SyncStatus = "synced" | "pending" | "failed";

interface SyncStatusBadgeProps {
  status: SyncStatus;
}

export const SyncStatusBadge = ({ status }: SyncStatusBadgeProps) => {
  switch (status) {
    case "synced":
      return (
        <Badge className="bg-[#1A1F2C] text-[#9b87f5] border border-[#9b87f5]/30 gap-1">
          <CloudCheck className="h-3.5 w-3.5" />
          <span>Sincronizado</span>
        </Badge>
      );
    case "pending":
      return (
        <Badge className="bg-[#1A1F2C] text-[#8B5CF6] border border-[#8B5CF6]/30 gap-1">
          <CloudOff className="h-3.5 w-3.5" />
          <span>Pendiente</span>
        </Badge>
      );
    case "failed":
      return (
        <Badge className="bg-[#1A1F2C] text-[#D946EF] border border-[#D946EF]/30 gap-1">
          <CloudX className="h-3.5 w-3.5" />
          <span>Error</span>
        </Badge>
      );
    default:
      return null;
  }
};
