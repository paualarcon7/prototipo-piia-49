
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Index from "./pages/Index";
import Home from "./pages/Home";
import Diario from "./pages/Diario";
import NuevaEntrada from "./pages/NuevaEntrada";
import Ejercicio from "./pages/Ejercicio";
import ProgramaDetalle from "./pages/ProgramaDetalle";
import ModuloDetalle from "./pages/ModuloDetalle";
import InicioStage from "./pages/InicioStage";
import BottomNav from "./components/BottomNav";
import TrabajoStage from "./pages/TrabajoStage";
import EntrenamientoStage from "./pages/EntrenamientoStage";
import Protocolos from "./pages/Protocolos";
import ProtocoloDetalle from "./pages/ProtocoloDetalle";

const queryClient = new QueryClient();

const MenuContent = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col space-y-4 mt-8">
      <h2 className="text-lg font-semibold">Menú</h2>
      <Button 
        variant="ghost" 
        className="justify-start"
        onClick={() => navigate('/home')}
      >
        Home
      </Button>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <div className="relative">
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className="fixed top-4 right-4 z-50 bg-secondary/50 backdrop-blur-sm hover:bg-secondary/60"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <MenuContent />
          </SheetContent>
        </Sheet>

        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/home" element={<Home />} />
            <Route path="/protocolos" element={<Protocolos />} />
            <Route path="/protocolos/:id" element={<ProtocoloDetalle />} />
            <Route path="/diario" element={<Diario />} />
            <Route path="/diario/nueva" element={<NuevaEntrada />} />
            <Route path="/ejercicio/:id" element={<Ejercicio />} />
            <Route path="/programa/:id" element={<ProgramaDetalle />} />
            <Route path="/programa/:id/modulo/:moduleId" element={<ModuloDetalle />} />
            <Route path="/programa/:id/modulo/:moduleId/inicio" element={<InicioStage />} />
            <Route path="/programa/:id/modulo/:moduleId/trabajo" element={<TrabajoStage />} />
            <Route path="/programa/:id/modulo/:moduleId/entrenamiento" element={<EntrenamientoStage />} />
          </Routes>
          <BottomNav />
        </TooltipProvider>
      </div>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
