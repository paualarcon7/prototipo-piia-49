
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlayCircle } from "lucide-react";
import { Protocol } from "@/types/protocols";

interface ProtocolCardProps {
  protocol: Protocol;
  onClick: (id: number) => void;
}

const ProtocolCard = ({ protocol, onClick }: ProtocolCardProps) => {
  return (
    <Card 
      key={protocol.id} 
      className="bg-secondary/50 backdrop-blur-sm border-secondary/20 p-4 space-y-2 hover:bg-secondary/60 transition-colors cursor-pointer relative"
      onClick={() => onClick(protocol.id)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <protocol.icon className="w-6 h-6 text-white" />
          <div>
            <h2 className="text-lg font-semibold text-white">{protocol.title}</h2>
            {protocol.description && (
              <p className="text-sm text-gray-300">{protocol.description}</p>
            )}
          </div>
        </div>
        <PlayCircle className="w-10 h-10 text-white fill-white/10" />
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
  );
};

export default ProtocolCard;
