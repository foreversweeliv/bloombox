"use client";

import { Review } from '@/types/reviews';
import { useEffect, useState } from 'react';
import Rating from './Rating';

interface ReviewListProps {
  productId: string;
}

export default function ReviewList({ productId }: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReviews() {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/reviews?productId=${productId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        setError('Failed to load reviews. Please try again later.');
        console.error('Error fetching reviews:', err);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchReviews();
  }, [productId]);

  if (isLoading) {
    return <div className="mt-8 text-center">Loading reviews...</div>;
  }

  if (error) {
    return <div className="mt-8 text-red-500">{error}</div>;
  }

  if (reviews.length === 0) {
    return (
      <div className="mt-8 p-4 border border-accent-dark rounded-lg bg-accent/10">
        <p className="text-center text-foreground-secondary italic">
          There are no reviews for this product yet. Be the first to leave a review!
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-6">
      {reviews.map(review => (
        <div key={review.id} className="p-4 border border-accent-dark rounded-lg bg-accent/10">
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="font-medium text-lg">
                {review.firstName} {review.lastName}
              </p>
              <p className="text-sm text-foreground-secondary">
                {review.email}
              </p>
            </div>
            <Rating value={review.rating} size="small" />
          </div>
          <p className="text-foreground-secondary">{review.content}</p>
          <div className="text-xs text-foreground-secondary mt-3">
            {new Date(review.createdAt).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>
      ))}
    </div>
  );
} 