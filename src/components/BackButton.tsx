"use client"

import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface BackButtonProps {
  href: string;
  children: React.ReactNode;
}

export default function BackButton({ href, children }: BackButtonProps) {
  return (
    <Link href={href} className="inline-flex items-center gap-2 text-accent-green-dark hover:underline mb-6">
      <ChevronLeft className="h-5 w-5" />
      <span>{children}</span>
    </Link>
  );
} 