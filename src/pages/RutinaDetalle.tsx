
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ChevronLeft, Edit, Clock, Calendar, Trash2, Share2, 
  Bell, CheckCircle2, XCircle, PlayCircle 
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
import { Routine, WeekDay } from "@/types/rutina";

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
  const [routine, setRoutine] = useState<Routine>(mockRoutine);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
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
    setIsDeleteDialogOpen(false);
    navigate("/rutinas");
  };

  return (
    <div className="flex flex-col h-screen bg-transparent pb-20">
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
              Detalle de rutina
            </h1>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(`/rutinas/${id}/editar`)}
            className="text-white"
          >
            <Edit className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="px-4 py-6">
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
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="protocolos" className="mb-4">
          <TabsList className="w-full bg-secondary/50">
            <TabsTrigger value="protocolos" className="flex-1">
              Protocolos
            </TabsTrigger>
            <TabsTrigger value="ajustes" className="flex-1">
              Ajustes
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="protocolos" className="mt-4 space-y-4">
            <div className="space-y-3">
              {routine.protocols.map((item, index) => (
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
              ))}
            </div>
            
            <Button 
              variant="outline" 
              className="w-full mt-4 border-dashed border-gray-500 text-gray-400"
              onClick={() => navigate(`/rutinas/${id}/editar`)}
            >
              Añadir protocolo
            </Button>
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
                />
              </div>
              
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
