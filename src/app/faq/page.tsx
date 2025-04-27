"use client"

import { FAQItem } from "@/components/FAQAccordion";
import FAQList from "@/components/FAQList";
import SectionHeader from "@/components/SectionHeader";
import { Leaf } from "lucide-react";

const faqs: FAQItem[] = [
  {
    question: "How often should I water my BloomBox?",
    answer: "Most BloomBox arrangements should be watered sparingly once every 7-10 days. Simply add a small amount of water (about 2-3 tablespoons) to the soil, making sure not to oversaturate. Succulents store water in their leaves and stems, so they prefer to dry out between waterings."
  },
  {
    question: "Do BloomBox arrangements need direct sunlight?",
    answer: "Our arrangements thrive in bright, indirect sunlight. Place your BloomBox near a window that gets filtered light throughout the day. Avoid placing in direct, harsh sunlight as this can burn the delicate plants. Most succulents in our arrangements need about 6 hours of indirect light daily."
  },
  {
    question: "How long will my BloomBox arrangement last?",
    answer: "With proper care, your BloomBox arrangement can last for years! Our carefully selected plants are chosen for longevity and durability. The wooden containers are treated to resist moisture damage, and the plants themselves are slow-growing varieties that maintain their beauty over time."
  },
  {
    question: "Can I customize my BloomBox arrangement?",
    answer: "Yes! We offer customization options for all our BloomBox arrangements. You can select specific plant varieties, container styles, and even add personalized messages or decorative elements. Contact our customer service team for more information on customization options."
  },
  {
    question: "How are BloomBox arrangements packaged for shipping?",
    answer: "We take great care in packaging our delicate arrangements. Each BloomBox is secured with biodegradable padding, and plants are stabilized to prevent movement during transit. Our packages are marked as fragile, and we use eco-friendly materials whenever possible to reduce environmental impact."
  },
  {
    question: "What if my BloomBox arrives damaged?",
    answer: "We stand behind the quality of our products. If your BloomBox arrives damaged, please contact us within 48 hours of delivery with photos of the damage, and we'll arrange for a replacement to be sent promptly at no additional cost to you."
  },
];

export default function FAQ() {
  return (
    <main className="min-h-screen pt-20 sm:pt-32 pb-20 max-w-screen overflow-x-hidden flex flex-col justify-center px-4 sm:px-12 items-center">
      <div className="w-full max-w-4xl">
        <div className="animate-slideInLeft">
          <SectionHeader 
            title="Frequently Asked Questions" 
            icon={Leaf} 
            description="Everything you need to know about caring for your BloomBox arrangements and our policies."
            centered={true}
            className="mb-8 sm:mb-12"
          />
        </div>
        
        <div className="animate-slideInLeft stagger-1">
          <FAQList items={faqs} />
        </div>
        
        <div className="mt-8 sm:mt-12 text-center animate-slideInLeft stagger-2">
          <p className="text-base sm:text-lg text-foreground-secondary">
            Still have questions? Feel free to <a href="mailto:hello@bloombox.com" className="text-accent-green-dark font-semibold underline hover-scale inline-block">contact us</a>.
          </p>
        </div>
      </div>
    </main>
  );
} 