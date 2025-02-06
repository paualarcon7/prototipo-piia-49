import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import Diario from "@/pages/Diario";
import NuevaEntrada from "@/pages/NuevaEntrada";
import Perfil from "@/pages/Perfil";
import Comunidad from "@/pages/Comunidad";

function App() {
  return (
    <Router>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="min-h-screen bg-gradient-to-b from-[#0F1729] to-[#0F1729]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/diario" element={<Diario />} />
            <Route path="/nueva-entrada" element={<NuevaEntrada />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/comunidad" element={<Comunidad />} />
          </Routes>
          <Navbar />
          <Toaster />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;