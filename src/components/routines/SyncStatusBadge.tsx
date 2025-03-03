
import { Badge } from "@/components/ui/badge";
import { Cloud, CloudOff, AlertCircle } from "lucide-react";

type SyncStatus = "synced" | "pending" | "failed";

interface SyncStatusBadgeProps {
  status: SyncStatus;
}

export const SyncStatusBadge = ({ status }: SyncStatusBadgeProps) => {
  switch (status) {
    case "synced":
      return (
        <Badge className="bg-[#1A1F2C] text-[#ff4081] border border-[#ff4081]/30 gap-1">
          <Cloud className="h-3.5 w-3.5" />
          <span>Sincronizado</span>
        </Badge>
      );
    case "pending":
      return (
        <Badge className="bg-[#1A1F2C] text-[#ffcc08] border border-[#ffcc08]/30 gap-1">
          <CloudOff className="h-3.5 w-3.5" />
          <span>Pendiente</span>
        </Badge>
      );
    case "failed":
      return (
        <Badge className="bg-[#1A1F2C] text-[#ff4081] border border-[#ff4081]/30 gap-1">
          <AlertCircle className="h-3.5 w-3.5" />
          <span>Error</span>
        </Badge>
      );
    default:
      return null;
  }
};
