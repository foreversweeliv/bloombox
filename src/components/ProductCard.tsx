"use client";

import Button from "@/components/Button";
import Rating from "@/components/Rating";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  price: number;
  oldPrice?: number;
  isReversed?: boolean;
  rating?: number;
  className?: string;
}

export default function ProductCard({
  title,
  description,
  image,
  price,
  oldPrice,
  isReversed = false,
  rating = 5,
  className = ''
}: ProductCardProps) {
  return (
    <div className={`w-full flex flex-col sm:flex-row gap-6 sm:gap-12 ${isReversed ? 'sm:flex-row-reverse sm:justify-end' : ''} ${className}`}>
      <div className={`relative min-h-[250px] sm:min-h-[350px] w-full sm:w-[40%] rounded-3xl p-4 sm:p-8 overflow-visible ${isReversed ? ' bg-accent-green' : 'bg-accent-dark'}`}>
        <div className="absolute inset-0 scale-[1.2] -translate-y-[10%]">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className={`object-contain transition-transform duration-300 ${isReversed ? '' : 'scale-x-[-1]'}`}
            priority
          />
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div className={`flex-1 flex flex-col gap-4 ${isReversed ? 'sm:items-end' : ''}`}>
          <h1 className={`font-bold text-3xl sm:text-4xl ${isReversed ? 'sm:text-right' : ''}`}>{title}</h1>
          <p className={`text-foreground-secondary text-base sm:text-lg ${isReversed ? 'sm:text-right' : ''}`}>
            {description}
          </p>
          <Rating value={rating} />
        </div>
        <div className={`flex items-end gap-4 mt-2 ${isReversed ? 'sm:justify-end' : ''}`}>
          <span className="text-2xl sm:text-3xl font-bold">${price.toFixed(2)}</span>
          {oldPrice && (
            <span className="text-lg sm:text-xl text-foreground-secondary line-through">
              ${oldPrice.toFixed(2)}
            </span>
          )}
        </div>
        <div className={`mt-4 ${isReversed ? 'sm:flex sm:justify-end' : ''}`}>
          <Button iconLeft={ShoppingCart} className="w-full sm:w-auto">Buy Now</Button>
        </div>
      </div>
    </div>
  );
} 