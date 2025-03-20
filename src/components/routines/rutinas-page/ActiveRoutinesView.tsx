import { useNavigate } from "react-router-dom";
import { ArrowRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Routine } from "@/types/rutina";
import { WeekView } from "@/components/routines/WeekView";
import RoutineCard from "@/components/routines/RoutineCard";
import EmptyRoutinesState from "@/components/routines/EmptyRoutinesState";

interface ActiveRoutinesViewProps {
  activeRoutines: Routine[];
  setShowAllView: (show: boolean) => void;
}

export const ActiveRoutinesView = ({
  activeRoutines,
  setShowAllView
}: ActiveRoutinesViewProps) => {
  const navigate = useNavigate();
  const handleRoutineClick = (routine: Routine) => {
    navigate(`/rutinas/${routine.id}`);
  };
  return <>
      <div className="px-4 mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold font-oswald text-white">Mis Rutinas</h1>
        <Button onClick={() => navigate('/rutinas/nueva')} size="icon" className="bg-[#02b1bb] hover:bg-[#02b1bb]/80 rounded-full h-10 w-10 shadow-lg transition-transform hover:scale-105">
          <Plus className="h-6 w-6" />
        </Button>
      </div>

      <WeekView routines={activeRoutines} />

      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-white">Rutinas activas</h2>
          <Button variant="link" className="text-[#02b1bb] p-0" onClick={() => setShowAllView(true)}>
            Ver todas <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-3 overflow-y-auto pb-4">
          {activeRoutines.length > 0 ? activeRoutines.slice(0, 3).map(routine => <RoutineCard key={routine.id} routine={routine} onClick={() => handleRoutineClick(routine)} />) : <EmptyRoutinesState onCreateClick={() => navigate('/rutinas/nueva')} />}
          
          {activeRoutines.length > 3 && <Button variant="outline" className="w-full mt-2 border-[#02b1bb]/20 text-[#02b1bb]" onClick={() => setShowAllView(true)}>
              Ver {activeRoutines.length - 3} rutinas más
            </Button>}
        </div>
      </div>
      
      <Button onClick={() => navigate('/rutinas/nueva')} className="fixed right-4 bottom-24 rounded-full h-14 w-14 shadow-lg flex items-center justify-center bg-[#ff4081]">
        <Plus className="h-7 w-7" />
      </Button>
    </>;
};
