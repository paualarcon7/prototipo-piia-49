
import { Star } from "lucide-react";

interface StarRatingProps {
  value: number;
  onChange: (rating: number) => void;
}

export const StarRating = ({ value, onChange }: StarRatingProps) => {
  return (
    <div className="flex items-center justify-center gap-2">
      {[1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          onClick={() => onChange(rating)}
          className="transition-all"
        >
          <Star
            className={`w-8 h-8 ${
              rating <= value
                ? "fill-yellow-500 text-yellow-500"
                : "text-gray-400"
            }`}
          />
        </button>
      ))}
    </div>
  );
};
