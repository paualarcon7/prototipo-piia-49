
import { useNewRoutineState } from "@/hooks/routine/useNewRoutineState";
import { protocols } from "@/pages/Protocolos"; // Importing mock protocols
import { PageHeader } from "@/components/routines/nueva-rutina/PageHeader";
import { BottomNav } from "@/components/routines/nueva-rutina/BottomNav";
import { StepContent } from "@/components/routines/nueva-rutina/StepContent";

const NuevaRutina = () => {
  const {
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
  } = useNewRoutineState();
  
  return (
    <div className="flex flex-col h-screen bg-transparent pb-20">
      <PageHeader 
        currentStep={step} 
        onPrevStep={handlePrevStep} 
      />

      <div className="flex-1 px-4 py-6 overflow-auto">
        <StepContent
          step={step}
          routineName={routineName}
          startTime={startTime}
          endTime={endTime}
          selectedDays={selectedDays}
          selectedProtocols={selectedProtocols}
          isGoogleCalendarEnabled={isGoogleCalendarEnabled}
          notificationsEnabled={notificationsEnabled}
          minutesBefore={minutesBefore}
          selectedColor={selectedColor}
          setRoutineName={setRoutineName}
          setStartTime={setStartTime}
          setIsGoogleCalendarEnabled={setIsGoogleCalendarEnabled}
          setNotificationsEnabled={setNotificationsEnabled}
          setMinutesBefore={setMinutesBefore}
          setSelectedColor={setSelectedColor}
          handleAddProtocol={handleAddProtocol}
          handleRemoveProtocol={handleRemoveProtocol}
          handleReorderProtocols={handleReorderProtocols}
          handleDayToggle={handleDayToggle}
          availableProtocols={protocols}
        />
      </div>

      <BottomNav 
        currentStep={step}
        totalSteps={3}
        onNextStep={handleNextStep}
      />
    </div>
  );
};

export default NuevaRutina;
