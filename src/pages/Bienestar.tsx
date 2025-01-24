import ExerciseSection from "@/components/ExerciseSection";

const Bienestar = () => {
  return (
    <div className="flex flex-col h-screen bg-transparent pb-16">
      <div className="bg-secondary/50 backdrop-blur-sm border-b border-secondary/20 p-4">
        <h1 className="text-xl font-bold text-white">Bienestar</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <ExerciseSection />
      </div>
    </div>
  );
};

export default Bienestar;