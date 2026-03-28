import { Star, StarHalf } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
}

const sizeClasses = {
  sm: "h-3.5 w-3.5",
  md: "h-4.5 w-4.5",
  lg: "h-5.5 w-5.5",
};

export function RatingStars({ rating, maxRating = 10, size = "md", showValue = true }: RatingStarsProps) {
  const starRating = (rating / maxRating) * 5;
  const fullStars = Math.floor(starRating);
  const hasHalf = starRating - fullStars >= 0.25 && starRating - fullStars < 0.75;
  const extraFull = starRating - fullStars >= 0.75;

  const totalFull = extraFull ? fullStars + 1 : fullStars;
  const showHalf = hasHalf && !extraFull;

  return (
    <div className="flex items-center gap-1.5" role="img" aria-label={`Rating: ${rating} out of ${maxRating}`}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => {
          if (i < totalFull) {
            return <Star key={i} className={`${sizeClasses[size]} fill-primary text-primary`} />;
          }
          if (i === totalFull && showHalf) {
            return <StarHalf key={i} className={`${sizeClasses[size]} fill-primary text-primary`} />;
          }
          return <Star key={i} className={`${sizeClasses[size]} text-border`} />;
        })}
      </div>
      {showValue && (
        <span className="font-sans text-sm font-semibold text-foreground">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
