
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { StarRating } from "./StarRating";

interface Option {
  value: string;
  label: string;
  color: string;
}

interface Question {
  id: number;
  text: string;
  options: Option[];
  isTextInput?: boolean;
  isStarRating?: boolean;
}

interface TestQuestionProps {
  questions: Question[];
  onComplete: (results: Record<number, string>) => void;
  onBack: () => void;
}

const TestQuestion = ({ questions, onComplete, onBack }: TestQuestionProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleNext = () => {
    if (currentQuestion === questions.length - 1) {
      onComplete(answers);
    } else {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestion === 0) {
      onBack();
    } else {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen p-4 pb-20">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="icon" onClick={handleBack}>
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <span className="ml-4 text-sm text-muted-foreground">
          {currentQuestion + 1} / {questions.length}
        </span>
      </div>

      <h2 className="text-2xl font-semibold mb-8">{question.text}</h2>

      {question.isStarRating ? (
        <StarRating
          value={parseInt(answers[question.id] || "0")}
          onChange={(rating) => {
            setAnswers(prev => ({ ...prev, [question.id]: rating.toString() }));
          }}
        />
      ) : question.isTextInput ? (
        <Textarea
          value={answers[question.id] || ""}
          onChange={(e) => {
            setAnswers(prev => ({ ...prev, [question.id]: e.target.value }));
          }}
          className="min-h-[150px]"
          placeholder="Escribe tu respuesta aquí..."
        />
      ) : (
        <RadioGroup
          value={answers[question.id]}
          onValueChange={(value) => {
            setAnswers(prev => ({ ...prev, [question.id]: value }));
          }}
          className="space-y-4"
        >
          {question.options.map((option) => (
            <div
              key={option.value}
              className="flex items-center space-x-3 rounded-lg border p-4 bg-secondary/50 backdrop-blur-sm"
            >
              <RadioGroupItem
                value={option.value}
                id={option.value}
                className={`border-${option.color}-500`}
              />
              <Label htmlFor={option.value} className="flex-grow cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      )}

      <div className="fixed bottom-20 left-0 right-0 p-4 flex justify-between bg-background/80 backdrop-blur-sm border-t">
        <Button variant="outline" onClick={handleBack}>
          Atrás
        </Button>
        <Button
          onClick={handleNext}
          disabled={!answers[question.id]}
        >
          {currentQuestion === questions.length - 1 ? "Finalizar" : "Siguiente"}
        </Button>
      </div>
    </div>
  );
};

export default TestQuestion;
