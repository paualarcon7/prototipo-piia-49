import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { useTrabajoStage } from "@/hooks/useTrabajoStage";
import { TrabajoVideoSection } from "@/components/trabajo-stage/TrabajoVideoSection";
import { TrabajoChatSection } from "@/components/trabajo-stage/TrabajoChatSection";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const TrabajoStage = () => {
  const { id, moduleId, programSlug, moduleSlug, dayNumber, dayTitle } = useParams();
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
  });

  const programId = programSlug || id;
  const modId = moduleSlug || moduleId;
  
  const handleBack = () => {
    if (dayNumber && dayTitle) {
      navigate(`/programa/${programId}/modulo/${modId}/dia/${dayNumber}-${dayTitle}`);
    } else {
      navigate(`/programa/${programId}/modulo/${modId}`);
    }
  };
  
  const getModuleName = () => {
    if (moduleSlug) {
      return moduleSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
    return "Módulo";
  };
  
  return (
    <div className="container mx-auto px-4 py-6 pb-32">
      <div className="mb-4 flex justify-between items-center">
        <Button
          variant="ghost"
          onClick={handleBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al módulo
        </Button>
        
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden sm:inline-flex">
              <BreadcrumbLink onClick={handleBack}>
                {programSlug ? programSlug.charAt(0).toUpperCase() + programSlug.slice(1) : "Programa"}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden sm:inline-flex">
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem className="hidden sm:inline-flex">
              <BreadcrumbLink onClick={handleBack}>
                {getModuleName()}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden sm:inline-flex">
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink className="text-muted-foreground cursor-default">
                Trabajo
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

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
