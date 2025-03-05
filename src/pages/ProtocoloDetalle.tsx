
import { useParams, useNavigate } from "react-router-dom";
import { protocols } from "./Protocolos";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";

const ProtocoloDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const protocol = protocols.find((p) => p.id === Number(id));

  useEffect(() => {
    if (protocol?.id === 1) {
      navigate("/programa/2/modulo/4/entrenamiento");
    }
  }, [protocol, navigate]);

  if (!protocol) {
    return <div className="p-4 text-white">Protocolo no encontrado</div>;
  }

  if (protocol.id === 1) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen bg-transparent p-4 space-y-6">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-full bg-white/10">
          <protocol.icon className="w-8 h-8 text-[#02b1bb]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">{protocol.title}</h1>
          <p className="text-gray-300">{protocol.description}</p>
        </div>
      </div>

      <Card className="bg-gradient-to-br from-[#0EA5E9]/20 to-[#02b1bb]/20 backdrop-blur-sm border-secondary/20 p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {protocol.tags.map((tag) => (
                <Badge 
                  key={tag}
                  variant="secondary"
                  className="bg-white/10 hover:bg-white/20 transition-colors text-[#02b1bb]"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <span className="text-[#02b1bb]">{protocol.duration}</span>
          </div>

          {protocol.instructions && (
            <div className="mt-4 text-gray-200">
              <h3 className="text-lg font-semibold mb-2 text-[#02b1bb]">Instrucciones</h3>
              <p>{protocol.instructions}</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ProtocoloDetalle;
