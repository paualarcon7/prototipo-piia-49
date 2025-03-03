
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { EnergyActivity } from "@/types/energyMap";
import { ActivityList } from "@/components/energy-map/ActivityList";
import { AddActivityDialog } from "@/components/energy-map/AddActivityDialog";
import { EnergyScaleLegend } from "@/components/energy-map/EnergyScaleLegend";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { addDays, format } from "date-fns";

interface EntrenamientoStageContentProps {
  trainingProgress: number;
  exerciseComplete: boolean;
  startTrainingExercise: () => void;
  goToEnergyMapProtocol: (id?: string, moduleId?: string) => void;
}

export const EntrenamientoStageContent = ({
  trainingProgress,
  exerciseComplete,
  startTrainingExercise,
  goToEnergyMapProtocol
}: EntrenamientoStageContentProps) => {
  // Energy Map Protocol State
  const [activities, setActivities] = useState<EnergyActivity[]>([]);
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [reminderTime, setReminderTime] = useState("08:00");
  const startDate = new Date();
  const endDate = addDays(startDate, 7);
  const [newActivity, setNewActivity] = useState<Partial<EnergyActivity>>({
    startTime: "",
    endTime: "",
    description: "",
    energyRating: 3
  });

  const handleAddActivity = () => {
    if (!newActivity.startTime || !newActivity.endTime) {
      toast.error("Por favor, especifica las horas de inicio y fin.");
      return;
    }

    const activity: EnergyActivity = {
      id: crypto.randomUUID(),
      startTime: newActivity.startTime,
      endTime: newActivity.endTime,
      description: newActivity.description,
      energyRating: newActivity.energyRating as number,
      date: new Date() // Add current date when creating activity
    };

    setActivities([...activities, activity]);
    setShowAddActivity(false);
    setNewActivity({
      startTime: "",
      endTime: "",
      description: "",
      energyRating: 3
    });
    toast.success("Actividad registrada exitosamente");
  };

  const handleAddToCalendar = () => {
    toast.success("Recordatorio añadido al calendario");
  };

  return (
    <div className="space-y-6">
      <div className="bg-secondary/50 backdrop-blur-sm rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold mb-6">Mapa de Energía</h1>

        <div className="space-y-8">
          {/* Duración del protocolo */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Duración del protocolo</h2>
            </div>
            
            <div className="space-y-2">
              <Label className="text-gray-400">Fecha de inicio</Label>
              <div className="bg-black/40 text-white p-4 rounded-lg w-full md:w-[300px]">
                <Calendar className="inline-block mr-2 h-5 w-5" />
                {format(startDate, "dd/MM/yyyy")}
              </div>
            </div>

            <p className="text-gray-300">
              Este protocolo tiene una duración de 7 días, desde el {format(startDate, "dd/MM/yyyy")} hasta el {format(endDate, "dd/MM/yyyy")}.
            </p>
          </div>

          {/* Recordatorio diario */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Recordatorio diario</h2>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <Select
                value={reminderTime}
                onValueChange={setReminderTime}
              >
                <SelectTrigger className="w-full md:w-[200px] bg-black/40">
                  <SelectValue placeholder="Seleccionar hora" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 24 }).map((_, i) => (
                    <SelectItem key={i} value={`${String(i).padStart(2, '0')}:00`}>
                      {`${String(i).padStart(2, '0')}:00`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                className="bg-black/40 border-gray-700"
                onClick={handleAddToCalendar}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Agendar en calendario
              </Button>
            </div>
          </div>

          {/* Energy Scale and Activity List */}
          <div className="space-y-6 mt-8">
            <div className="bg-secondary/70 p-6 rounded-lg">
              <EnergyScaleLegend />
            </div>
            
            <ActivityList
              activities={activities}
              onAddActivity={() => setShowAddActivity(true)}
            />
          </div>
        </div>
      </div>

      <AddActivityDialog
        open={showAddActivity}
        onOpenChange={setShowAddActivity}
        newActivity={newActivity}
        onActivityChange={setNewActivity}
        onSave={handleAddActivity}
      />
    </div>
  );
};
