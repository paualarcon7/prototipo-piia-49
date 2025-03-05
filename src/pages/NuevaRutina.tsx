import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Routine, WeekDay } from "@/types/rutina";
import { Protocol } from "@/types/protocols";
import { protocols } from "@/pages/Protocolos"; // Importing mock protocols
import { RoutineProtocol } from "@/types/rutina";
import { StepIndicator } from "@/components/routines/nueva-rutina/StepIndicator";
import { BasicInfoStep } from "@/components/routines/nueva-rutina/BasicInfoStep";
import { ProtocolsStep } from "@/components/routines/nueva-rutina/ProtocolsStep";
import { SyncStep } from "@/components/routines/nueva-rutina/SyncStep";

// Generate a unique ID for the new routine
const generateId = () => Math.random().toString(36).substr(2, 9);

const NuevaRutina = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [routineName, setRoutineName] = useState("Mi nueva rutina");
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("08:30");
  const [selectedDays, setSelectedDays] = useState<WeekDay[]>(["L", "M", "X", "J", "V"]);
  const [selectedProtocols, setSelectedProtocols] = useState<RoutineProtocol[]>([]);
  const [isGoogleCalendarEnabled, setIsGoogleCalendarEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [minutesBefore, setMinutesBefore] = useState(15);

  const handleAddProtocol = (protocol: Protocol) => {
    setSelectedProtocols(prev => [
      ...prev,
      { protocol, order: prev.length }
    ]);
  };

  const handleRemoveProtocol = (index: number) => {
    setSelectedProtocols(prev => 
      prev.filter((_, i) => i !== index)
         .map((p, i) => ({ ...p, order: i }))
    );
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
    if (step < 3) setStep(step + 1);
    else handleSaveRoutine();
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
    else navigate('/rutinas');
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
      color: "#FF4081",
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    console.log("New routine created:", newRoutine);
    
    navigate('/rutinas');
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <BasicInfoStep
            routineName={routineName}
            startTime={startTime}
            endTime={endTime}
            selectedDays={selectedDays}
            onNameChange={(e) => setRoutineName(e.target.value)}
            onStartTimeChange={setStartTime}
            onDayToggle={handleDayToggle}
          />
        );
      
      case 2:
        return (
          <ProtocolsStep
            availableProtocols={protocols}
            selectedProtocols={selectedProtocols}
            onAddProtocol={handleAddProtocol}
            onRemoveProtocol={handleRemoveProtocol}
            onReorderProtocols={handleReorderProtocols}
          />
        );
      
      case 3:
        return (
          <SyncStep
            routineName={routineName}
            startTime={startTime}
            endTime={endTime}
            days={selectedDays}
            isGoogleCalendarEnabled={isGoogleCalendarEnabled}
            notificationsEnabled={notificationsEnabled}
            minutesBefore={minutesBefore}
            onGoogleCalendarToggle={setIsGoogleCalendarEnabled}
            onNotificationsToggle={setNotificationsEnabled}
            onMinutesBeforeChange={(e) => setMinutesBefore(Number(e.target.value))}
          />
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="flex flex-col h-screen bg-transparent pb-20">
      <div className="px-4 py-4 border-b border-[#1A1F2C]/20 backdrop-blur-sm sticky top-0 z-10 bg-[#1A1F2C]/10">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handlePrevStep}
            className="text-white mr-2"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold font-oswald text-white">
            {step === 1 ? "Crear nueva rutina" : 
             step === 2 ? "Seleccionar protocolos" : 
             "Configurar sincronización"}
          </h1>
        </div>
        <StepIndicator currentStep={step} totalSteps={3} />
      </div>

      <div className="flex-1 px-4 py-6 overflow-auto">
        {renderStepContent()}
      </div>

      <div className="fixed bottom-16 inset-x-0 p-4 bg-[#1A1F2C]/50 backdrop-blur-sm border-t border-[#1A1F2C]/20">
        <Button 
          onClick={handleNextStep}
          className="w-full bg-[#02b1bb] hover:bg-[#02b1bb]/80"
        >
          {step < 3 ? (
            <>
              Siguiente <ChevronRight className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Guardar rutina <Check className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default NuevaRutina;
