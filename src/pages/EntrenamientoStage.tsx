
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bell } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { EnergyActivity } from "@/types/energyMap";
import { ActivityList } from "@/components/energy-map/ActivityList";
import { AddActivityDialog } from "@/components/energy-map/AddActivityDialog";
import { EnergyScaleLegend } from "@/components/energy-map/EnergyScaleLegend";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const EntrenamientoStage = () => {
  const { id, moduleId } = useParams();
  const navigate = useNavigate();
  const [activities, setActivities] = useState<EnergyActivity[]>([]);
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [dailyReminder, setDailyReminder] = useState(false);
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
      energyRating: newActivity.energyRating as number
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

  const handleReminderChange = (checked: boolean) => {
    setDailyReminder(checked);
    if (checked) {
      // Aquí se podría integrar con un sistema de notificaciones
      toast.success("Recordatorio diario activado");
    } else {
      toast.info("Recordatorio diario desactivado");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 pb-32">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => navigate(`/programa/${id}/modulo/${moduleId}`)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver al módulo
      </Button>

      <div className="bg-secondary/50 backdrop-blur-sm rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Mapa de Energía</h1>
          <div className="flex items-center space-x-2 bg-secondary/70 p-2 rounded-lg">
            <Bell className="h-4 w-4 text-purple-400" />
            <span className="text-sm text-gray-300">Día 1 de 7</span>
          </div>
        </div>

        <p className="text-gray-300 mb-6">
          Registra y califica tus actividades diarias para identificar patrones en tus niveles de energía.
          Esta información te ayudará a optimizar tu día y mejorar tu rendimiento.
        </p>

        <div className="flex items-center space-x-2 bg-secondary/70 p-4 rounded-lg mb-6">
          <Switch
            id="daily-reminder"
            checked={dailyReminder}
            onCheckedChange={handleReminderChange}
          />
          <Label htmlFor="daily-reminder" className="text-sm text-gray-300">
            Activar recordatorio diario para registrar actividades
          </Label>
        </div>

        <div className="space-y-6">
          <ActivityList
            activities={activities}
            onAddActivity={() => setShowAddActivity(true)}
          />

          <div className="bg-secondary/70 p-6 rounded-lg">
            <EnergyScaleLegend />
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

export default EntrenamientoStage;
