
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Image as ImageIcon, ChevronLeft } from "lucide-react";
import DiaryPromptMenu from "@/components/DiaryPromptMenu";
import type { DiaryEntry } from "./Diario";

const NuevaEntrada = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState<string>();
  const [isUploading, setIsUploading] = useState(false);

  const { selectedEmotion, selectedWords } = location.state || {};

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result as string);
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!text.trim()) {
      toast({
        title: "Error",
        description: "Por favor escribe algo antes de guardar",
        variant: "destructive",
      });
      return;
    }

    const newEntry: DiaryEntry = {
      id: Date.now().toString(),
      text: text.trim(),
      createdAt: new Date(),
      date: new Date().toISOString().split('T')[0],
      imageUrl,
      emotion: selectedEmotion,
      words: selectedWords || [],
    };

    navigate('/diario', { state: { newEntry } });
  };

  const handlePromptSelect = (prompt: string) => {
    setText((prev) => prev ? `${prev}\n\n${prompt}` : prompt);
  };

  return (
    <div className="min-h-screen pb-20 p-4 pt-16 space-y-4">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/diario')}
          className="rounded-full"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-semibold">Nueva entrada</h1>
      </div>

      <div className="relative">
        <DiaryPromptMenu onSelectPrompt={handlePromptSelect} />
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="¿Qué está pasando?"
          className="min-h-[200px] bg-[#1A1F2C]/90 border-0 text-white placeholder:text-gray-400 pl-10 focus:ring-1 focus:ring-purple-500"
        />
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className="relative overflow-hidden"
          disabled={isUploading}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <ImageIcon className="w-4 h-4" />
        </Button>

        {imageUrl && (
          <img
            src={imageUrl}
            alt="Imagen adjunta"
            className="w-16 h-16 rounded-lg object-cover"
          />
        )}
      </div>

      <Button 
        onClick={handleSave}
        className="w-full bg-[#FF4081] hover:bg-[#FF4081]/90"
        disabled={!text.trim()}
      >
        Guardar entrada
      </Button>
    </div>
  );
};

export default NuevaEntrada;
