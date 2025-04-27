"use client";

import { Star } from "lucide-react";

interface RatingProps {
  value?: number;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export default function Rating({ value = 5, size = 'medium', className = "" }: RatingProps) {
  const maxRating = 5;
  const filledStars = Math.min(value, maxRating);
  const emptyStars = maxRating - filledStars;

  const starSizes = {
    small: 'w-3 h-3',
    medium: 'w-4 h-4',
    large: 'w-5 h-5'
  };

  const starSize = starSizes[size];

  return (
    <div className={`flex gap-1 ${className}`}>
      {[...Array(filledStars)].map((_, i) => (
        <Star key={`filled-${i}`} className={`${starSize} fill-star text-star`} />
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className={`${starSize} text-star`} />
      ))}
    </div>
  );
} 