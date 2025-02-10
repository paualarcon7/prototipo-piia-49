
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Activity, Heart, Stethoscope } from "lucide-react";
import ProtocolFilters from "@/components/protocols/ProtocolFilters";
import ProtocolCard from "@/components/protocols/ProtocolCard";
import { Protocol, ProtocolDimension, Tag } from "@/types/protocols";

const protocols: Protocol[] = [
  {
    id: 1,
    title: "Protocolo de Meditación para el Manejo del Estrés",
    dimension: "bienestar",
    tags: ["estrés", "ansiedad", "meditación"],
    duration: "21 días",
    description: "Desarrolla una práctica efectiva de meditación para manejar el estrés diario",
    icon: Heart,
    instructions: "Este protocolo está diseñado para ayudarte a desarrollar una práctica de meditación efectiva que te permitirá manejar mejor el estrés en tu vida diaria."
  },
  {
    id: 2,
    title: "Protocolo de Alto Rendimiento",
    dimension: "rendimiento",
    tags: ["concentración", "productividad"],
    duration: "30 días",
    description: "Optimiza tu rendimiento mental y físico",
    icon: Activity
  },
  {
    id: 3,
    title: "Protocolo de Salud Integral",
    dimension: "salud",
    tags: ["bienestar", "equilibrio"],
    duration: "45 días",
    description: "Mejora tu salud física y mental de manera holística",
    icon: Stethoscope
  }
];

const Protocolos = () => {
  const [selectedDimension, setSelectedDimension] = useState<ProtocolDimension>("all");
  const [selectedTag, setSelectedTag] = useState<Tag>("all");
  const navigate = useNavigate();

  const filteredProtocols = protocols.filter((protocol) => {
    const dimensionMatch = selectedDimension === "all" || protocol.dimension === selectedDimension;
    const tagMatch = selectedTag === "all" || protocol.tags.includes(selectedTag as Exclude<Tag, "all">);
    return dimensionMatch && tagMatch;
  });

  const handleProtocolClick = (protocolId: number) => {
    navigate(`/protocolos/entrenamiento/${protocolId}`);
  };

  return (
    <div className="flex flex-col h-screen bg-transparent">
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <ProtocolFilters
          selectedDimension={selectedDimension}
          setSelectedDimension={setSelectedDimension}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
        />
        
        <div className="grid gap-4 sm:grid-cols-2">
          {filteredProtocols.map((protocol) => (
            <ProtocolCard
              key={protocol.id}
              protocol={protocol}
              onClick={handleProtocolClick}
              isLocked={protocol.id === 3} // Lock the Salud Integral protocol
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Protocolos;

