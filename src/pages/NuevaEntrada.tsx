import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

type Emotion = {
  id: number;
  name: string;
  color: string;
  icon: string;
};

const NuevaEntrada = () => {
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSave = () => {
    if (!text.trim()) return;

    // Here you would save the entry
    toast({
      title: "Entrada guardada",
      description: "Tu registro ha sido guardado exitosamente.",
    });
    
    navigate("/diario");
  };

  return (
    <div className="flex flex-col min-h-screen p-4 pt-16 space-y-4">
      <div className="relative flex-1">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="¿Qué está pasando?"
          className="min-h-[150px] bg-[#1A1F2C]/90 border-0 text-white placeholder:text-gray-400 focus:ring-1 focus:ring-purple-500"
        />
      </div>

      <div className="flex justify-end gap-2 mt-6">
        <Button variant="outline" onClick={() => navigate("/diario")}>
          Cancelar
        </Button>
        <Button onClick={handleSave} disabled={!text.trim()}>
          Guardar
        </Button>
      </div>
    </div>
  );
};

export default NuevaEntrada;