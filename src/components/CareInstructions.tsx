"use client"

import { Check } from "lucide-react";

interface CareInstructionsProps {
  instructions: string[];
}

export default function CareInstructions({ instructions }: CareInstructionsProps) {
  return (
    <div>
      <h2 className="font-bold text-3xl mb-4">Care</h2>
      <ul className="grid grid-cols-2 gap-4">
        {instructions.map((instruction, index) => (
          <li key={index} className="flex items-start gap-2">
            <Check className="h-6 w-6 text-accent-green flex-shrink-0 mt-1" />
            <span className="text-lg text-foreground-secondary">{instruction}</span>
          </li>
        ))}
      </ul>
    </div>
  );
} 