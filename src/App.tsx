import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Index from "./pages/Index";
import Bienestar from "./pages/Bienestar";
import Diario from "./pages/Diario";
import Tests from "./pages/Tests";
import BottomNav from "./components/BottomNav";

const queryClient = new QueryClient();

const MenuContent = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col space-y-4 mt-8">
      <h2 className="text-lg font-semibold">Menú</h2>
      <Button 
        variant="ghost" 
        className="justify-start"
        onClick={() => navigate('/tests')}
      >
        Tests
      </Button>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className="fixed top-4 right-4 z-50"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <MenuContent />
          </SheetContent>
        </Sheet>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/bienestar" element={<Bienestar />} />
          <Route path="/diario" element={<Diario />} />
          <Route path="/tests" element={<Tests />} />
        </Routes>
        <BottomNav />
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;