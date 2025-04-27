"use client"

import Button from "@/components/Button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen pt-32 pb-20 max-w-screen overflow-x-hidden flex flex-col justify-center px-12 items-center">
      <div className="text-center max-w-xl">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-3xl font-medium mb-4">Page not found</h2>
        <p className="text-foreground-secondary text-xl mb-8">
          Sorry, the requested page does not exist or has been moved.
        </p>
        <Link href="/">
          <Button iconLeft={ChevronLeft}>Back to home</Button>
        </Link>
      </div>
    </main>
  );
} 