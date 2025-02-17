
import React from "react";
import { Plus } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DiaryPromptMenuProps {
  onSelectPrompt: (prompt: string) => void;
}

const prompts = [
  {
    category: "Reflexión diaria",
    items: [
      "¿Qué fue lo mejor que me pasó hoy?",
      "¿Qué aprendí hoy?",
      "¿Qué me hizo sentir agradecido/a?",
    ],
  },
  {
    category: "Emociones",
    items: [
      "¿Por qué me siento así hoy?",
      "¿Qué situaciones provocaron mis emociones?",
      "¿Cómo manejé mis emociones hoy?",
    ],
  },
  {
    category: "Objetivos",
    items: [
      "¿Qué quiero lograr hoy?",
      "¿Qué pasos di hacia mis metas?",
      "¿Qué obstáculos encontré y cómo los superé?",
    ],
  },
];

const DiaryPromptMenu = ({ onSelectPrompt }: DiaryPromptMenuProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="absolute left-3 top-3 w-12 h-12 flex items-center justify-center rounded-full bg-[#FF4081]/10 transition-colors">
          <Plus className="h-8 w-8 text-[#FF4081]" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <div className="bg-secondary/50 backdrop-blur-sm border-secondary/20 rounded-md overflow-hidden">
          <div className="p-2">
            <input
              type="text"
              placeholder="Buscar plantilla..."
              className="w-full px-2 py-1 text-sm bg-secondary/30 border-secondary/20 rounded"
            />
          </div>
          <div className="max-h-80 overflow-y-auto">
            {prompts.map((category) => (
              <div key={category.category} className="p-2">
                <h3 className="text-sm font-medium text-gray-400 mb-1">
                  {category.category}
                </h3>
                <div className="space-y-1">
                  {category.items.map((prompt) => (
                    <button
                      key={prompt}
                      className="w-full text-left px-2 py-1.5 text-sm rounded hover:bg-[#FF4081]/20 transition-colors"
                      onClick={() => onSelectPrompt(prompt)}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DiaryPromptMenu;
