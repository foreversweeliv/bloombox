"use client"

import Button from "@/components/Button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen pt-32 pb-20 max-w-screen overflow-x-hidden flex flex-col justify-center px-12 items-center">
      <div className="text-center max-w-xl">
        <h1 className="text-4xl font-bold mb-4">Product not found</h1>
        <p className="text-foreground-secondary text-xl mb-8">Sorry, the requested product was not found or has been removed.</p>
        <Link href="/products">
          <Button iconLeft={ChevronLeft}>Back to products</Button>
        </Link>
      </div>
    </main>
  );
} 