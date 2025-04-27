import { getReviewsByProductId } from '@/lib/db.server';
import { maskEmail } from '@/types/reviews';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const productId = searchParams.get('productId');

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const reviews = getReviewsByProductId(productId);
    
    const sanitizedReviews = reviews.map(review => ({
      ...review,
      email: maskEmail(review.email)
    }));

    return NextResponse.json(sanitizedReviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
} 