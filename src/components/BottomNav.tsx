import { Home, MessageSquare, BookOpen } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-secondary/50 backdrop-blur-sm border-t border-secondary/20">
      <div className="flex justify-around items-center max-w-lg mx-auto">
        <Link
          to="/home"
          className={`flex flex-col items-center py-3 px-5 ${
            location.pathname === "/home" ? "text-[#9b87f5]" : "text-gray-400"
          } transition-colors`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link
          to="/"
          className={`flex flex-col items-center py-3 px-5 ${
            location.pathname === "/" ? "text-[#9b87f5]" : "text-gray-400"
          } transition-colors`}
        >
          <MessageSquare className="w-6 h-6" />
          <span className="text-xs mt-1">Chat</span>
        </Link>
        <Link
          to="/bienestar"
          className={`flex flex-col items-center py-3 px-5 ${
            location.pathname === "/bienestar" ? "text-[#9b87f5]" : "text-gray-400"
          } transition-colors`}
        >
          <img 
            src={location.pathname === "/bienestar" ? "/lovable-uploads/1800bb2c-46c0-4acd-892f-cfe4d2fe0203.png" : "/lovable-uploads/d5a43027-e4f7-4c41-b686-c97f6aa1268e.png"} 
            alt="Mindfulness"
            className="w-6 h-6 object-contain"
          />
          <span className="text-xs mt-1">Mindfulness</span>
        </Link>
        <Link
          to="/diario"
          className={`flex flex-col items-center py-3 px-5 ${
            location.pathname === "/diario" ? "text-[#9b87f5]" : "text-gray-400"
          } transition-colors`}
        >
          <BookOpen className="w-6 h-6" />
          <span className="text-xs mt-1">Diario</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNav;