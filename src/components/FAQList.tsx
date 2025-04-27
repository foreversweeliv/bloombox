"use client"

import { useState } from "react";
import FAQAccordion, { FAQItem } from "./FAQAccordion";

interface FAQListProps {
  items: FAQItem[];
  className?: string;
}

export default function FAQList({ 
  items,
  className = ""
}: FAQListProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`bg-accent/10 rounded-xl p-6 border border-accent-dark ${className}`}>
      {items.map((item, index) => (
        <FAQAccordion
          key={index}
          item={item}
          isOpen={openIndex === index}
          toggleAccordion={() => toggleAccordion(index)}
        />
      ))}
    </div>
  );
} 