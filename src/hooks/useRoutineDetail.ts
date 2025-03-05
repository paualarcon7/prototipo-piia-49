
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
      // Cancel changes - restore original routine
      console.log("Canceling changes, restoring original color:", originalRoutine.color);
      setRoutine({...originalRoutine});
      setIsEditing(false);
      toast({
        title: "Cambios cancelados",
        description: "Los cambios en la rutina han sido descartados",
      });
    } else {
      // Enter edit mode - store current routine as original
      console.log("Entering edit mode, storing original color:", routine.color);
      setOriginalRoutine({...routine});
      setIsEditing(true);
    }
  };

  const saveChanges = () => {
    // Save changes - store current routine as original
    console.log("Saving changes, new color:", routine.color);
    setOriginalRoutine({...routine});
    setIsEditing(false);
    toast({
      title: "Cambios guardados",
      description: "Los cambios en la rutina se han guardado exitosamente",
    });
    console.log("Saving updated routine:", routine);
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
    console.log("handleColorChange called with color:", color);
    if (!isEditing) {
      console.log("Not in editing mode, ignoring color change");
      return;
    }
    
    setRoutine(prev => {
      const updatedRoutine = {
        ...prev,
        color
      };
      console.log("Updated routine with new color:", updatedRoutine.color);
      return updatedRoutine;
    });
    
    // Only show toast when in edit mode
    if (isEditing) {
      toast({
        title: "Color actualizado",
        description: "El color de la rutina ha sido actualizado",
      });
    }
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
