"use client"

import { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  icon?: LucideIcon;
  description?: string;
  className?: string;
  centered?: boolean;
}

export default function SectionHeader({
  title,
  icon: Icon,
  description,
  className = "",
  centered = false
}: SectionHeaderProps) {
  return (
    <div className={`${centered ? 'text-center' : ''} ${className}`}>
      <div className={`flex items-center gap-3 mb-4 ${centered ? 'justify-center' : 'justify-start'}`}>
        {Icon && <Icon className="w-10 h-10 text-accent-green-dark sm:block hidden" />}
        <h2 className="font-bold text-5xl font-alternates text-accent-green-dark">
          {title}
        </h2>
      </div>
      {description && (
        <p className="text-xl text-foreground-secondary max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
} 