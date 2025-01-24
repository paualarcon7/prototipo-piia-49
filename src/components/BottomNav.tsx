import { MessageSquare, Flower2, BookOpen, TestTube } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-secondary/50 backdrop-blur-sm border-t border-secondary/20">
      <div className="flex justify-around items-center max-w-lg mx-auto">
        <Link
          to="/bienestar"
          className={`flex flex-col items-center py-3 px-5 ${
            location.pathname === "/bienestar" ? "text-purple-500" : "text-gray-400"
          } transition-colors`}
        >
          <Flower2 className="w-6 h-6" />
          <span className="text-xs mt-1">Bienestar</span>
        </Link>
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
          to="/diario"
          className={`flex flex-col items-center py-3 px-5 ${
            location.pathname === "/diario" ? "text-purple-500" : "text-gray-400"
          } transition-colors`}
        >
          <BookOpen className="w-6 h-6" />
          <span className="text-xs mt-1">Diario</span>
        </Link>
        <Link
          to="/tests"
          className={`flex flex-col items-center py-3 px-5 ${
            location.pathname === "/tests" ? "text-purple-500" : "text-gray-400"
          } transition-colors`}
        >
          <TestTube className="w-6 h-6" />
          <span className="text-xs mt-1">Tests</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNav;