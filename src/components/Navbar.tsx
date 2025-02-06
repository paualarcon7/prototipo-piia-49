import { Home, BookOpen, PlusCircle, User, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border z-50">
      <div className="container flex justify-between items-center h-16 px-4">
        <Link to="/" className={`flex flex-col items-center ${isActive('/') ? 'text-primary' : 'text-muted-foreground'}`}>
          <Home className="h-6 w-6" />
          <span className="text-xs">Inicio</span>
        </Link>
        
        <Link to="/diario" className={`flex flex-col items-center ${isActive('/diario') ? 'text-primary' : 'text-muted-foreground'}`}>
          <BookOpen className="h-6 w-6" />
          <span className="text-xs">Diario</span>
        </Link>
        
        <Link to="/nueva-entrada" className={`flex flex-col items-center ${isActive('/nueva-entrada') ? 'text-primary' : 'text-muted-foreground'}`}>
          <PlusCircle className="h-6 w-6" />
          <span className="text-xs">Nueva</span>
        </Link>
        
        <Link to="/perfil" className={`flex flex-col items-center ${isActive('/perfil') ? 'text-primary' : 'text-muted-foreground'}`}>
          <User className="h-6 w-6" />
          <span className="text-xs">Perfil</span>
        </Link>
        
        <Link to="/comunidad" className={`flex flex-col items-center ${isActive('/comunidad') ? 'text-primary' : 'text-muted-foreground'}`}>
          <Users className="h-6 w-6" />
          <span className="text-xs">Comunidad</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;