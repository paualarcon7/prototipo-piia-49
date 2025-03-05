
import { useParams } from "react-router-dom";
import { Routine } from "@/types/rutina";
import { protocols } from "@/pages/Protocolos"; // Importing mock protocols
import { RoutineInfoCard } from "@/components/routines/rutina-detalle/RoutineInfoCard";
import { RoutineEditForm } from "@/components/routines/rutina-detalle/RoutineEditForm";
import { RoutineDetailHeader } from "@/components/routines/rutina-detalle/RoutineDetailHeader";
import { RoutineDetailTabs } from "@/components/routines/rutina-detalle/RoutineDetailTabs";
import { DeleteRoutineDialog } from "@/components/routines/rutina-detalle/DeleteRoutineDialog";
import { useRoutineDetail } from "@/hooks/useRoutineDetail";

// Mock routine data (this would normally come from an API)
const mockRoutine: Routine = {
  id: "1",
  name: "Rutina de mañana",
  time: {
    start: "06:30",
    end: "07:15"
  },
  days: ["L", "M", "X", "J", "V"],
  protocols: [
    {
      protocol: {
        id: 1,
        title: "ALMA - PARTE 1: ACTIVA TU ENERGÍA Y DETECTA TU FLUJO",
        dimension: "bienestar",
        tags: ["energía", "flujo", "rendimiento"],
        duration: "15 min",
        description: "Descubre y potencia tu estado de flujo personal",
        icon: null
      },
      order: 0
    },
    {
      protocol: {
        id: 2,
        title: "Protocolo de Alto Rendimiento",
        dimension: "rendimiento",
        tags: ["concentración", "productividad"],
        duration: "30 min",
        description: "Optimiza tu rendimiento mental y físico",
        icon: null
      },
      order: 1
    }
  ],
  syncStatus: "synced",
  calendarId: "abc123",
  notification: {
    enabled: true,
    minutesBefore: 15
  },
  color: "#FF4081",
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

const RutinaDetalle = () => {
  const { id } = useParams<{ id: string }>();
  
  // In a real app, this would fetch the routine data from an API
  const {
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
  } = useRoutineDetail(mockRoutine);

  return (
    <div className="flex flex-col min-h-screen bg-transparent pb-28">
      {/* Header */}
      <RoutineDetailHeader 
        isEditing={isEditing} 
        toggleEditMode={toggleEditMode} 
        saveChanges={saveChanges} 
      />

      <div className="flex-1 px-4 py-6 overflow-auto">
        {/* Main content */}
        {isEditing ? (
          <RoutineEditForm
            routineName={routine.name}
            startTime={routine.time.start}
            endTime={routine.time.end}
            selectedDays={routine.days}
            onNameChange={handleNameChange}
            onStartTimeChange={handleStartTimeChange}
            onEndTimeChange={handleEndTimeChange}
            onDayToggle={handleDayToggle}
          />
        ) : (
          <RoutineInfoCard routine={routine} />
        )}
        
        {/* Tabs */}
        <RoutineDetailTabs
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          isEditing={isEditing}
          routine={routine}
          availableProtocols={protocols}
          onToggleEditMode={toggleEditMode}
          onAddProtocol={handleAddProtocol}
          onRemoveProtocol={handleRemoveProtocol}
          onReorderProtocols={handleReorderProtocols}
          onActiveToggle={handleActiveToggle}
          onNotificationToggle={handleNotificationToggle}
          onMinutesBeforeChange={handleMinutesBeforeChange}
          onColorChange={handleColorChange}
          onOpenDeleteDialog={() => setIsDeleteDialogOpen(true)}
        />
      </div>
      
      {/* Delete confirmation dialog */}
      <DeleteRoutineDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default RutinaDetalle;
