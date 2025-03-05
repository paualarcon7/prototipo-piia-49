
import { useState, useEffect } from "react";

export const useModuleVideo = () => {
  const [showFullScreenVideo, setShowFullScreenVideo] = useState(false);
  
  const demoVideo = "https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4";
  const videoSlides = [
    {
      src: demoVideo,
      thumbnail: "/placeholder-thumbnail-3.jpg",
      title: "Demo Video 1",
      likes: 1800000,
    },
    {
      src: demoVideo,
      thumbnail: "/placeholder-thumbnail-3.jpg",
      title: "Demo Video 2",
      likes: 1900000,
    },
    {
      src: demoVideo,
      thumbnail: "/placeholder-thumbnail-3.jpg",
      title: "Demo Video 3",
      likes: 2000000,
    },
    {
      src: demoVideo,
      thumbnail: "/placeholder-thumbnail-3.jpg",
      title: "Demo Video 4",
      likes: 2200000,
    },
  ];

  const handleOpenFullScreenVideo = () => {
    console.log("Opening fullscreen video");
    setShowFullScreenVideo(true);
    
    // Prevent body scrolling when fullscreen is active
    document.body.style.overflow = 'hidden';
  };

  const handleCloseFullScreenVideo = () => {
    console.log("Closing fullscreen video");
    setShowFullScreenVideo(false);
    
    // Restore body scrolling
    document.body.style.overflow = 'auto';
  };

  // Clean up when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return {
    showFullScreenVideo,
    videoSlides,
    handleOpenFullScreenVideo,
    handleCloseFullScreenVideo
  };
};
