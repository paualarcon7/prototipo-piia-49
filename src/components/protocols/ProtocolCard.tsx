
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
        className={`bg-gradient-to-br from-[#0EA5E9]/20 to-[#9b87f5]/20 backdrop-blur-sm border-secondary/20 p-6 space-y-4 hover:shadow-lg hover:shadow-[#9b87f5]/10 transition-all duration-300 cursor-pointer relative ${
          isLocked ? 'opacity-75 hover:opacity-85' : ''
        }`}
        onClick={handleClick}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-white/10">
            <protocol.icon className="w-8 h-8 text-gray-400" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              {protocol.title}
              {isLocked && <Lock className="h-5 w-5 text-[#FF4081]" />}
            </h2>
            {protocol.description && (
              <p className="text-gray-300 mt-1">{protocol.description}</p>
            )}
          </div>
          {!isLocked && <PlayCircle className="w-10 h-10 text-[#FF4081] fill-white/10" />}
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-wrap gap-2">
            {protocol.tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="bg-white/10 hover:bg-white/20 transition-colors text-[#FF4081]"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <span className="text-sm text-[#FF4081]">{protocol.duration}</span>
        </div>
      </Card>

      <Dialog open={showLockModal} onOpenChange={setShowLockModal}>
        <DialogContent className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] border-[#9b87f5]/20">
          <DialogHeader>
            <DialogTitle className="text-[#FF4081]">Protocolo bloqueado</DialogTitle>
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
