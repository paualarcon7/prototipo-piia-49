
import { Routine, RoutineProtocol } from "@/types/rutina";
import { Protocol } from "@/types/protocols";

export function useRoutineProtocols(routine: Routine, setRoutine: React.Dispatch<React.SetStateAction<Routine>>) {
  const handleAddProtocol = (protocol: Protocol) => {
    setRoutine(prev => ({
      ...prev,
      protocols: [
        ...prev.protocols,
        { protocol, order: prev.protocols.length }
      ]
    }));
    return protocol.title; // Return the title for use in toast messages
  };

  const handleRemoveProtocol = (index: number) => {
    setRoutine(prev => ({
      ...prev,
      protocols: prev.protocols
        .filter((_, i) => i !== index)
        .map((p, i) => ({ ...p, order: i }))
    }));
  };

  const handleReorderProtocols = (newOrder: RoutineProtocol[]) => {
    setRoutine(prev => ({
      ...prev,
      protocols: newOrder.map((p, i) => ({ ...p, order: i }))
    }));
  };

  return {
    handleAddProtocol,
    handleRemoveProtocol,
    handleReorderProtocols
  };
}
