
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { EnergyActivity } from "@/types/energyMap";
import { ActivityList } from "@/components/energy-map/ActivityList";
import { AddActivityDialog } from "@/components/energy-map/AddActivityDialog";
import { EnergyScaleLegend } from "@/components/energy-map/EnergyScaleLegend";

const EntrenamientoStage = () => {
  const { id, moduleId } = useParams();
  const navigate = useNavigate();
  const [activities, setActivities] = useState<EnergyActivity[]>([]);
  const [showAddActivity, setShowAddActivity] = useState(false);
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
        <h1 className="text-2xl font-bold mb-4">Mapa de Energía</h1>
        <p className="text-gray-300 mb-6">
          Registra y califica tus actividades diarias para identificar patrones en tus niveles de energía.
          Esta información te ayudará a optimizar tu día y mejorar tu rendimiento.
        </p>

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
