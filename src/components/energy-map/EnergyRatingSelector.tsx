
import { cn } from "@/lib/utils";

interface EnergyRatingSelectorProps {
  value: number;
  onChange: (rating: number) => void;
}

export const EnergyRatingSelector = ({ value, onChange }: EnergyRatingSelectorProps) => {
  return (
    <div className="flex items-center gap-2 justify-center my-4">
      {[1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          onClick={() => onChange(rating)}
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center transition-all",
            value === rating
              ? "bg-[#02b1bb] text-white"
              : "bg-secondary hover:bg-secondary/80 text-gray-400"
          )}
        >
          {rating}
        </button>
      ))}
    </div>
  );
};
