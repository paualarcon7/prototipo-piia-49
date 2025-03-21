
import { Home, MessageSquare, BookOpen, ListFilter, Calendar } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-secondary/50 backdrop-blur-sm border-t border-secondary/20">
      <div className="flex justify-around items-center max-w-lg mx-auto">
        <Link
          to="/home"
          className={`flex flex-col items-center py-3 px-5 ${
            location.pathname === "/home" ? "text-[#FF4081]" : "text-gray-400"
          } transition-colors`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link
          to="/"
          className={`flex flex-col items-center py-3 px-5 ${
            location.pathname === "/" ? "text-[#FF4081]" : "text-gray-400"
          } transition-colors`}
        >
          <MessageSquare className="w-6 h-6" />
          <span className="text-xs mt-1">Chat</span>
        </Link>
        <Link
          to="/rutinas"
          className={`flex flex-col items-center py-3 px-5 ${
            location.pathname === "/rutinas" ? "text-[#02b1bb]" : "text-gray-400"
          } transition-colors`}
        >
          <Calendar className="w-6 h-6" />
          <span className="text-xs mt-1">Rutinas</span>
        </Link>
        <Link
          to="/protocolos"
          className={`flex flex-col items-center py-3 px-5 ${
            location.pathname === "/protocolos" ? "text-[#FF4081]" : "text-gray-400"
          } transition-colors`}
        >
          <ListFilter className="w-6 h-6" />
          <span className="text-xs mt-1">Protocolos</span>
        </Link>
        <Link
          to="/diario"
          className={`flex flex-col items-center py-3 px-5 ${
            location.pathname === "/diario" ? "text-[#FF4081]" : "text-gray-400"
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
