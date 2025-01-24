import ExerciseSection from "@/components/ExerciseSection";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play } from "lucide-react";

const Bienestar = () => {
  return (
    <div className="flex flex-col h-screen bg-transparent">
      <div className="bg-secondary/50 backdrop-blur-sm border-b border-secondary/20 p-4">
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          <Button variant="secondary" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full">
            Mindfulness
          </Button>
          <Button variant="secondary" className="bg-secondary/50 text-white rounded-full">
            Diario
          </Button>
          <Button variant="secondary" className="bg-secondary/50 text-white rounded-full">
            Actividad
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="space-y-4">
          <Card className="bg-secondary/50 backdrop-blur-sm border-secondary/20 p-4 space-y-4">
            <h2 className="text-xl font-semibold text-white">Armonía Interior</h2>
            <p className="text-gray-300">Serenidad, enfoque y poder personal.</p>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Badge variant="secondary" className="bg-secondary/30">estrés</Badge>
                <Badge variant="secondary" className="bg-secondary/30">ansiedad</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-300">06:17 min</span>
                <Button size="icon" variant="secondary" className="rounded-full bg-white text-black hover:bg-white/90">
                  <Play className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          <Card className="bg-secondary/50 backdrop-blur-sm border-secondary/20 p-4 space-y-4">
            <h2 className="text-xl font-semibold text-white">Tummo</h2>
            <p className="text-gray-300">Reconecta con la fuente de poder dentro de ti</p>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Badge variant="secondary" className="bg-secondary/30">estrés</Badge>
                <Badge variant="secondary" className="bg-secondary/30">relajación</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-300">02:50 min</span>
                <Button size="icon" variant="secondary" className="rounded-full bg-white text-black hover:bg-white/90">
                  <Play className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          <Card className="bg-secondary/50 backdrop-blur-sm border-secondary/20 p-4 space-y-4">
            <h2 className="text-xl font-semibold text-white">Agradecimiento profundo</h2>
            <p className="text-gray-300">Agradece y abre tu corazón</p>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Badge variant="secondary" className="bg-secondary/30">meditación</Badge>
                <Badge variant="secondary" className="bg-secondary/30">gratitud</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-300">05:30 min</span>
                <Button size="icon" variant="secondary" className="rounded-full bg-white text-black hover:bg-white/90">
                  <Play className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Bienestar;