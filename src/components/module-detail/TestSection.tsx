
import TestQuestion from "@/components/TestQuestion";
import { Question } from "@/types/module";

interface TestSectionProps {
  questions: Question[];
  onComplete: (answers: any) => void;
  onBack: () => void;
}

export const TestSection = ({ questions, onComplete, onBack }: TestSectionProps) => {
  return (
    <TestQuestion
      questions={questions}
      onComplete={onComplete}
      onBack={onBack}
    />
  );
};
