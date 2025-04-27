"use client";

import { getCookie, setCookie } from 'cookies-next';
import { Send } from 'lucide-react';
import { useEffect, useState } from 'react';
import Button from './Button';

interface ReviewFormProps {
  productId: string;
  onReviewAdded: () => void;
}

export default function ReviewForm({ productId, onReviewAdded }: ReviewFormProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [hasReviewed, setHasReviewed] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      try {
        const reviewedProducts = getCookie('reviewed_products');
        if (reviewedProducts) {
          const parsed = JSON.parse(reviewedProducts as string);
          if (Array.isArray(parsed) && parsed.includes(productId)) {
            setHasReviewed(true);
          }
        }
      } catch (err) {
        console.error('Error parsing cookie:', err);
      }
    }
  }, [productId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (process.env.NODE_ENV === 'production' && hasReviewed) {
      setError('You have already left a review on this product');
      return;
    }

    if (!firstName || !lastName || !email || !content) {
      setError('Please fill in all required fields');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/reviews/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          firstName,
          lastName,
          email,
          content,
          rating
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send review');
      }

      setFirstName('');
      setLastName('');
      setEmail('');
      setContent('');
      setRating(5);
      
      setSuccess(true);
      
      if (process.env.NODE_ENV === 'production') {
        setHasReviewed(true);
      }
      
      onReviewAdded();
      
      try {
        const reviewedProducts = getCookie('reviewed_products');
        const parsed = reviewedProducts ? JSON.parse(reviewedProducts as string) : [];
        parsed.push(productId);
        setCookie('reviewed_products', JSON.stringify(parsed), {
          maxAge: 60 * 60 * 24 * 365,
          path: '/',
        });
      } catch (err) {
        console.error('Error updating cookie:', err);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (process.env.NODE_ENV === 'production' && hasReviewed) {
    return (
      <div className="mt-8 p-4 border border-accent-green rounded-lg bg-accent-green/10 text-center">
        <p className="text-foreground-secondary">
          Thank you! You have already left a review on this product.
        </p>
      </div>
    );
  }

  if (success) {
    return (
      <div className="mt-8 p-4 border border-accent-green rounded-lg bg-accent-green/10 text-center">
        <p className="font-medium mb-2">Thank you for your review!</p>
        <p className="text-foreground-secondary">
          Your review has been successfully added.
        </p>
        {process.env.NODE_ENV === 'development' && (
          <Button 
            onClick={() => {
              setSuccess(false);
              setFirstName('');
              setLastName('');
              setEmail('');
              setContent('');
              setRating(5);
            }}
            className="mt-4"
          >
            Add another review
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-4">Leave a review</h3>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg text-red-600">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block mb-1 text-foreground-secondary">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-2 border border-accent-dark rounded-lg bg-accent/5"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block mb-1 text-foreground-secondary">
              Last name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-2 border border-accent-dark rounded-lg bg-accent/5"
              required
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="email" className="block mb-1 text-foreground-secondary">
            Email <span className="text-red-500">*</span>
            <span className="text-xs ml-2 font-normal">(will not be shown publicly)</span>
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-accent-dark rounded-lg bg-accent/5"
            required
          />
        </div>
        
        <div>
          <label htmlFor="rating" className="block mb-1 text-foreground-secondary">
            Rating
          </label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full p-2 border border-accent-dark rounded-lg bg-accent/5"
          >
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Good</option>
            <option value="3">3 - Normal</option>
            <option value="2">2 - Bad</option>
            <option value="1">1 - Very bad</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="content" className="block mb-1 text-foreground-secondary">
            Your review <span className="text-red-500">*</span>
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border border-accent-dark rounded-lg bg-accent/5 min-h-[120px]"
            required
          />
        </div>
        
        <div>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            iconRight={Send}
          >
            {isSubmitting ? 'Sending...' : 'Send review'}
          </Button>
        </div>
      </form>
    </div>
  );
} 