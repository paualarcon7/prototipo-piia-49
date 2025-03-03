
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Routine } from "@/types/rutina";
import { useToast } from "@/hooks/use-toast";
import { sortRoutines } from "@/components/routines/rutinas-page/utils/routineUtils";
import { AllRoutinesView } from "@/components/routines/rutinas-page/AllRoutinesView";
import { ActiveRoutinesView } from "@/components/routines/rutinas-page/ActiveRoutinesView";

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

// Fix missing Calendar import
import { Calendar } from "lucide-react";

const Rutinas = () => {
  const [routines, setRoutines] = useState<Routine[]>(mockRoutines);
  const [filteredRoutines, setFilteredRoutines] = useState<Routine[]>(mockRoutines);
  const [activeRoutines, setActiveRoutines] = useState<Routine[]>([]);
  const [showAllView, setShowAllView] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");
  const [sortBy, setSortBy] = useState<"name" | "time" | "created" | "active">("time");
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

  const clearFilters = () => {
    setSearchTerm("");
    setFilterStatus("all");
    setSortBy("time");
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent pt-4 pb-20">
      {showAllView ? (
        <AllRoutinesView 
          filteredRoutines={filteredRoutines}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          sortBy={sortBy}
          setSortBy={setSortBy}
          clearFilters={clearFilters}
          setShowAllView={setShowAllView}
        />
      ) : (
        <ActiveRoutinesView 
          activeRoutines={activeRoutines}
          setShowAllView={setShowAllView}
        />
      )}
    </div>
  );
};

export default Rutinas;
