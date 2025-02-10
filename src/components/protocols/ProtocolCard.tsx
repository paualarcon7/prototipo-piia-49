
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

interface ProtocolCardProps {
  protocol: Protocol;
  onClick: (id: number) => void;
  isLocked?: boolean;
}

const ProtocolCard = ({ protocol, onClick, isLocked = false }: ProtocolCardProps) => {
  const [showLockModal, setShowLockModal] = useState(false);

  const handleClick = () => {
    if (isLocked) {
      setShowLockModal(true);
    } else {
      onClick(protocol.id);
    }
  };

  return (
    <>
      <Card 
        key={protocol.id} 
        className={`bg-secondary/50 backdrop-blur-sm border-secondary/20 p-4 space-y-2 hover:bg-secondary/60 transition-colors cursor-pointer relative ${
          isLocked ? 'opacity-75' : ''
        }`}
        onClick={handleClick}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <protocol.icon className="w-6 h-6 text-white" />
            <div>
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                {protocol.title}
                {isLocked && <Lock className="h-4 w-4" />}
              </h2>
              {protocol.description && (
                <p className="text-sm text-gray-300">{protocol.description}</p>
              )}
            </div>
          </div>
          <PlayCircle className="w-8 h-8 text-white fill-white/10" />
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-wrap gap-2">
            {protocol.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-secondary/30">
                {tag}
              </Badge>
            ))}
          </div>
          <span className="text-sm text-gray-300">{protocol.duration}</span>
        </div>
      </Card>

      <Dialog open={showLockModal} onOpenChange={setShowLockModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Protocolo bloqueado</DialogTitle>
            <DialogDescription>
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

