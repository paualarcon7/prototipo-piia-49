
import * as React from "react";
import { Volume2, VolumeX, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface VideoSlide {
  src: string;
  thumbnail: string;
  title: string;
  likes?: number;
}

interface ModuleVideoCarouselProps {
  slides: VideoSlide[];
}

export function ModuleVideoCarousel({ slides }: ModuleVideoCarouselProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = React.useState(0);
  const [isMuted, setIsMuted] = React.useState(true);
  const [progress, setProgress] = React.useState(0);
  const [isLiked, setIsLiked] = React.useState(false);
  const [showControls, setShowControls] = React.useState(true);
  const videoRefs = React.useRef<(HTMLVideoElement | null)[]>([]);
  const controlsTimeoutRef = React.useRef<NodeJS.Timeout>();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [showPurposeModal, setShowPurposeModal] = React.useState(false);
  const [purpose, setPurpose] = React.useState("");
  const [videoError, setVideoError] = React.useState(false);

  const handleVideoTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.target as HTMLVideoElement;
    const percentage = (video.currentTime / video.duration) * 100;
    setProgress(percentage);
  };

  const handleVideoEnded = () => {
    if (currentVideoIndex === slides.length - 1) {
      setShowPurposeModal(true);
    } else {
      setCurrentVideoIndex(prev => prev + 1);
    }
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    videoRefs.current.forEach((video) => {
      if (video) {
        video.muted = !isMuted;
      }
    });
  };

  const handleVideoContainerHover = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
  };

  const handlePurposeSubmit = () => {
    console.log("User purpose:", purpose);
    setShowPurposeModal(false);
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

  const handleVideoError = (index: number) => {
    console.error(`Error loading video at index ${index}, URL: ${slides[index].src}`);
    setVideoError(true);
  };

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setCurrentVideoIndex(index);
            const video = videoRefs.current[index];
            if (video) {
              video.play().catch((err) => {
                console.log("Video autoplay prevented", err);
              });
            }
          } else {
            const index = Number(entry.target.getAttribute("data-index"));
            const video = videoRefs.current[index];
            if (video) {
              video.pause();
              video.currentTime = 0;
            }
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
  }, []);

  React.useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentVideoIndex) {
          video.play().catch((err) => {
            console.log("Video autoplay prevented", err);
          });
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [currentVideoIndex]);

  return (
    <>
      <div 
        ref={containerRef}
        className="relative w-full aspect-video rounded-xl overflow-hidden bg-black"
        onMouseMove={handleVideoContainerHover}
        onMouseLeave={() => setShowControls(false)}
        onWheel={handleWheel}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            data-index={index}
            className={cn(
              "video-item absolute inset-0 transition-opacity duration-400",
              currentVideoIndex === index ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
          >
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              className="w-full h-full object-contain"
              playsInline
              muted={isMuted}
              controls={false}
              onTimeUpdate={handleVideoTimeUpdate}
              onEnded={handleVideoEnded}
              onError={() => handleVideoError(index)}
            >
              <source src={slide.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {videoError && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/75 text-white text-center p-4">
                <div>
                  <p className="mb-2">Error al cargar el video.</p>
                  <p className="text-sm opacity-75">Intenta recargar la página o revisar tu conexión a internet.</p>
                </div>
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <div 
              className={cn(
                "absolute right-6 bottom-20 flex flex-col items-center gap-6 transition-opacity duration-300 bg-black/15 rounded-full py-4 px-2",
                showControls ? "opacity-100" : "opacity-0"
              )}
            >
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                onClick={handleMuteToggle}
              >
                {isMuted ? (
                  <VolumeX className="h-6 w-6 text-white" />
                ) : (
                  <Volume2 className="h-6 w-6 text-white" />
                )}
              </Button>
              <div className="flex flex-col items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-12 w-12 rounded-full transition-all duration-300 hover:scale-110",
                    isLiked ? "text-[#FF4081]" : "text-white hover:text-[#FF4081]"
                  )}
                  onClick={handleLikeToggle}
                >
                  <Heart className={cn("h-8 w-8", isLiked && "fill-current")} />
                </Button>
                <span className="text-white text-sm font-medium">
                  {slide.likes ? `${(slide.likes / 1000000).toFixed(1)}M` : '0'}
                </span>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="font-oswald text-xl text-white mb-4 line-clamp-2 drop-shadow-lg">
                {slide.title}
              </h3>
              <Progress 
                value={progress} 
                className="h-1 bg-white/20 [&>div]:bg-gradient-to-r [&>div]:from-[#FF4081] [&>div]:to-[#9C27B0]" 
              />
            </div>
          </div>
        ))}

        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
          <p className="text-white text-sm mb-2 opacity-70">Desliza para más videos</p>
          <svg className="w-6 h-6 text-white opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      <Dialog open={showPurposeModal} onOpenChange={setShowPurposeModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">¿Cuál es tu propósito para este módulo?</DialogTitle>
            <DialogDescription>
              Piia, tu asistente personalizado, desea conocer tus objetivos para este módulo.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-start space-x-4 pt-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF4081] to-[#9C27B0] flex items-center justify-center">
              <span className="text-white font-bold">P</span>
            </div>
            <Textarea
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="Escribe tu propósito aquí..."
              className="flex-1 min-h-[100px]"
            />
          </div>
          <DialogFooter>
            <Button 
              type="submit" 
              onClick={handlePurposeSubmit}
              className="w-full bg-gradient-to-r from-[#FF4081] to-[#9C27B0] hover:opacity-90"
            >
              Enviar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
