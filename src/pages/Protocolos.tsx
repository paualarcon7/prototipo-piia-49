
import React, { useState } from "react";
import { Activity, Heart, Stethoscope } from "lucide-react";
import { Protocol, Tag, ProtocolDimension } from "@/types/protocols";

// Define the protocols data array
export const protocols: Protocol[] = [
  {
    id: 1,
    title: "Respiración 4-7-8",
    dimension: "bienestar",
    tags: ["estrés", "ansiedad", "meditación"],
    duration: "5 min",
    description: "Técnica de respiración para reducir la ansiedad y mejorar el sueño",
    icon: Heart,
    instructions: "Inhala por la nariz durante 4 segundos, mantén la respiración por 7 segundos, y exhala por la boca durante 8 segundos. Repite 4 veces."
  },
  {
    id: 2,
    title: "Meditación guiada",
    dimension: "bienestar",
    tags: ["meditación", "concentración"],
    duration: "10 min",
    description: "Sesión de meditación para enfocar la mente y reducir el estrés",
    icon: Heart,
    instructions: "Siéntate en una posición cómoda, cierra los ojos y concéntrate en tu respiración. Sigue las instrucciones de audio."
  },
  {
    id: 3,
    title: "Rutina de estiramiento",
    dimension: "salud",
    tags: ["energía", "bienestar"],
    duration: "7 min",
    description: "Estiramientos para activar el cuerpo y mejorar la circulación",
    icon: Stethoscope,
    instructions: "Realiza cada estiramiento durante 30 segundos, manteniendo una respiración constante."
  },
  {
    id: 4,
    title: "Pomodoro Flow",
    dimension: "rendimiento",
    tags: ["productividad", "concentración", "flujo"],
    duration: "25 min",
    description: "Técnica para maximizar la concentración y productividad",
    icon: Activity,
    instructions: "Trabaja intensamente por 25 minutos, luego toma un descanso de 5 minutos. Repite el ciclo."
  },
  {
    id: 5,
    title: "Balance de energía",
    dimension: "bienestar",
    tags: ["equilibrio", "energía"],
    duration: "15 min",
    description: "Técnica para equilibrar tu energía durante el día",
    icon: Heart,
    instructions: "Alterna entre diferentes técnicas de respiración y movimientos para equilibrar tu energía."
  },
  {
    id: 6,
    title: "Mental Refresh",
    dimension: "rendimiento",
    tags: ["concentración", "productividad"],
    duration: "8 min",
    description: "Ejercicio para renovar la claridad mental",
    icon: Activity,
    instructions: "Sigue las instrucciones para realizar ejercicios de visualización y reseteo mental."
  }
];

const Protocolos = () => {
  const [dimensionFilter, setDimensionFilter] = useState<ProtocolDimension>("all");
  const [tagFilter, setTagFilter] = useState<Tag>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProtocols = protocols.filter(protocol => {
    // Apply dimension filter
    if (dimensionFilter !== "all" && protocol.dimension !== dimensionFilter) {
      return false;
    }
    
    // Apply tag filter
    if (tagFilter !== "all" && !protocol.tags.includes(tagFilter as Exclude<Tag, "all">)) {
      return false;
    }
    
    // Apply search query
    if (searchQuery && !protocol.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="flex flex-col h-screen bg-transparent">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-white mb-4">Protocolos</h1>
        
        {/* Filter and search functionality would go here */}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {filteredProtocols.map(protocol => (
            <div 
              key={protocol.id}
              className="bg-gradient-to-br from-[#0EA5E9]/20 to-[#02b1bb]/20 backdrop-blur-sm border border-secondary/20 rounded-lg p-4"
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 rounded-full bg-white/10">
                  <protocol.icon className="w-5 h-5 text-[#02b1bb]" />
                </div>
                <h3 className="text-lg font-semibold text-white">{protocol.title}</h3>
              </div>
              <p className="text-gray-300 text-sm mb-3">{protocol.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  {protocol.tags.map(tag => (
                    <span 
                      key={tag}
                      className="px-2 py-1 text-xs rounded-full bg-white/10 text-[#02b1bb]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-sm text-[#02b1bb]">{protocol.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Protocolos;
