import { Button } from "./ui/button";
import { Card } from "./ui/card";

const emotionWords = {
  "Muy bien": ["A gusto", "Emocionado", "Feliz", "Inspirado", "Alegre", "En paz", "Satisfecho", "Sereno"],
  "Bien": ["Tranquilo", "Optimista", "Agradecido", "Motivado", "Esperanzado"],
  "Normal": ["Neutral", "Calmado", "Estable"],
  "Mal": ["Preocupado", "Ansioso", "Cansado", "Frustrado"],
  "Muy mal": ["Triste", "Estresado", "Abrumado", "Angustiado"]
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
    <Card className="p-4 mt-4 bg-secondary/50 backdrop-blur-sm border-secondary/20">
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
    </Card>
  );
};

export default EmotionWords;