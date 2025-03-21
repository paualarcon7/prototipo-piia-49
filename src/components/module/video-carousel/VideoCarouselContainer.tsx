
import * as React from "react";
import { useVideoCarousel } from "./VideoCarouselContext";
import { VideoPlayer } from "./VideoPlayer";
import { VideoControls } from "./VideoControls";
import { VideoProgress } from "./VideoProgress";
import { PurposeModal } from "./PurposeModal";
import { X } from "lucide-react";

export function VideoCarouselContainer() {
  const { 
    slides, 
    currentVideoIndex, 
    setCurrentVideoIndex, 
    showControls, 
    setShowControls,
    onClose
  } = useVideoCarousel();
  
  const containerRef = React.useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = React.useRef<NodeJS.Timeout>();
  const [showPurposeModal, setShowPurposeModal] = React.useState(false);
  const [hasInitialized, setHasInitialized] = React.useState(false);

  // Always start with the first video
  React.useEffect(() => {
    if (!hasInitialized) {
      console.log("Initializing carousel with first video (index 0)");
      setCurrentVideoIndex(0);
      setHasInitialized(true);
    }
  }, [setCurrentVideoIndex, hasInitialized]);

  const handleVideoContainerHover = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 0 && currentVideoIndex < slides.length - 1) {
      setCurrentVideoIndex(prev => prev + 1);
    } else if (e.deltaY < 0 && currentVideoIndex > 0) {
      setCurrentVideoIndex(prev => prev - 1);
    } else if (e.deltaY > 0 && currentVideoIndex === slides.length - 1) {
      setShowPurposeModal(true);
    }
  };

  // Handle when any video ends to check if it's the last one
  React.useEffect(() => {
    const checkVideoEnd = () => {
      const video = document.querySelector(`[data-index="${currentVideoIndex}"] video`) as HTMLVideoElement;
      if (video) {
        const checkIfEnded = () => {
          if (video.ended) {
            if (currentVideoIndex === slides.length - 1) {
              setShowPurposeModal(true);
            }
          }
        };
        
        video.addEventListener('ended', checkIfEnded);
        return () => {
          video.removeEventListener('ended', checkIfEnded);
        };
      }
    };
    
    const cleanup = checkVideoEnd();
    return cleanup;
  }, [currentVideoIndex, slides.length]);

  const handlePurposeSubmit = () => {
    setShowPurposeModal(false);
    onClose();
  };

  // Navigation between videos
  const goToNextVideo = () => {
    if (currentVideoIndex < slides.length - 1) {
      setCurrentVideoIndex(prev => prev + 1);
    } else {
      setShowPurposeModal(true);
    }
  };

  const goToPrevVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(prev => prev - 1);
    }
  };

  // Close button handler
  const handleCloseClick = () => {
    onClose();
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 w-screen h-screen bg-black overflow-hidden"
      onMouseMove={handleVideoContainerHover}
      onMouseLeave={() => setShowControls(false)}
      onWheel={handleWheel}
    >
      {/* Close button */}
      <button
        onClick={handleCloseClick}
        className="absolute top-4 right-4 z-50 p-2 bg-black/40 hover:bg-black/60 rounded-full transition-colors"
      >
        <X className="h-6 w-6 text-white" />
      </button>

      {slides.map((_, index) => (
        <VideoPlayer key={index} index={index} />
      ))}
      
      <VideoControls 
        goToNextVideo={goToNextVideo}
        goToPrevVideo={goToPrevVideo}
        totalVideos={slides.length}
        currentIndex={currentVideoIndex}
      />
      <VideoProgress />

      <PurposeModal 
        open={showPurposeModal} 
        onOpenChange={setShowPurposeModal}
        onSubmit={handlePurposeSubmit}
      />
    </div>
  );
}
