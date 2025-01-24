import { MessageSquare, Yoga } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-secondary/50 backdrop-blur-sm border-t border-secondary/20">
      <div className="flex justify-around items-center max-w-lg mx-auto">
        <Link
          to="/"
          className={`flex flex-col items-center py-3 px-5 ${
            location.pathname === "/" ? "text-purple-500" : "text-gray-400"
          } transition-colors`}
        >
          <MessageSquare className="w-6 h-6" />
          <span className="text-xs mt-1">Chat</span>
        </Link>
        <Link
          to="/bienestar"
          className={`flex flex-col items-center py-3 px-5 ${
            location.pathname === "/bienestar" ? "text-purple-500" : "text-gray-400"
          } transition-colors`}
        >
          <Yoga className="w-6 h-6" />
          <span className="text-xs mt-1">Bienestar</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNav;