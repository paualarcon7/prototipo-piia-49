
import * as React from "react";
import { Volume2, VolumeX } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface VideoSlide {
  src: string;
  thumbnail: string;
  title: string;
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

  const handleSlideChange = (index: number) => {
    setCurrentVideoIndex(index);
    videoRefs.current.forEach((video, idx) => {
      if (video) {
        if (idx === index) {
          video.play();
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
        onSelect={(api) => {
          const selectedIndex = api.selectedScrollSnap();
          handleSlideChange(selectedIndex);
        }}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="md:basis-full">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  className="w-full h-full object-cover"
                  src={slide.src}
                  poster={slide.thumbnail}
                  loop
                  playsInline
                  muted={isMuted}
                  autoPlay={index === 0}
                  onTimeUpdate={handleVideoTimeUpdate}
                >
                  <source src={slide.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <h3 className="text-white text-lg font-medium mb-2">{slide.title}</h3>
                  <Progress value={progress} className="h-1" />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
        <Button
          variant="outline"
          size="icon"
          className="absolute top-4 right-4 bg-black/50 hover:bg-black/70"
          onClick={handleMuteToggle}
        >
          {isMuted ? (
            <VolumeX className="h-4 w-4 text-white" />
          ) : (
            <Volume2 className="h-4 w-4 text-white" />
          )}
        </Button>
      </Carousel>
    </div>
  );
}
