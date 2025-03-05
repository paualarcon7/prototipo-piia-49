import { useState } from "react";
import { Routine, WeekDay, ROUTINE_COLORS, RoutineProtocol } from "@/types/rutina";
import { Protocol } from "@/types/protocols";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useProtocolDuration } from "./useProtocolDuration";

// Generate a unique ID for the new routine
const generateId = () => Math.random().toString(36).substr(2, 9);

export function useNewRoutineState() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [routineName, setRoutineName] = useState("Mi nueva rutina");
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("08:30");
  const [selectedDays, setSelectedDays] = useState<WeekDay[]>(["L", "M", "X", "J", "V"]);
  const [selectedProtocols, setSelectedProtocols] = useState<RoutineProtocol[]>([]);
  const [isGoogleCalendarEnabled, setIsGoogleCalendarEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [minutesBefore, setMinutesBefore] = useState(15);
  const [selectedColor, setSelectedColor] = useState(ROUTINE_COLORS[0]);
  
  // Use our new custom hook for duration calculations
  const { calculateEndTime } = useProtocolDuration(selectedProtocols);

  const handleAddProtocol = (protocol: Protocol) => {
    setSelectedProtocols(prev => [
      ...prev,
      { protocol, order: prev.length }
    ]);
    
    // Automatically update endTime based on all protocols including the new one
    setEndTime(calculateEndTime(startTime));
    
    toast({
      title: "Protocolo añadido",
      description: `Se ha añadido "${protocol.title}" a tu rutina`,
      variant: "default",
    });
  };

  const handleRemoveProtocol = (index: number) => {
    const protocolName = selectedProtocols[index]?.protocol.title;
    setSelectedProtocols(prev => 
      prev.filter((_, i) => i !== index)
         .map((p, i) => ({ ...p, order: i }))
    );
    toast({
      title: "Protocolo eliminado",
      description: `Se ha eliminado "${protocolName || 'el protocolo'}" de tu rutina`,
      variant: "destructive",
    });
  };

  const handleReorderProtocols = (newOrder: RoutineProtocol[]) => {
    setSelectedProtocols(newOrder.map((p, i) => ({ ...p, order: i })));
  };

  const handleDayToggle = (day: WeekDay) => {
    setSelectedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    } else {
      handleSaveRoutine();
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    } else {
      navigate('/rutinas');
    }
  };

  const handleSaveRoutine = () => {
    const newRoutine: Routine = {
      id: generateId(),
      name: routineName,
      time: {
        start: startTime,
        end: endTime
      },
      days: selectedDays,
      protocols: selectedProtocols,
      syncStatus: isGoogleCalendarEnabled ? "pending" : "synced",
      notification: {
        enabled: notificationsEnabled,
        minutesBefore: minutesBefore
      },
      color: selectedColor,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    console.log("New routine created:", newRoutine);
    
    toast({
      title: "Rutina creada",
      description: `Se ha creado la rutina "${routineName}" correctamente`,
      variant: "default",
    });
    
    navigate('/rutinas');
  };

  return {
    step,
    routineName,
    startTime,
    endTime,
    selectedDays,
    selectedProtocols,
    isGoogleCalendarEnabled,
    notificationsEnabled,
    minutesBefore,
    selectedColor,
    setRoutineName,
    setStartTime,
    setEndTime,
    setIsGoogleCalendarEnabled,
    setNotificationsEnabled,
    setMinutesBefore,
    setSelectedColor,
    handleAddProtocol,
    handleRemoveProtocol,
    handleReorderProtocols,
    handleDayToggle,
    handleNextStep,
    handlePrevStep
  };
}
