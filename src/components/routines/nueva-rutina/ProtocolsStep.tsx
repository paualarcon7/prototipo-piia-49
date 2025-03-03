
import { ProtocolSelector } from "@/components/routines/ProtocolSelector";
import { Protocol } from "@/types/protocols";
import { RoutineProtocol } from "@/types/rutina";

interface ProtocolsStepProps {
  availableProtocols: Protocol[];
  selectedProtocols: RoutineProtocol[];
  onAddProtocol: (protocol: Protocol) => void;
  onRemoveProtocol: (index: number) => void;
  onReorderProtocols: (protocols: RoutineProtocol[]) => void;
}

export const ProtocolsStep = ({
  availableProtocols,
  selectedProtocols,
  onAddProtocol,
  onRemoveProtocol,
  onReorderProtocols
}: ProtocolsStepProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-white">Selecciona los protocolos</h2>
      <ProtocolSelector
        availableProtocols={availableProtocols}
        selectedProtocols={selectedProtocols}
        onAddProtocol={onAddProtocol}
        onRemoveProtocol={onRemoveProtocol}
        onReorderProtocols={onReorderProtocols}
      />
    </div>
  );
};
