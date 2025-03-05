
import { useNewRoutineState } from "@/hooks/routine/useNewRoutineState";
import { protocols } from "@/pages/Protocolos"; // Importing mock protocols
import { BasicInfoStep } from "@/components/routines/nueva-rutina/BasicInfoStep";
import { ProtocolsStep } from "@/components/routines/nueva-rutina/ProtocolsStep";
import { SyncStep } from "@/components/routines/nueva-rutina/SyncStep";
import { PageHeader } from "@/components/routines/nueva-rutina/PageHeader";
import { BottomNav } from "@/components/routines/nueva-rutina/BottomNav";

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

  const renderStepContent = () => {
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
  
  return (
    <div className="flex flex-col h-screen bg-transparent pb-20">
      <PageHeader 
        currentStep={step} 
        onPrevStep={handlePrevStep} 
      />

      <div className="flex-1 px-4 py-6 overflow-auto">
        {renderStepContent()}
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
