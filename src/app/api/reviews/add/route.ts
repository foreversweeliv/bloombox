import { products } from '@/data/products';
import { addReview } from '@/lib/db.server';
import { maskEmail, ReviewInput } from '@/types/reviews';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const requiredFields = ['productId', 'firstName', 'lastName', 'email', 'content', 'rating'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Field '${field}' is required` },
          { status: 400 }
        );
      }
    }

    const rating = Number(body.rating);
    if (isNaN(rating) || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be a number between 1 and 5' },
        { status: 400 }
      );
    }

    const productExists = products.some(product => product.id === body.productId);
    if (!productExists) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    if (process.env.NODE_ENV === 'production') {
      const reviewedProductsCookie = request.cookies.get('reviewed_products');
      const reviewedProducts = reviewedProductsCookie?.value 
        ? JSON.parse(reviewedProductsCookie.value) 
        : [];

      if (reviewedProducts.includes(body.productId)) {
        return NextResponse.json(
          { error: 'You have already reviewed this product' },
          { status: 400 }
        );
      }
    }

    const reviewInput: ReviewInput = {
      productId: body.productId,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      content: body.content,
      rating
    };

    const newReview = addReview(reviewInput);

    const response = NextResponse.json({
      success: true,
      review: {
        ...newReview,
        email: maskEmail(newReview.email)
      }
    });

    if (process.env.NODE_ENV === 'production') {
      const reviewedProductsCookie = request.cookies.get('reviewed_products');
      const reviewedProducts = reviewedProductsCookie?.value 
        ? JSON.parse(reviewedProductsCookie.value) 
        : [];
      
      reviewedProducts.push(body.productId);
      
      response.cookies.set({
        name: 'reviewed_products',
        value: JSON.stringify(reviewedProducts),
        secure: true,
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 365,
        path: '/'
      });
    }

    return response;
  } catch (error) {
    console.error('Error adding review:', error);
    return NextResponse.json(
      { error: 'Failed to add review' },
      { status: 500 }
    );
  }
} 