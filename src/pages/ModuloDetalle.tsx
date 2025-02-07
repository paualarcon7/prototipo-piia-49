
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const ModuloDetalle = () => {
  const { id, moduleId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-6">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => navigate(`/programa/${id}`)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver al programa
      </Button>

      <div className="bg-secondary/50 backdrop-blur-sm rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Módulo {moduleId}</h1>
        <p className="text-gray-300">
          Aquí encontrarás el contenido detallado del módulo {moduleId} del programa {id}.
        </p>
      </div>
    </div>
  );
};

export default ModuloDetalle;
