"use client"

import Button from "@/components/Button";
import Branch1 from "@/components/Icons/Branch1";
import Branch2 from "@/components/Icons/Branch2";
import DecorativeShape from "@/components/Icons/DecorativeShape";
import { ArrowRight, ShoppingCart } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen max-w-screen overflow-x-hidden flex flex-col justify-center px-4 sm:px-12 items-center">
      <div className="z-[-10]">
        <Branch1 className="absolute bottom-[-20vh] left-0 h-[80vh] w-auto hidden sm:block" />
        <Branch2 className="absolute top-0 right-0 h-[30vh] w-auto hidden sm:block" />
      </div>
      <div className="flex flex-col-reverse sm:flex-row justify-center items-center w-full gap-8 sm:gap-0">
        <div className="flex flex-1 flex-col gap-4 sm:gap-7 text-center sm:text-left">
          <h1 className="font-bold text-4xl sm:text-7xl animate-slideInLeft">
            Miniature Gardens in Beautiful Arrangement
          </h1>
          <p className="text-xl sm:text-2xl font-medium text-foreground-secondary animate-slideInLeft stagger-1">
            Receive a unique, handcrafted miniature gardens in your
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 animate-slideInLeft stagger-2 items-center sm:items-start">
            <Button href="/products" iconLeft={ShoppingCart} className="w-full sm:w-auto">
              Shop Now
            </Button>
            <Button href="/about" variant="secondary" iconRight={ArrowRight} className="w-full sm:w-auto">
              About Us
            </Button>
          </div>
        </div>
        <div className="relative flex items-center select-none justify-center w-[80%] sm:w-[35%] sm:mr-[2%] -z-10 animate-scale">
          <DecorativeShape className="absolute h-[90%] w-auto" />
          <Image
            src="/images/product1.png"
            alt="Miniature garden in wooden box"
            width={1000}
            height={1000}
            className="relative z-10 w-full h-auto hover-lift"
          />
        </div>
      </div>
    </main>
  );
}
