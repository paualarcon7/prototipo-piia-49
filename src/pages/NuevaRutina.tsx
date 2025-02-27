
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Clock, Calendar, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RoutineTimeSelector } from "@/components/routines/RoutineTimeSelector";
import { DaySelector } from "@/components/routines/DaySelector";
import { ProtocolSelector } from "@/components/routines/ProtocolSelector";
import { CalendarPreview } from "@/components/routines/CalendarPreview";
import { Routine, WeekDay } from "@/types/rutina";
import { Protocol } from "@/types/protocols";
import { protocols } from "@/pages/Protocolos"; // Importing mock protocols
import { RoutineProtocol } from "@/types/rutina";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

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
    // Here we would normally save to an API or state management
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
      color: "#FF4081", // Default color
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    console.log("New routine created:", newRoutine);
    
    // Navigate back to routines list
    navigate('/rutinas');
  };

  const renderStepIndicator = () => (
    <div className="flex justify-center mb-5">
      <div className="flex items-center space-x-2">
        {[1, 2, 3].map(s => (
          <div 
            key={s}
            className={`h-2.5 w-2.5 rounded-full ${
              s === step ? 'bg-[#FF4081]' : 
              s < step ? 'bg-gray-400' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-lg font-medium text-white">Nombre de la rutina</h2>
              <Input 
                value={routineName}
                onChange={e => setRoutineName(e.target.value)}
                placeholder="Mi rutina"
                className="bg-secondary/50 border-secondary/30 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-lg font-medium text-white">Horario</h2>
              <RoutineTimeSelector 
                startTime={startTime}
                endTime={endTime}
                onStartTimeChange={setStartTime}
                onEndTimeChange={setEndTime}
              />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-lg font-medium text-white">Días de la semana</h2>
              <DaySelector 
                selectedDays={selectedDays}
                onToggle={handleDayToggle}
              />
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-white">Selecciona los protocolos</h2>
            <ProtocolSelector
              availableProtocols={protocols}
              selectedProtocols={selectedProtocols}
              onAddProtocol={handleAddProtocol}
              onRemoveProtocol={handleRemoveProtocol}
              onReorderProtocols={handleReorderProtocols}
            />
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-white">Google Calendar</h2>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="gcal-toggle" className="text-white">
                Sincronizar con Google Calendar
              </Label>
              <Switch
                id="gcal-toggle"
                checked={isGoogleCalendarEnabled}
                onCheckedChange={setIsGoogleCalendarEnabled}
              />
            </div>
            
            {isGoogleCalendarEnabled && (
              <CalendarPreview 
                routineName={routineName}
                startTime={startTime}
                endTime={endTime}
                days={selectedDays}
              />
            )}
            
            <h2 className="text-lg font-medium text-white mt-4">Notificaciones</h2>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="notif-toggle" className="text-white">
                Recibir notificaciones
              </Label>
              <Switch
                id="notif-toggle"
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            </div>
            
            {notificationsEnabled && (
              <div className="w-full space-y-2">
                <Label className="text-gray-400 text-sm">Minutos antes</Label>
                <select 
                  value={minutesBefore}
                  onChange={e => setMinutesBefore(Number(e.target.value))}
                  className="w-full bg-secondary/50 border border-secondary/30 rounded-md p-2 text-white"
                >
                  <option value={5}>5 minutos</option>
                  <option value={10}>10 minutos</option>
                  <option value={15}>15 minutos</option>
                  <option value={30}>30 minutos</option>
                  <option value={60}>1 hora</option>
                </select>
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="flex flex-col h-screen bg-transparent pb-20">
      <div className="px-4 py-4 border-b border-secondary/20 backdrop-blur-sm sticky top-0 z-10 bg-secondary/10">
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
        {renderStepIndicator()}
      </div>

      <div className="flex-1 px-4 py-6 overflow-auto">
        {renderStepContent()}
      </div>

      <div className="fixed bottom-16 inset-x-0 p-4 bg-secondary/50 backdrop-blur-sm border-t border-secondary/20">
        <Button 
          onClick={handleNextStep}
          className="w-full bg-[#FF4081] hover:bg-[#FF4081]/90"
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
