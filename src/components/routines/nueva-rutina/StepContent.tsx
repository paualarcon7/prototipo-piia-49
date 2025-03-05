
import { BasicInfoStep } from "@/components/routines/nueva-rutina/BasicInfoStep";
import { ProtocolsStep } from "@/components/routines/nueva-rutina/ProtocolsStep";
import { SyncStep } from "@/components/routines/nueva-rutina/SyncStep";
import { Protocol } from "@/types/protocols";
import { WeekDay, RoutineProtocol } from "@/types/rutina";

interface StepContentProps {
  step: number;
  routineName: string;
  startTime: string;
  endTime: string;
  selectedDays: WeekDay[];
  selectedProtocols: RoutineProtocol[];
  isGoogleCalendarEnabled: boolean;
  notificationsEnabled: boolean;
  minutesBefore: number;
  selectedColor: string;
  setRoutineName: (name: string) => void;
  setStartTime: (time: string) => void;
  setIsGoogleCalendarEnabled: (enabled: boolean) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  setMinutesBefore: (minutes: number) => void;
  setSelectedColor: (color: string) => void;
  handleAddProtocol: (protocol: Protocol) => void;
  handleRemoveProtocol: (index: number) => void;
  handleReorderProtocols: (protocols: RoutineProtocol[]) => void;
  handleDayToggle: (day: WeekDay) => void;
  availableProtocols: Protocol[];
}

export const StepContent = ({
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
  setIsGoogleCalendarEnabled,
  setNotificationsEnabled,
  setMinutesBefore,
  setSelectedColor,
  handleAddProtocol,
  handleRemoveProtocol,
  handleReorderProtocols,
  handleDayToggle,
  availableProtocols
}: StepContentProps) => {
  switch (step) {
    case 1:
      return (
        <BasicInfoStep
          routineName={routineName}
          startTime={startTime}
          endTime={endTime}
          selectedDays={selectedDays}
          selectedProtocols={selectedProtocols}
          onNameChange={(e) => setRoutineName(e.target.value)}
          onStartTimeChange={setStartTime}
          onDayToggle={handleDayToggle}
        />
      );
    
    case 2:
      return (
        <ProtocolsStep
          availableProtocols={availableProtocols}
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
          selectedColor={selectedColor}
          isGoogleCalendarEnabled={isGoogleCalendarEnabled}
          notificationsEnabled={notificationsEnabled}
          minutesBefore={minutesBefore}
          onGoogleCalendarToggle={setIsGoogleCalendarEnabled}
          onNotificationsToggle={setNotificationsEnabled}
          onMinutesBeforeChange={(e) => setMinutesBefore(Number(e.target.value))}
          onColorChange={setSelectedColor}
        />
      );
    
    default:
      return null;
  }
};
