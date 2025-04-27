"use client"

import ImageSection from "@/components/ImageSection";
import SectionHeader from "@/components/SectionHeader";
import TeamMember from "@/components/TeamMember";
import { Leaf, Users } from "lucide-react";

export default function About() {
  return (
    <main className="min-h-screen pt-20 sm:pt-32 pb-20 max-w-screen overflow-x-hidden flex flex-col justify-center px-4 sm:px-12 items-center">
      <section className="w-full max-w-6xl mb-12 sm:mb-20">
        <div className="animate-slideInLeft">
          <SectionHeader 
            title="Our Story" 
            icon={Leaf} 
          />
        </div>
        
        <div className="animate-slideInLeft stagger-1">
          <ImageSection 
            imageSrc="/images/product1.png"
            imageAlt="BloomBox workshop"
            content={
              <>
                <p className="text-base sm:text-xl text-foreground-secondary mb-4 sm:mb-6">
                  Founded in 2018, BloomBox began with a simple vision: to bring the beauty of nature into homes and offices through carefully crafted miniature gardens. Our journey started with a small workshop and a passionate team of horticulturists and designers.
                </p>
                <p className="text-base sm:text-xl text-foreground-secondary">
                  Today, we&apos;re proud to create unique, sustainable arrangements that connect people with nature in creative ways. Each BloomBox is handcrafted with care, combining the art of design with the science of plant care.
                </p>
              </>
            }
          />
        </div>
      </section>

      <section className="w-full max-w-6xl mb-12 sm:mb-20">
        <div className="animate-slideInLeft stagger-2">
          <SectionHeader 
            title="Meet Our Team" 
            icon={Users} 
            description="The passionate people behind BloomBox's beautiful creations."
            centered={true}
            className="text-center mb-8 sm:mb-12"
          />
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-8 sm:gap-12">
          <div className="animate-scale stagger-1 w-full sm:w-auto">
            <TeamMember 
              name="Emily Chen" 
              role="Founder & Creative Director" 
              image="/images/EmilyChen.jpg"
              className="hover-lift" 
            />
          </div>
          <div className="animate-scale stagger-2 w-full sm:w-auto">
            <TeamMember 
              name="Marcus Rodriguez" 
              role="Lead Horticulturist" 
              image="/images/MarcusRodriguez.jpg"
              className="hover-lift" 
            />
          </div>
          <div className="animate-scale stagger-3 w-full sm:w-auto">
            <TeamMember 
              name="Sophia Kim" 
              role="Design Specialist" 
              image="/images/SophiaKim.jpg"
              className="hover-lift" 
            />
          </div>
        </div>
      </section>
    </main>
  );
} 