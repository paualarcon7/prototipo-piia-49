import { ChevronDown, ChevronUp, GripVertical, X } from "lucide-react";
import { RoutineProtocol } from "@/types/rutina";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { useProtocolDuration } from "@/hooks/routine/useProtocolDuration";
interface SelectedProtocolsPanelProps {
  selectedProtocols: RoutineProtocol[];
  isExpanded: boolean;
  onToggleExpanded: () => void;
  onDragStart: (index: number) => void;
  onDragOver: (e: React.DragEvent, index: number) => void;
  onDragEnd: () => void;
  onRemove: (index: number) => void;
  selectedPanelRef: React.RefObject<HTMLDivElement>;
  dragIndex: number | null;
}
export const SelectedProtocolsPanel = ({
  selectedProtocols,
  isExpanded,
  onToggleExpanded,
  onDragStart,
  onDragOver,
  onDragEnd,
  onRemove,
  selectedPanelRef,
  dragIndex
}: SelectedProtocolsPanelProps) => {
  const isMobile = useIsMobile();
  const {
    formattedDuration
  } = useProtocolDuration(selectedProtocols);
  if (selectedProtocols.length === 0) {
    return null;
  }
  return;
};