import { Card } from "./ui/card";

type Emotion = {
  id: number;
  name: string;
  color: string;
  icon: string;
};

interface DiaryEntryProps {
  entry: {
    text: string;
    emotion?: Emotion;
    words: string[];
    audioUrl?: string;
  };
}

const DiaryEntry = ({ entry }: DiaryEntryProps) => {
  return (
    <Card className="bg-secondary/50 backdrop-blur-sm border-secondary/20 p-4">
      <h3 className="text-white font-semibold mb-2">Entrada del día</h3>
      {entry.emotion && (
        <p className="text-gray-300 mb-2">
          Emoción: {entry.emotion.name}
        </p>
      )}
      {entry.words && entry.words.length > 0 && (
        <div className="mb-2">
          <p className="text-gray-300">Palabras:</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {entry.words.map((word) => (
              <span key={word} className="bg-purple-500/20 text-purple-200 px-2 py-1 rounded-full text-sm">
                {word}
              </span>
            ))}
          </div>
        </div>
      )}
      <p className="text-gray-300 whitespace-pre-wrap">
        {entry.text}
      </p>
      {entry.audioUrl && (
        <div className="mt-4">
          <audio
            controls
            src={entry.audioUrl}
            className="w-full"
          />
        </div>
      )}
    </Card>
  );
};

export default DiaryEntry;