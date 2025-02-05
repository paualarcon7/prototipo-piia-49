import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Image as ImageIcon, MapPin, X } from "lucide-react";
import EmotionSelector from "./EmotionSelector";
import EmotionWords from "./EmotionWords";
import DiaryPromptMenu from "./DiaryPromptMenu";

type Emotion = {
  id: number;
  name: string;
  color: string;
  icon: string;
};

interface NewDiaryEntryProps {
  onSave: (entry: {
    text: string;
    emotion?: Emotion;
    words: string[];
    imageUrl?: string;
  }) => void;
  onCancel: () => void;
  preselectedEmotion?: Emotion | null;
}

const NewDiaryEntry = ({ onSave, onCancel, preselectedEmotion }: NewDiaryEntryProps) => {
  const [text, setText] = useState("");
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(preselectedEmotion || null);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState<string>();
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    // Aquí iría la lógica de subida de imagen
    // Por ahora solo simulamos una URL local
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result as string);
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!text.trim()) return;

    onSave({
      text,
      emotion: selectedEmotion || undefined,
      words: selectedWords,
      imageUrl,
    });
  };

  const handlePromptSelect = (prompt: string) => {
    setText((prev) => prev ? `${prev}\n\n${prompt}` : prompt);
  };

  return (
    <div>
      {!preselectedEmotion && (
        <EmotionSelector
          onSelect={setSelectedEmotion}
          selectedEmotion={selectedEmotion}
        />
      )}
      
      {selectedEmotion && (
        <EmotionWords
          emotionName={selectedEmotion.name}
          onSelectWord={(word) => {
            setSelectedWords((prev) =>
              prev.includes(word)
                ? prev.filter((w) => w !== word)
                : [...prev, word]
            );
          }}
          selectedWords={selectedWords}
        />
      )}

      <div className="relative mt-4">
        <DiaryPromptMenu onSelectPrompt={handlePromptSelect} />
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="¿Qué está pasando?"
          className="min-h-[150px] bg-[#1A1F2C]/90 border-0 text-white placeholder:text-gray-400 pl-10 focus:ring-1 focus:ring-purple-500"
        />
      </div>

      <div className="mt-4 flex items-center gap-4">
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
          <div className="relative">
            <img
              src={imageUrl}
              alt=""
              className="w-16 h-16 rounded-lg object-cover"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2 w-6 h-6"
              onClick={() => setImageUrl(undefined)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2 mt-6">
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button onClick={handleSave} disabled={!text.trim()}>
          Guardar
        </Button>
      </div>
    </div>
  );
};

export default NewDiaryEntry;