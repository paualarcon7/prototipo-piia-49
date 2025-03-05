
interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps) => {
  return (
    <div className="flex justify-center mb-5">
      <div className="flex items-center space-x-3">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map(step => (
          <div key={step} className="flex flex-col items-center">
            <div 
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                step === currentStep ? 'bg-brand-teal scale-110' : 
                step < currentStep ? 'bg-gray-400' : 'bg-gray-600'
              }`}
            />
            {step < totalSteps && (
              <div className="w-10 h-0.5 bg-gray-600 mt-1.5" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
