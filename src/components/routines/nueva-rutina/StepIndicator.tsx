
interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps) => {
  return (
    <div className="flex justify-center mb-5">
      <div className="flex items-center space-x-2">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map(step => (
          <div 
            key={step}
            className={`h-2.5 w-2.5 rounded-full ${
              step === currentStep ? 'bg-[#02b1bb]' : 
              step < currentStep ? 'bg-gray-400' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
