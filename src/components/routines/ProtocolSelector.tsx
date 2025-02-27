
import { useState } from "react";
import { Search, X, GripVertical, Plus, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { RoutineProtocol } from "@/types/rutina";
import { Protocol } from "@/types/protocols";
import { Badge } from "@/components/ui/badge";

interface ProtocolSelectorProps {
  availableProtocols: Protocol[];
  selectedProtocols: RoutineProtocol[];
  onAddProtocol: (protocol: Protocol) => void;
  onRemoveProtocol: (index: number) => void;
  onReorderProtocols: (protocols: RoutineProtocol[]) => void;
}

export const ProtocolSelector = ({
  availableProtocols,
  selectedProtocols,
  onAddProtocol,
  onRemoveProtocol,
  onReorderProtocols
}: ProtocolSelectorProps) => {
  const [search, setSearch] = useState("");
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  
  // Filter available protocols that are not already selected
  const availableForSelection = availableProtocols.filter(
    p => !selectedProtocols.some(sp => sp.protocol.id === p.id)
  );
  
  // Filter protocols based on search
  const filteredProtocols = availableForSelection.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.dimension.toLowerCase().includes(search.toLowerCase()) ||
    p.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
  );

  const handleDragStart = (index: number) => {
    setDragIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;
    
    // Reorder the protocols
    const newProtocols = [...selectedProtocols];
    const draggedProtocol = newProtocols[dragIndex];
    
    // Remove from old position
    newProtocols.splice(dragIndex, 1);
    // Add to new position
    newProtocols.splice(index, 0, draggedProtocol);
    
    // Update drag index and protocol order
    setDragIndex(index);
    onReorderProtocols(newProtocols);
  };

  // Calculate total duration
  const calculateTotalDuration = () => {
    // For simplicity, we'll extract numbers from duration strings like "30 min"
    let totalMinutes = 0;
    
    selectedProtocols.forEach(({ protocol }) => {
      const durationMatch = protocol.duration.match(/(\d+)/);
      if (durationMatch) {
        totalMinutes += parseInt(durationMatch[0], 10);
      }
    });
    
    if (totalMinutes >= 60) {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return `${hours}h ${minutes > 0 ? `${minutes}m` : ""}`;
    }
    
    return `${totalMinutes}m`;
  };
  
  return (
    <div>
      <Tabs defaultValue="selected" className="mb-4">
        <TabsList className="w-full bg-secondary/50">
          <TabsTrigger value="selected" className="flex-1">
            Seleccionados ({selectedProtocols.length})
          </TabsTrigger>
          <TabsTrigger value="available" className="flex-1">
            Disponibles ({availableForSelection.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="selected" className="mt-4 space-y-2">
          {selectedProtocols.length > 0 ? (
            <>
              <div className="mb-3 bg-secondary/50 p-2 rounded-md flex items-center">
                <Info className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-xs text-gray-300">
                  Arrastra para reordenar los protocolos
                </span>
                <Badge className="ml-auto bg-[#FF4081]/20 text-[#FF4081]">
                  Duración total: {calculateTotalDuration()}
                </Badge>
              </div>
              
              <div className="space-y-2">
                {selectedProtocols.map((item, index) => (
                  <div
                    key={`${item.protocol.id}-${index}`}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={() => setDragIndex(null)}
                    className={`
                      p-3 rounded-md bg-secondary/40 border border-secondary/20 flex items-center
                      transition-colors duration-200
                      ${dragIndex === index ? 'bg-secondary/60' : ''}
                    `}
                  >
                    <GripVertical className="h-5 w-5 text-gray-500 mr-2 cursor-grab" />
                    <div className="flex-1">
                      <h4 className="text-white text-sm font-medium line-clamp-1">
                        {item.protocol.title}
                      </h4>
                      <div className="flex items-center mt-1">
                        <Badge variant="outline" className="text-xs bg-secondary/30 mr-2">
                          {item.protocol.dimension}
                        </Badge>
                        <span className="text-xs text-gray-400">
                          {item.protocol.duration}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveProtocol(index)}
                      className="p-1 rounded-full hover:bg-secondary/60"
                    >
                      <X className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-400 text-sm mb-2">
                No has seleccionado ningún protocolo
              </p>
              <p className="text-gray-500 text-xs">
                Selecciona protocolos en la pestaña "Disponibles"
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="available" className="mt-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar protocolos"
              className="pl-9 bg-secondary/50 border-secondary/30 text-white"
            />
          </div>
          
          <div className="space-y-2">
            {filteredProtocols.map(protocol => (
              <div
                key={protocol.id}
                className="p-3 rounded-md bg-secondary/40 border border-secondary/20 flex items-center"
              >
                <div className="flex-1">
                  <h4 className="text-white text-sm font-medium line-clamp-1">{protocol.title}</h4>
                  <div className="flex items-center mt-1">
                    <Badge variant="outline" className="text-xs bg-secondary/30 mr-2">
                      {protocol.dimension}
                    </Badge>
                    <span className="text-xs text-gray-400">{protocol.duration}</span>
                  </div>
                </div>
                <button
                  onClick={() => onAddProtocol(protocol)}
                  className="p-1 rounded-full hover:bg-secondary/60"
                >
                  <Plus className="h-4 w-4 text-[#FF4081]" />
                </button>
              </div>
            ))}
            
            {filteredProtocols.length === 0 && (
              <div className="text-center py-6">
                <p className="text-gray-400 text-sm">
                  No hay protocolos disponibles{search ? " para tu búsqueda" : ""}
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
