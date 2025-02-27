
import * as React from "react";
import { useVideoCarousel } from "./VideoCarouselContext";
import { VideoPlayer } from "./VideoPlayer";
import { VideoControls } from "./VideoControls";
import { VideoProgress } from "./VideoProgress";
import { PurposeModal } from "./PurposeModal";

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

  // Facilitar la navegación entre videos con botones adicionales
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

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setCurrentVideoIndex(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    const videos = document.querySelectorAll(".video-item");
    videos.forEach((video) => observer.observe(video));

    return () => {
      observer.disconnect();
    };
  }, [setCurrentVideoIndex]);

  return (
    <>
      <div 
        ref={containerRef}
        className="relative w-full h-full bg-black overflow-hidden"
        onMouseMove={handleVideoContainerHover}
        onMouseLeave={() => setShowControls(false)}
        onWheel={handleWheel}
      >
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
      </div>

      <PurposeModal 
        open={showPurposeModal} 
        onOpenChange={setShowPurposeModal}
        onSubmit={handlePurposeSubmit}
      />
    </>
  );
}
