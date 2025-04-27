"use client"

import { ChevronDown, ChevronUp } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  item: FAQItem;
  isOpen: boolean;
  toggleAccordion: () => void;
}

export default function FAQAccordion({ 
  item, 
  isOpen, 
  toggleAccordion 
}: FAQAccordionProps) {
  return (
    <div className="border-b border-accent-dark">
      <button
        className="w-full py-6 px-4 flex justify-between items-center text-left focus:outline-none"
        onClick={toggleAccordion}
      >
        <h3 className="text-xl font-alternates font-semibold text-accent-green-dark">
          {item.question}
        </h3>
        {isOpen ? (
          <ChevronUp className="text-accent-green-dark" />
        ) : (
          <ChevronDown className="text-accent-green-dark" />
        )}
      </button>
      {isOpen && (
        <div className="py-4 px-4 bg-accent/30 rounded-b-lg mb-4">
          <p className="text-foreground-secondary">{item.answer}</p>
        </div>
      )}
    </div>
  );
} 