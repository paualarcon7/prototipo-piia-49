
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Routine, WeekDay, RoutineProtocol } from "@/types/rutina";
import { Protocol } from "@/types/protocols";

export const useRoutineDetail = (initialRoutine: Routine) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [routine, setRoutine] = useState<Routine>(initialRoutine);
  const [originalRoutine, setOriginalRoutine] = useState<Routine>(initialRoutine);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTab, setSelectedTab] = useState("protocolos");

  const handleActiveToggle = () => {
    setRoutine(prev => ({
      ...prev,
      isActive: !prev.isActive
    }));
  };

  const handleNotificationToggle = () => {
    setRoutine(prev => ({
      ...prev,
      notification: {
        ...prev.notification,
        enabled: !prev.notification.enabled
      }
    }));
  };

  const handleDelete = () => {
    console.log("Deleting routine:", routine.id);
    toast({
      title: "Rutina eliminada",
      description: "La rutina ha sido eliminada exitosamente",
    });
    setIsDeleteDialogOpen(false);
    navigate("/rutinas");
  };

  const toggleEditMode = () => {
    if (isEditing) {
      setRoutine(originalRoutine);
      setIsEditing(false);
    } else {
      setOriginalRoutine({...routine});
      setIsEditing(true);
    }
  };

  const saveChanges = () => {
    setOriginalRoutine({...routine});
    setIsEditing(false);
    toast({
      title: "Cambios guardados",
      description: "Los cambios en la rutina se han guardado exitosamente",
    });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoutine(prev => ({
      ...prev,
      name: e.target.value
    }));
  };

  const handleDayToggle = (day: WeekDay) => {
    setRoutine(prev => ({
      ...prev,
      days: prev.days.includes(day) 
        ? prev.days.filter(d => d !== day)
        : [...prev.days, day]
    }));
  };

  const handleStartTimeChange = (time: string) => {
    setRoutine(prev => ({
      ...prev,
      time: {
        ...prev.time,
        start: time
      }
    }));
  };

  const handleEndTimeChange = (time: string) => {
    setRoutine(prev => ({
      ...prev,
      time: {
        ...prev.time,
        end: time
      }
    }));
  };

  const handleMinutesBeforeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRoutine(prev => ({
      ...prev,
      notification: {
        ...prev.notification,
        minutesBefore: Number(e.target.value)
      }
    }));
  };

  const handleAddProtocol = (protocol: Protocol) => {
    setRoutine(prev => ({
      ...prev,
      protocols: [
        ...prev.protocols,
        { protocol, order: prev.protocols.length }
      ]
    }));
    toast({
      title: "Protocolo añadido",
      description: `${protocol.title} ha sido añadido a la rutina`,
    });
  };

  const handleRemoveProtocol = (index: number) => {
    setRoutine(prev => ({
      ...prev,
      protocols: prev.protocols
        .filter((_, i) => i !== index)
        .map((p, i) => ({ ...p, order: i }))
    }));
    toast({
      title: "Protocolo eliminado",
      description: "El protocolo ha sido eliminado de la rutina",
    });
  };

  const handleReorderProtocols = (newOrder: RoutineProtocol[]) => {
    setRoutine(prev => ({
      ...prev,
      protocols: newOrder.map((p, i) => ({ ...p, order: i }))
    }));
  };

  const handleColorChange = (color: string) => {
    setRoutine(prev => ({
      ...prev,
      color
    }));
    
    // Optional: Show a toast when color is changed
    toast({
      title: "Color actualizado",
      description: "El color de la rutina ha sido actualizado",
    });
  };

  return {
    routine,
    isEditing,
    isDeleteDialogOpen,
    selectedTab,
    setSelectedTab,
    setIsDeleteDialogOpen,
    toggleEditMode,
    saveChanges,
    handleDelete,
    handleNameChange,
    handleDayToggle,
    handleStartTimeChange,
    handleEndTimeChange,
    handleAddProtocol,
    handleRemoveProtocol,
    handleReorderProtocols,
    handleActiveToggle,
    handleNotificationToggle,
    handleMinutesBeforeChange,
    handleColorChange
  };
};
