
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ChevronLeft, Edit, Clock, Calendar, Trash2, Share2, 
  Bell, CheckCircle2, XCircle, PlayCircle, Save, Plus,
  X, ArrowUp, ArrowDown, RotateCcw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SyncStatusBadge } from "@/components/routines/SyncStatusBadge";
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
import { Switch } from "@/components/ui/switch";
import { Routine, WeekDay, RoutineProtocol } from "@/types/rutina";
import { protocols } from "@/pages/Protocolos"; // Importing mock protocols
import { Protocol } from "@/types/protocols";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ProtocolSelector } from "@/components/routines/ProtocolSelector";
import { useToast } from "@/hooks/use-toast";
import { DaySelector } from "@/components/routines/DaySelector";
import { RoutineTimeSelector } from "@/components/routines/RoutineTimeSelector";

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
        icon: Calendar
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
        icon: Calendar
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
  const [showProtocolSelector, setShowProtocolSelector] = useState(false);
  
  // Format days for display
  const formatDays = (days: WeekDay[]) => {
    const dayMap: Record<WeekDay, string> = {
      "L": "Lunes",
      "M": "Martes",
      "X": "Miércoles",
      "J": "Jueves",
      "V": "Viernes",
      "S": "Sábado",
      "D": "Domingo"
    };
    
    if (days.length === 7) return "Todos los días";
    if (days.length === 5 && 
        days.includes("L") && 
        days.includes("M") && 
        days.includes("X") && 
        days.includes("J") && 
        days.includes("V")) {
      return "Lunes a viernes";
    }
    if (days.length === 2 && 
        days.includes("S") && 
        days.includes("D")) {
      return "Fines de semana";
    }
    
    return days.map(d => dayMap[d]).join(", ");
  };

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

  const moveProtocol = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || 
        (direction === 'down' && index === routine.protocols.length - 1)) {
      return;
    }

    const newProtocols = [...routine.protocols];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap positions
    [newProtocols[index], newProtocols[targetIndex]] = 
    [newProtocols[targetIndex], newProtocols[index]];
    
    // Update order values
    const updatedProtocols = newProtocols.map((p, i) => ({
      ...p,
      order: i
    }));

    setRoutine(prev => ({
      ...prev,
      protocols: updatedProtocols
    }));
  };

  const handleReorderProtocols = (newOrder: RoutineProtocol[]) => {
    setRoutine(prev => ({
      ...prev,
      protocols: newOrder.map((p, i) => ({ ...p, order: i }))
    }));
  };

  // Calculate total duration of all protocols
  const calculateTotalDuration = () => {
    let totalMinutes = 0;
    
    routine.protocols.forEach(({ protocol }) => {
      const durationMatch = protocol.duration.match(/(\d+)/);
      if (durationMatch) {
        totalMinutes += parseInt(durationMatch[0], 10);
      }
    });
    
    if (totalMinutes >= 60) {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return `${hours}h ${minutes > 0 ? `${minutes}m` : ""}`;
    }
    
    return `${totalMinutes}m`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent pb-28">
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

      <div className="flex-1 px-4 py-6 overflow-auto">
        {isEditing ? (
          // Edit mode UI
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Nombre de la rutina</label>
              <Input 
                value={routine.name}
                onChange={handleNameChange}
                className="bg-secondary/50 border-secondary/30 text-white text-lg font-semibold"
              />
            </div>
            
            <div className="space-y-3">
              <h3 className="text-sm text-gray-400">Horario</h3>
              <RoutineTimeSelector 
                startTime={routine.time.start}
                endTime={routine.time.end}
                onStartTimeChange={handleStartTimeChange}
                onEndTimeChange={handleEndTimeChange}
              />
            </div>
            
            <div className="space-y-3">
              <h3 className="text-sm text-gray-400">Días de la semana</h3>
              <DaySelector 
                selectedDays={routine.days}
                onToggle={handleDayToggle}
              />
            </div>
          </div>
        ) : (
          // View mode UI
          <div className="bg-gradient-to-br from-secondary/50 to-secondary/30 backdrop-blur-sm border border-secondary/20 rounded-lg p-5 mb-6">
            <h2 className="text-xl font-semibold text-white mb-3">{routine.name}</h2>
            
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <Clock className="h-4 w-4 mr-2 text-[#FF4081]" />
                <span>{routine.time.start} - {routine.time.end}</span>
              </div>
              
              <div className="flex items-center text-gray-300">
                <Calendar className="h-4 w-4 mr-2 text-[#FF4081]" />
                <span>{formatDays(routine.days)}</span>
              </div>
              
              <div className="flex items-center text-gray-300">
                <Bell className="h-4 w-4 mr-2 text-[#FF4081]" />
                <span>
                  {routine.notification.enabled 
                    ? `${routine.notification.minutesBefore} minutos antes` 
                    : "Notificaciones desactivadas"}
                </span>
              </div>
              
              <div className="flex items-center mt-4">
                <SyncStatusBadge status={routine.syncStatus} />
                {routine.protocols.length > 0 && (
                  <Badge className="ml-2 bg-secondary/70 text-white">
                    Duración total: {calculateTotalDuration()}
                  </Badge>
                )}
              </div>
            </div>
          </div>
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
              <>
                <div className="space-y-3">
                  {routine.protocols.length > 0 ? (
                    routine.protocols.map((item, index) => (
                      <div
                        key={`${item.protocol.id}-${index}`}
                        className="p-4 rounded-md bg-secondary/40 border border-secondary/20 flex items-center"
                      >
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                          style={{ backgroundColor: `${routine.color}30` }}
                        >
                          <span className="text-sm font-medium text-[#FF4081]">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white text-sm font-medium line-clamp-1">
                            {item.protocol.title}
                          </h4>
                          <div className="flex items-center mt-1">
                            <span className="text-xs text-gray-400 bg-secondary/70 px-2 py-0.5 rounded-full mr-2">
                              {item.protocol.dimension}
                            </span>
                            <span className="text-xs text-gray-400">
                              {item.protocol.duration}
                            </span>
                          </div>
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-white"
                          onClick={() => navigate(`/protocolos/${item.protocol.id}`)}
                        >
                          <PlayCircle className="h-5 w-5" />
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 bg-secondary/30 rounded-lg border border-secondary/20 backdrop-blur-sm">
                      <Calendar className="h-12 w-12 mx-auto text-gray-500 mb-3" />
                      <h3 className="text-white font-medium mb-2">No hay protocolos</h3>
                      <p className="text-gray-400 text-sm mb-4 max-w-xs mx-auto">
                        Esta rutina no tiene protocolos. Añade protocolos para comenzar a organizar tu tiempo.
                      </p>
                      <Button 
                        variant="outline" 
                        className="border-dashed border-gray-500 text-gray-400"
                        onClick={toggleEditMode}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Añadir protocolos
                      </Button>
                    </div>
                  )}
                </div>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="ajustes" className="mt-4 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Estado de la rutina</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Activa o desactiva temporalmente esta rutina
                  </p>
                </div>
                <Switch
                  checked={routine.isActive}
                  onCheckedChange={handleActiveToggle}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Notificaciones</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    Recibe recordatorios antes de comenzar
                  </p>
                </div>
                <Switch
                  checked={routine.notification.enabled}
                  onCheckedChange={handleNotificationToggle}
                  disabled={!isEditing}
                />
              </div>
              
              {routine.notification.enabled && (
                <div className="pl-6 mt-2">
                  <label className="text-sm text-gray-400 block mb-2">
                    Avisar antes
                  </label>
                  <select 
                    value={routine.notification.minutesBefore}
                    onChange={handleMinutesBeforeChange}
                    className="w-full bg-secondary/50 border border-secondary/30 rounded-md p-2 text-white"
                    disabled={!isEditing}
                  >
                    <option value={5}>5 minutos</option>
                    <option value={10}>10 minutos</option>
                    <option value={15}>15 minutos</option>
                    <option value={30}>30 minutos</option>
                    <option value={60}>1 hora</option>
                  </select>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-medium">Google Calendar</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {routine.syncStatus === "synced" 
                      ? "Sincronizado con tu calendario" 
                      : "Sincronizar con tu calendario"}
                  </p>
                </div>
                <Button variant="outline" size="sm" className="text-xs">
                  Configurar
                </Button>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full mt-6 text-[#FF4081] border-[#FF4081]/20"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Compartir rutina
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full mt-2 text-red-500 border-red-500/20"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Eliminar rutina
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
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
