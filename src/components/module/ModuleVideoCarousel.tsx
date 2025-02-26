
import * as React from "react";
import { Volume2, VolumeX, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  const videoRefs = React.useRef<(HTMLVideoElement | null)[]>([]);

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

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = Number(entry.target.getAttribute('data-index'));
        setCurrentVideoIndex(index);
        const video = videoRefs.current[index];
        if (video) {
          video.play();
        }
      } else {
        const index = Number(entry.target.getAttribute('data-index'));
        const video = videoRefs.current[index];
        if (video) {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  };

  React.useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
    });

    const videos = document.querySelectorAll('.video-item');
    videos.forEach((video) => observer.observe(video));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <ScrollArea className="h-[calc(100vh-200px)] w-full">
      <div className="space-y-2">
        {slides.map((slide, index) => (
          <div
            key={index}
            data-index={index}
            className="video-item relative aspect-[9/16] w-full max-w-3xl mx-auto mb-4"
          >
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              className="w-full h-full object-cover rounded-xl"
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
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
              <h3 className="text-white text-lg font-medium mb-2">{slide.title}</h3>
              <Progress value={progress} className="h-1" />
            </div>
            <div className="absolute right-4 bottom-20 flex flex-col items-center gap-6">
              <Button
                variant="outline"
                size="icon"
                className="bg-black/50 hover:bg-black/70"
                onClick={handleMuteToggle}
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4 text-white" />
                ) : (
                  <Volume2 className="h-4 w-4 text-white" />
                )}
              </Button>
              <div className="flex flex-col items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-pink-500 transition-colors"
                >
                  <Heart className="h-6 w-6" />
                </Button>
                <span className="text-white text-sm font-medium">
                  {slide.likes ? `${(slide.likes / 1000000).toFixed(1)}M` : '0'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
