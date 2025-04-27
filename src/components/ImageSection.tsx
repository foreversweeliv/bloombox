"use client"

import Image from "next/image";

interface ImageSectionProps {
  content: React.ReactNode;
  imageSrc: string;
  imageAlt: string;
  isReversed?: boolean;
  className?: string;
  imageClassName?: string;
}

export default function ImageSection({
  content,
  imageSrc,
  imageAlt,
  isReversed = false,
  className = "",
  imageClassName = ""
}: ImageSectionProps) {
  return (
    <div className={`flex gap-12 items-center ${isReversed ? 'sm:flex-row-reverse flex-col-reverse' : 'sm:flex-row flex-col'} ${className}`}>
      <div className="flex-1">
        {content}
      </div>
      <div className={`sm:block hidden flex-1 relative h-[400px] rounded-xl overflow-hidden ${imageClassName}`}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
} 