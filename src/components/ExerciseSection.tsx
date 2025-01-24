import { useState } from "react";
import { Video, Music, ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const ExerciseSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="bg-secondary/50 backdrop-blur-sm border border-secondary/20 rounded-lg overflow-hidden"
    >
      <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-white hover:bg-secondary/70 transition-colors">
        <span className="text-lg font-semibold">Ejercicios de Bienestar</span>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="p-4 space-y-4">
          <div className="space-y-3">
            <h3 className="text-white font-medium flex items-center gap-2">
              <Video className="w-5 h-5" />
              Ejercicio de Respiración
            </h3>
            <div className="aspect-video rounded-lg overflow-hidden bg-black/20">
              <video
                controls
                className="w-full h-full"
                poster="/placeholder.svg"
              >
                <source
                  src="https://storage.googleapis.com/webfundamentals-assets/videos/chrome.mp4"
                  type="video/mp4"
                />
                Tu navegador no soporta el elemento de video.
              </video>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-white font-medium flex items-center gap-2">
              <Music className="w-5 h-5" />
              Meditación Guiada
            </h3>
            <div className="rounded-lg overflow-hidden bg-black/20 p-4">
              <audio controls className="w-full">
                <source
                  src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
                  type="audio/mpeg"
                />
                Tu navegador no soporta el elemento de audio.
              </audio>
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ExerciseSection;