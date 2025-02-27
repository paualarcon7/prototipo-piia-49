
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Calendar, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WeekView } from "@/components/routines/WeekView";
import { RoutineCard } from "@/components/routines/RoutineCard";
import { Routine } from "@/types/rutina";
import { SyncStatusBadge } from "@/components/routines/SyncStatusBadge";
import { EmptyRoutinesState } from "@/components/routines/EmptyRoutinesState";

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
  }
];

const Rutinas = () => {
  const [routines, setRoutines] = useState<Routine[]>(mockRoutines);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-transparent pt-4 pb-20">
      <div className="px-4 mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold font-oswald text-white">Mis Rutinas</h1>
        <Button 
          onClick={() => navigate('/rutinas/nueva')}
          size="icon"
          className="bg-[#FF4081] hover:bg-[#FF4081]/90 rounded-full h-10 w-10 shadow-lg"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>

      <WeekView routines={routines} />

      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-white">Rutinas activas</h2>
          <Button variant="link" className="text-[#FF4081] p-0">
            Ver todas <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-3 overflow-y-auto pb-4">
          {routines.length > 0 ? (
            routines.map(routine => (
              <RoutineCard 
                key={routine.id} 
                routine={routine} 
                onClick={() => navigate(`/rutinas/${routine.id}`)}
              />
            ))
          ) : (
            <EmptyRoutinesState onCreateClick={() => navigate('/rutinas/nueva')} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Rutinas;
