
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, Lock } from "lucide-react";
import { Protocol } from "@/types/protocols";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ProtocolCardProps {
  protocol: Protocol;
  isLocked?: boolean;
}

const ProtocolCard = ({ protocol, isLocked = false }: ProtocolCardProps) => {
  const [showLockModal, setShowLockModal] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (isLocked) {
      setShowLockModal(true);
    } else {
      navigate(`/protocolos/${protocol.id}`);
    }
  };

  return (
    <>
      <Card 
        key={protocol.id} 
        className={`bg-gradient-to-br from-[#0EA5E9]/20 to-[#8B5CF6]/20 backdrop-blur-sm border-secondary/20 p-4 space-y-2 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 cursor-pointer relative ${
          isLocked ? 'opacity-75 hover:opacity-85' : ''
        }`}
        onClick={handleClick}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-white/10">
              <protocol.icon className="w-6 h-6 text-[#9b87f5]" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                {protocol.title}
                {isLocked && <Lock className="h-4 w-4 text-[#D946EF]" />}
              </h2>
              {protocol.description && (
                <p className="text-sm text-gray-300">{protocol.description}</p>
              )}
            </div>
          </div>
          {!isLocked && <PlayCircle className="w-8 h-8 text-[#9b87f5] fill-white/10" />}
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-wrap gap-2">
            {protocol.tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="bg-white/10 hover:bg-white/20 transition-colors text-[#D6BCFA]"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <span className="text-sm text-[#D6BCFA]">{protocol.duration}</span>
        </div>
      </Card>

      <Dialog open={showLockModal} onOpenChange={setShowLockModal}>
        <DialogContent className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] border-[#9b87f5]/20">
          <DialogHeader>
            <DialogTitle className="text-[#9b87f5]">Protocolo bloqueado</DialogTitle>
            <DialogDescription className="text-gray-300">
              Para desbloquear el Protocolo de Salud Integral, debes completar el Módulo 7 de Elementia.
              Este protocolo te ayudará a mejorar tu salud de manera integral una vez que hayas adquirido
              las bases necesarias en el programa Elementia.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProtocolCard;
