
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Routine } from "@/types/rutina";

export function useRoutineActions() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDelete = (routineId: string) => {
    console.log("Deleting routine:", routineId);
    toast({
      title: "Rutina eliminada",
      description: "La rutina ha sido eliminada exitosamente",
    });
    navigate("/rutinas");
  };

  const notifyChangesDiscarded = () => {
    toast({
      title: "Cambios cancelados",
      description: "Los cambios en la rutina han sido descartados",
    });
  };

  const notifyChangesSaved = () => {
    toast({
      title: "Cambios guardados",
      description: "Los cambios en la rutina se han guardado exitosamente",
    });
  };

  const notifyColorUpdated = () => {
    toast({
      title: "Color actualizado",
      description: "El color de la rutina ha sido actualizado",
    });
  };

  const notifyProtocolAdded = (protocolTitle: string) => {
    toast({
      title: "Protocolo añadido",
      description: `${protocolTitle} ha sido añadido a la rutina`,
    });
  };

  const notifyProtocolRemoved = () => {
    toast({
      title: "Protocolo eliminado",
      description: "El protocolo ha sido eliminado de la rutina",
    });
  };

  return {
    handleDelete,
    notifyChangesDiscarded,
    notifyChangesSaved,
    notifyColorUpdated,
    notifyProtocolAdded,
    notifyProtocolRemoved
  };
}
