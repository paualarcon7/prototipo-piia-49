import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const ProgramaDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - esto debería venir de una API en una implementación real
  const programa = {
    id: 1,
    name: "Elementia",
    description: "Programa para que alcances tu máximo potencial a través de las metodologías del alto rendimiento",
    fullDescription: "Elementia es un programa integral diseñado para potenciar tu desarrollo personal y profesional. A través de técnicas probadas y metodologías de alto rendimiento, te ayudaremos a descubrir y maximizar tu potencial innato.",
    duration: "12 semanas",
    modules: [
      {
        title: "Módulo 1: Fundamentos",
        description: "Estableciendo las bases para el éxito"
      },
      {
        title: "Módulo 2: Desarrollo Personal",
        description: "Descubriendo tu potencial interior"
      },
      {
        title: "Módulo 3: Alto Rendimiento",
        description: "Implementando técnicas avanzadas"
      }
    ],
    color: "from-[#9b87f5] to-[#6E59A5]"
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6 pb-20">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver
      </Button>

      <div className={`bg-gradient-to-r ${programa.color} rounded-lg p-6 text-white`}>
        <h1 className="text-2xl font-bold mb-2">{programa.name}</h1>
        <p className="text-white/90">{programa.description}</p>
      </div>

      <div className="space-y-6">
        <div className="bg-secondary/50 backdrop-blur-sm rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Acerca del Programa</h2>
          <p className="text-gray-300">{programa.fullDescription}</p>
          <div className="mt-4">
            <span className="text-sm bg-secondary/30 px-3 py-1 rounded-full">
              Duración: {programa.duration}
            </span>
          </div>
        </div>

        <div className="bg-secondary/50 backdrop-blur-sm rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Módulos</h2>
          <div className="space-y-4">
            {programa.modules.map((module, index) => (
              <div key={index} className="border border-secondary/20 rounded-lg p-4">
                <h3 className="font-semibold text-white">{module.title}</h3>
                <p className="text-gray-300 text-sm mt-1">{module.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramaDetalle;