
import { useState } from "react";
import { Clipboard, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProtocolFilters from "@/components/protocols/ProtocolFilters";
import ProtocolCard from "@/components/protocols/ProtocolCard";
import { Protocol, ProtocolDimension, Tag } from "@/types/protocols";

export const protocols: Protocol[] = [
  {
    id: 1,
    title: "ALMA - PARTE 1: ACTIVA TU ENERGÍA Y DETECTA TU FLUJO",
    dimension: "bienestar",
    tags: ["energía", "flujo", "rendimiento"],
    duration: "7 días",
    description: "Descubre y potencia tu estado de flujo personal para alcanzar tu máximo rendimiento y bienestar",
    icon: Clipboard,
    instructions: "Este protocolo está diseñado para ayudarte a identificar y maximizar tus momentos de máxima energía y flujo, mejorando tu rendimiento y satisfacción en tus actividades diarias."
  },
  {
    id: 2,
    title: "Protocolo de Alto Rendimiento",
    dimension: "rendimiento",
    tags: ["concentración", "productividad"],
    duration: "30 días",
    description: "Optimiza tu rendimiento mental y físico",
    icon: Clipboard
  },
  {
    id: 3,
    title: "Protocolo de Salud Integral",
    dimension: "salud",
    tags: ["bienestar", "equilibrio"],
    duration: "45 días",
    description: "Mejora tu salud física y mental de manera holística",
    icon: Clipboard
  }
];

const Protocolos = () => {
  const [selectedDimension, setSelectedDimension] = useState<ProtocolDimension>("all");
  const [selectedTag, setSelectedTag] = useState<Tag>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredProtocols = protocols.filter((protocol) => {
    const dimensionMatch = selectedDimension === "all" || protocol.dimension === selectedDimension;
    const tagMatch = selectedTag === "all" || protocol.tags.includes(selectedTag as Exclude<Tag, "all">);
    const searchMatch = !searchTerm || 
      protocol.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      protocol.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      protocol.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return dimensionMatch && tagMatch && searchMatch;
  });

  return (
    <div className="flex flex-col h-screen bg-transparent">
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <ProtocolFilters
          selectedDimension={selectedDimension}
          setSelectedDimension={setSelectedDimension}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        
        <div className="grid gap-4 sm:grid-cols-2">
          {filteredProtocols.map((protocol) => (
            <ProtocolCard
              key={protocol.id}
              protocol={protocol}
              isLocked={protocol.id === 3}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Protocolos;
