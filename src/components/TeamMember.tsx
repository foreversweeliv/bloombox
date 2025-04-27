"use client"

import Image from "next/image";

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  className?: string;
}

export default function TeamMember({ 
  name, 
  role, 
  image,
  className = ''
}: TeamMemberProps) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="w-64 h-64 relative rounded-full overflow-hidden mb-4 border-4 border-accent-green">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <h3 className="text-2xl font-semibold font-alternates text-accent-green-dark">{name}</h3>
      <p className="text-foreground-secondary">{role}</p>
    </div>
  );
} 