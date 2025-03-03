
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Calendar, ArrowRight, CheckCircle2, Search, X, Filter, SlidersHorizontal, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WeekView } from "@/components/routines/WeekView";
import { RoutineCard } from "@/components/routines/RoutineCard";
import { Routine } from "@/types/rutina";
import { SyncStatusBadge } from "@/components/routines/SyncStatusBadge";
import { EmptyRoutinesState } from "@/components/routines/EmptyRoutinesState";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";

// Mock data for demonstration purposes
const mockRoutines: Routine[] = [
  {
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
  },
  {
    id: "2",
    name: "Rutina de noche",
    time: {
      start: "21:00",
      end: "22:00"
    },
    days: ["L", "M", "X", "J", "V", "S", "D"],
    protocols: [
      {
        protocol: {
          id: 3,
          title: "Meditación para dormir",
          dimension: "bienestar",
          tags: ["meditación", "bienestar"],
          duration: "20 min",
          description: "Meditación guiada para conciliar el sueño",
          icon: Calendar
        },
        order: 0
      }
    ],
    syncStatus: "pending",
    notification: {
      enabled: true,
      minutesBefore: 10
    },
    color: "#5E35B1",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "3",
    name: "Rutina de fin de semana",
    time: {
      start: "10:00",
      end: "11:30"
    },
    days: ["S", "D"],
    protocols: [
      {
        protocol: {
          id: 4,
          title: "Yoga matutino",
          dimension: "bienestar",
          tags: ["meditación", "energía"],
          duration: "45 min",
          description: "Sesión de yoga para comenzar el día con energía",
          icon: Calendar
        },
        order: 0
      },
      {
        protocol: {
          id: 5,
          title: "Planificación semanal",
          dimension: "rendimiento",
          tags: ["concentración", "productividad"],
          duration: "30 min",
          description: "Organiza tus metas y tareas de la semana",
          icon: Calendar
        },
        order: 1
      }
    ],
    syncStatus: "failed",
    notification: {
      enabled: false,
      minutesBefore: 15
    },
    color: "#43A047",
    isActive: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Sorting options
type SortOption = "name" | "time" | "created" | "active";

const Rutinas = () => {
  const [routines, setRoutines] = useState<Routine[]>(mockRoutines);
  const [filteredRoutines, setFilteredRoutines] = useState<Routine[]>(mockRoutines);
  const [activeRoutines, setActiveRoutines] = useState<Routine[]>([]);
  const [showAllView, setShowAllView] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");
  const [sortBy, setSortBy] = useState<SortOption>("time");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Get active routines
    setActiveRoutines(routines.filter(r => r.isActive));
    
    // Apply filters and sorting for the filtered routines
    let filtered = [...routines];
    
    // Apply status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter(r => 
        filterStatus === "active" ? r.isActive : !r.isActive
      );
    }
    
    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(r => 
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.protocols.some(p => 
          p.protocol.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.protocol.dimension.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.protocol.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      );
    }
    
    // Apply sorting
    filtered = sortRoutines(filtered, sortBy);
    
    setFilteredRoutines(filtered);
  }, [routines, searchTerm, filterStatus, sortBy]);

  const sortRoutines = (routinesToSort: Routine[], sortOption: SortOption): Routine[] => {
    switch (sortOption) {
      case "name":
        return [...routinesToSort].sort((a, b) => a.name.localeCompare(b.name));
      case "time":
        return [...routinesToSort].sort((a, b) => {
          // Convert time strings to minutes for comparison
          const aMinutes = convertTimeToMinutes(a.time.start);
          const bMinutes = convertTimeToMinutes(b.time.start);
          return aMinutes - bMinutes;
        });
      case "created":
        return [...routinesToSort].sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "active":
        return [...routinesToSort].sort((a, b) => {
          if (a.isActive === b.isActive) return 0;
          return a.isActive ? -1 : 1;
        });
      default:
        return routinesToSort;
    }
  };

  const convertTimeToMinutes = (timeStr: string): number => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const handleRoutineClick = (routine: Routine) => {
    navigate(`/rutinas/${routine.id}`);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilterStatus("all");
    setSortBy("time");
    setShowFilters(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent pt-4 pb-20">
      {showAllView ? (
        // "Ver todas" view
        <>
          <div className="px-4 mb-4 sticky top-0 z-10 bg-[#1A1F2C]/10 backdrop-blur-sm pb-2 pt-2">
            <div className="flex items-center mb-2">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowAllView(false)}
                className="text-white mr-2"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-bold font-oswald text-white">Todas las rutinas</h1>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#8A898C]" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar rutinas"
                  className="w-full bg-[#1A1F2C]/50 border-[#1A1F2C]/30 text-white pl-9 pr-8"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <X className="h-4 w-4 text-[#8A898C]" />
                  </button>
                )}
              </div>
              
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setShowFilters(true)}
                className="bg-[#1A1F2C]/50 border-[#1A1F2C]/30 text-white"
              >
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
            
            {(searchTerm || filterStatus !== "all" || sortBy !== "time") && (
              <div className="flex items-center justify-between mt-2 text-xs text-[#C8C8C9]">
                <span>
                  {filteredRoutines.length} resultado{filteredRoutines.length !== 1 ? 's' : ''}
                </span>
                <button 
                  onClick={clearFilters}
                  className="text-[#02b1bb]"
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
          
          <div className="px-4 space-y-3 pb-4">
            {filteredRoutines.length > 0 ? (
              filteredRoutines.map(routine => (
                <RoutineCard 
                  key={routine.id} 
                  routine={routine} 
                  onClick={() => handleRoutineClick(routine)}
                />
              ))
            ) : (
              <div className="text-center py-10 bg-[#1A1F2C]/30 rounded-lg border border-[#1A1F2C]/20 backdrop-blur-sm">
                <Search className="h-12 w-12 mx-auto text-[#8A898C] mb-3" />
                <h3 className="text-white font-medium mb-2">No se encontraron rutinas</h3>
                <p className="text-[#C8C8C9] text-sm mb-4 max-w-xs mx-auto">
                  No hay rutinas que coincidan con tu búsqueda o filtros.
                </p>
                <Button 
                  variant="outline" 
                  onClick={clearFilters}
                  className="border-[#02b1bb] text-[#02b1bb]"
                >
                  Limpiar filtros
                </Button>
              </div>
            )}
          </div>
          
          {/* Botón flotante para añadir nueva rutina */}
          <Button
            onClick={() => navigate('/rutinas/nueva')}
            className="fixed right-4 bottom-24 bg-[#02b1bb] hover:bg-[#02b1bb]/80 rounded-full h-14 w-14 shadow-lg flex items-center justify-center"
          >
            <Plus className="h-7 w-7" />
          </Button>
          
          <Sheet open={showFilters} onOpenChange={setShowFilters}>
            <SheetContent side="right" className="bg-[#1A1F2C]/95 border-[#1A1F2C]/30 w-[280px] sm:w-[350px]">
              <SheetHeader>
                <SheetTitle className="text-white">Filtros y orden</SheetTitle>
                <SheetDescription className="text-[#C8C8C9]">
                  Personaliza cómo quieres ver tus rutinas
                </SheetDescription>
              </SheetHeader>
              
              <div className="py-6 space-y-6">
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-white">Estado</h3>
                  <div className="flex flex-col space-y-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="radio" 
                        checked={filterStatus === "all"} 
                        onChange={() => setFilterStatus("all")}
                        className="form-radio text-[#02b1bb]"
                      />
                      <span className="text-[#C8C8C9]">Todas</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="radio" 
                        checked={filterStatus === "active"} 
                        onChange={() => setFilterStatus("active")}
                        className="form-radio text-[#02b1bb]"
                      />
                      <span className="text-[#C8C8C9]">Activas</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="radio" 
                        checked={filterStatus === "inactive"} 
                        onChange={() => setFilterStatus("inactive")}
                        className="form-radio text-[#02b1bb]"
                      />
                      <span className="text-[#C8C8C9]">Inactivas</span>
                    </label>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-white">Ordenar por</h3>
                  <div className="flex flex-col space-y-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="radio" 
                        checked={sortBy === "time"} 
                        onChange={() => setSortBy("time")}
                        className="form-radio text-[#02b1bb]"
                      />
                      <span className="text-[#C8C8C9]">Hora del día</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="radio" 
                        checked={sortBy === "name"} 
                        onChange={() => setSortBy("name")}
                        className="form-radio text-[#02b1bb]"
                      />
                      <span className="text-[#C8C8C9]">Nombre</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="radio" 
                        checked={sortBy === "created"} 
                        onChange={() => setSortBy("created")}
                        className="form-radio text-[#02b1bb]"
                      />
                      <span className="text-[#C8C8C9]">Fecha de creación</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="radio" 
                        checked={sortBy === "active"} 
                        onChange={() => setSortBy("active")}
                        className="form-radio text-[#02b1bb]"
                      />
                      <span className="text-[#C8C8C9]">Estado (activas primero)</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <SheetFooter className="flex flex-col sm:flex-row gap-2">
                <Button 
                  variant="outline" 
                  onClick={clearFilters}
                  className="w-full border-[#8A898C] text-[#C8C8C9]"
                >
                  Limpiar
                </Button>
                <SheetClose asChild>
                  <Button className="w-full bg-[#02b1bb] hover:bg-[#02b1bb]/80">
                    Aplicar
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </>
      ) : (
        // Regular view
        <>
          <div className="px-4 mb-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold font-oswald text-white">Mis Rutinas</h1>
            <Button 
              onClick={() => navigate('/rutinas/nueva')}
              size="icon"
              className="bg-[#02b1bb] hover:bg-[#02b1bb]/80 rounded-full h-10 w-10 shadow-lg transition-transform hover:scale-105"
            >
              <Plus className="h-6 w-6" />
            </Button>
          </div>

          <WeekView routines={activeRoutines} />

          <div className="px-4 mt-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-white">Rutinas activas</h2>
              <Button 
                variant="link" 
                className="text-[#02b1bb] p-0"
                onClick={() => setShowAllView(true)}
              >
                Ver todas <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3 overflow-y-auto pb-4">
              {activeRoutines.length > 0 ? (
                activeRoutines.slice(0, 3).map(routine => (
                  <RoutineCard 
                    key={routine.id} 
                    routine={routine} 
                    onClick={() => handleRoutineClick(routine)}
                  />
                ))
              ) : (
                <EmptyRoutinesState onCreateClick={() => navigate('/rutinas/nueva')} />
              )}
              
              {activeRoutines.length > 3 && (
                <Button
                  variant="outline"
                  className="w-full mt-2 border-[#02b1bb]/20 text-[#02b1bb]"
                  onClick={() => setShowAllView(true)}
                >
                  Ver {activeRoutines.length - 3} rutinas más
                </Button>
              )}
            </div>
          </div>
          
          {/* Botón flotante para añadir nueva rutina */}
          <Button
            onClick={() => navigate('/rutinas/nueva')}
            className="fixed right-4 bottom-24 bg-[#02b1bb] hover:bg-[#02b1bb]/80 rounded-full h-14 w-14 shadow-lg flex items-center justify-center"
          >
            <Plus className="h-7 w-7" />
          </Button>
        </>
      )}
    </div>
  );
};

export default Rutinas;
