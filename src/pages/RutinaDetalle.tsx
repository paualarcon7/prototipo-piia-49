
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Edit, X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Routine, WeekDay, RoutineProtocol } from "@/types/rutina";
import { Protocol } from "@/types/protocols";
import { protocols } from "@/pages/Protocolos"; // Importing mock protocols
import { ProtocolSelector } from "@/components/routines/ProtocolSelector";
import { useToast } from "@/hooks/use-toast";
import { RoutineInfoCard } from "@/components/routines/rutina-detalle/RoutineInfoCard";
import { RoutineEditForm } from "@/components/routines/rutina-detalle/RoutineEditForm";
import { ProtocolsList } from "@/components/routines/rutina-detalle/ProtocolsList";
import { SettingsTab } from "@/components/routines/rutina-detalle/SettingsTab";

// Mock data for demonstration
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
        // Fixed: Use null directly instead of a function returning null
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
        // Fixed: Use null directly instead of a function returning null
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
  const navigate = useNavigate();
  const { toast } = useToast();
  const [routine, setRoutine] = useState<Routine>(mockRoutine);
  const [originalRoutine, setOriginalRoutine] = useState<Routine>(mockRoutine);
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
    console.log("Deleting routine:", id);
    toast({
      title: "Rutina eliminada",
      description: "La rutina ha sido eliminada exitosamente",
    });
    setIsDeleteDialogOpen(false);
    navigate("/rutinas");
  };

  const toggleEditMode = () => {
    if (isEditing) {
      // If we're cancelling edit mode, restore original routine
      setRoutine(originalRoutine);
      setIsEditing(false);
    } else {
      // Enter edit mode, save original routine for potential cancellation
      setOriginalRoutine({...routine});
      setIsEditing(true);
    }
  };

  const saveChanges = () => {
    // Here we would normally save to an API
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

  return (
    <div className="flex flex-col min-h-screen bg-transparent pb-28">
      {/* Header */}
      <div className="px-4 py-4 border-b border-secondary/20 backdrop-blur-sm sticky top-0 z-10 bg-secondary/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/rutinas')}
              className="text-white mr-2"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold font-oswald text-white">
              {isEditing ? "Editar rutina" : "Detalle de rutina"}
            </h1>
          </div>
          <div className="flex items-center">
            {isEditing ? (
              <>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={toggleEditMode}
                  className="text-white mr-1"
                  title="Cancelar"
                >
                  <X className="h-5 w-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={saveChanges}
                  className="text-[#FF4081]"
                  title="Guardar cambios"
                >
                  <Save className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleEditMode}
                className="text-white"
              >
                <Edit className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-6 overflow-auto">
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
        
        <Tabs 
          defaultValue="protocolos" 
          className="mb-10"
          value={selectedTab}
          onValueChange={setSelectedTab}
        >
          <TabsList className="w-full bg-secondary/50">
            <TabsTrigger value="protocolos" className="flex-1">
              Protocolos
            </TabsTrigger>
            <TabsTrigger value="ajustes" className="flex-1">
              Ajustes
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="protocolos" className="mt-4 space-y-4">
            {isEditing ? (
              <ProtocolSelector
                availableProtocols={protocols}
                selectedProtocols={routine.protocols}
                onAddProtocol={handleAddProtocol}
                onRemoveProtocol={handleRemoveProtocol}
                onReorderProtocols={handleReorderProtocols}
              />
            ) : (
              <ProtocolsList 
                protocols={routine.protocols}
                routineColor={routine.color}
                onEditMode={toggleEditMode}
              />
            )}
          </TabsContent>
          
          <TabsContent value="ajustes" className="mt-4 space-y-6">
            <SettingsTab
              routine={routine}
              isEditing={isEditing}
              onActiveToggle={handleActiveToggle}
              onNotificationToggle={handleNotificationToggle}
              onMinutesBeforeChange={handleMinutesBeforeChange}
              onOpenDeleteDialog={() => setIsDeleteDialogOpen(true)}
            />
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Delete Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-secondary border-secondary/20">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">¿Eliminar rutina?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              Esta acción no se puede deshacer. La rutina será eliminada permanentemente y se quitará de tu Google Calendar si está sincronizada.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border-secondary/20 text-white">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={handleDelete}
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default RutinaDetalle;
