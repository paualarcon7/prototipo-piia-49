
import * as React from "react";
import { Progress } from "@/components/ui/progress";
import { useVideoCarousel } from "./VideoCarouselContext";

export function VideoProgress() {
  const { progress } = useVideoCarousel();
  
  return (
    <Progress 
      value={progress} 
      className="h-1 absolute bottom-0 left-0 right-0 bg-white/20 [&>div]:bg-gradient-to-r [&>div]:from-[#FF4081] [&>div]:to-[#9C27B0]" 
    />
  );
}
