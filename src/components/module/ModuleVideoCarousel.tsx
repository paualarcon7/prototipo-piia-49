
import * as React from "react";
import { Volume2, VolumeX, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

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

  const handleVideoTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.target as HTMLVideoElement;
    const percentage = (video.currentTime / video.duration) * 100;
    setProgress(percentage);
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

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setCurrentVideoIndex(index);
            const video = videoRefs.current[index];
            if (video) {
              video.play().catch(() => {
                console.log("Video autoplay prevented");
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

  return (
    <div 
      className="relative w-full aspect-video rounded-xl overflow-hidden bg-black"
      onMouseMove={handleVideoContainerHover}
      onMouseLeave={() => setShowControls(false)}
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
            src={slide.src}
            poster={slide.thumbnail}
            loop
            playsInline
            muted={isMuted}
            onTimeUpdate={handleVideoTimeUpdate}
          >
            <source src={slide.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Video Controls */}
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

          {/* Title and Progress */}
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
    </div>
  );
}
