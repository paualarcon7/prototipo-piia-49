
import { Button } from "./ui/button";

const emotionWords = {
  "Muy bien": [
    "Extático", "Eufórico", "Emocionado", 
    "Inspirado", "Optimista", "Orgulloso",
    "Feliz", "Contento", "Satisfecho"
  ],
  "Bien": [
    "Animado", "Energético", "Entusiasta",
    "Alegre", "Motivado", "Esperanzado",
    "A gusto", "Tranquilo", "Agradecido"
  ],
  "Normal": [
    "Calmado", "Relajado", "Sereno",
    "Neutral", "Pensativo", "En paz"
  ],
  "Mal": [
    "Preocupado", "Ansioso", "Nervioso",
    "Tenso", "Frustrado", "Irritado",
    "Triste", "Cansado", "Desanimado"
  ],
  "Muy mal": [
    "Estresado", "Furioso", "Enfadado",
    "Angustiado", "Deprimido", "Desesperado",
    "Agotado", "Miserable", "Desesperanzado"
  ]
};

interface EmotionWordsProps {
  emotionName: string | null;
  onSelectWord: (word: string) => void;
  selectedWords: string[];
}

const EmotionWords = ({ emotionName, onSelectWord, selectedWords }: EmotionWordsProps) => {
  if (!emotionName) return null;

  const words = emotionWords[emotionName as keyof typeof emotionWords] || [];

  return (
    <div className="mt-6 pt-6 border-t border-white/10">
      <div className="flex flex-wrap gap-2">
        {words.map((word) => (
          <Button
            key={word}
            variant={selectedWords.includes(word) ? "default" : "secondary"}
            className="rounded-full"
            onClick={() => onSelectWord(word)}
          >
            {word}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default EmotionWords;
