"use client";

import { useState } from "react";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";

interface ReviewSectionProps {
  productId: string;
}

export default function ReviewSection({ productId }: ReviewSectionProps) {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleReviewAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div>
      <h2 className="font-bold text-3xl mb-6">Reviews</h2>
      
      <ReviewList key={`review-list-${refreshKey}`} productId={productId} />
      <ReviewForm productId={productId} onReviewAdded={handleReviewAdded} />
    </div>
  );
} 