
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useTrabajoStage } from "@/hooks/useTrabajoStage";
import { TrabajoVideoSection } from "@/components/trabajo-stage/TrabajoVideoSection";
import { TrabajoChatSection } from "@/components/trabajo-stage/TrabajoChatSection";

const TrabajoStage = () => {
  const { id, moduleId } = useParams();
  const navigate = useNavigate();
  
  const {
    showTrabajoVideo,
    messages,
    isLoading,
    audioCompleted,
    messagesEndRef,
    trabajoVideoSlides,
    handleOpenTrabajoVideo,
    handleCloseTrabajoVideo,
    handleSendMessage
  } = useTrabajoStage((stage, status) => {
    console.log(`Stage ${stage} status updated to ${status}`);
    // This is just a placeholder since we don't have direct access to setStageStatus here
  });

  return (
    <div className="container mx-auto px-4 py-6 pb-32">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => navigate(`/programa/${id}/modulo/${moduleId}`)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver al módulo
      </Button>

      <div className="bg-secondary/50 backdrop-blur-sm rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4">ALMA - PARTE 1: ACTIVA TU ENERGÍA Y DETECTA TU FLUJO</h1>
        <p className="text-gray-300 mb-6">
          Observa los videos sobre el estado de flujo y luego participa en la
          sesión de preguntas y respuestas para profundizar en tu comprensión.
        </p>

        <div className="space-y-6">
          <TrabajoVideoSection 
            showTrabajoVideo={showTrabajoVideo}
            trabajoVideoSlides={trabajoVideoSlides}
            handleOpenTrabajoVideo={handleOpenTrabajoVideo}
            handleCloseTrabajoVideo={handleCloseTrabajoVideo}
          />

          {audioCompleted && (
            <TrabajoChatSection 
              messages={messages}
              isLoading={isLoading}
              messagesEndRef={messagesEndRef}
              handleSendMessage={handleSendMessage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TrabajoStage;
