
import { Check, Cloud, AlertCircle } from "lucide-react";
import { SyncStatus } from "@/types/rutina";

interface SyncStatusBadgeProps {
  status: SyncStatus;
}

export const SyncStatusBadge = ({ status }: SyncStatusBadgeProps) => {
  const getStatusInfo = () => {
    switch (status) {
      case "synced":
        return {
          text: "Sincronizado",
          icon: <Check className="h-3 w-3 mr-1" />,
          className: "bg-green-500/20 text-green-400"
        };
      case "pending":
        return {
          text: "Pendiente",
          icon: <Cloud className="h-3 w-3 mr-1" />,
          className: "bg-blue-500/20 text-blue-400"
        };
      case "failed":
        return {
          text: "Error",
          icon: <AlertCircle className="h-3 w-3 mr-1" />,
          className: "bg-red-500/20 text-red-400"
        };
      default:
        return {
          text: "Desconocido",
          icon: null,
          className: "bg-gray-500/20 text-gray-400"
        };
    }
  };

  const { text, icon, className } = getStatusInfo();

  return (
    <span className={`text-xs px-2 py-0.5 rounded-full flex items-center ${className}`}>
      {icon}
      {text}
    </span>
  );
};
