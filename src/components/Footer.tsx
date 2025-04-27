import AmericanExpress from "@/components/Icons/AmericanExpress";
import Facebook from "@/components/Icons/Facebook";
import Instagram from "@/components/Icons/Instagram";
import Mastercard from '@/components/Icons/Mastercard';
import PaymentIcon from "@/components/Icons/PaymentIcon";
import Paypal from "@/components/Icons/Paypal";
import SocialIcon from "@/components/Icons/SocialIcon";
import Telegram from "@/components/Icons/Telegram";
import Visa from "@/components/Icons/Visa";
import { Leaf } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full relative">
      <div className="w-full h-20 sm:h-30 overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1440 320"
          className="w-full h-full"
        >
          <path
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            fill="#3A512C"
            className="transition-all duration-300"
          />
        </svg>
      </div>
      <div className="px-4 sm:px-12 pb-8 sm:pb-12 bg-accent-green-dark flex flex-col sm:flex-row w-full justify-between gap-8 sm:gap-0">
        <div className="flex flex-col gap-4 sm:gap-1 justify-between">
          <div className="flex flex-col items-center sm:items-start gap-2 sm:gap-0">
            <div className="text-xl sm:text-2xl font-medium font-alternates flex flex-col sm:flex-row items-center gap-2 text-accent-dark text-center sm:text-left">
              <div className="flex items-center gap-2">
                <Leaf className="w-6 h-6 sm:w-8 sm:h-8" />
                <span>© </span>
                <span className="text-accent font-black">BloomBox</span>
              </div>
              <span className="hidden sm:inline"> 2025. All rights reserved.</span>
            </div>
            <p className="text-accent-dark text-center sm:text-left">
              Bringing nature closer — one box at a time.
            </p>
            <a href="mailto:hello@bloombox.com" className="text-accent underline font-bold">
              hello@bloombox.com
            </a>
            <p className="text-accent underline font-bold">+1 (414) 865-2992</p>
          </div>
          <div className="flex justify-center sm:justify-start gap-5">
            <SocialIcon>
              <a href="https://t.me/bloombox" target="_blank" rel="noopener noreferrer">
                <Telegram className="h-8 sm:h-10" />
              </a>
            </SocialIcon>
            <SocialIcon>
              <a href="https://instagram.com/bloombox" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-8 sm:h-10" />
              </a>
            </SocialIcon>
            <SocialIcon>
              <a href="https://facebook.com/bloombox" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-8 sm:h-10" />
              </a>
            </SocialIcon>
          </div>
        </div>
        <div className="flex flex-row sm:flex-col justify-center gap-3 sm:gap-1.5">
          <PaymentIcon>
            <Mastercard className="h-4 sm:h-6" />
          </PaymentIcon>
          <PaymentIcon>
            <Visa className="h-2 sm:h-3" />
          </PaymentIcon>
          <PaymentIcon>
            <Paypal className="h-4 sm:h-6" />
          </PaymentIcon>
          <PaymentIcon>
            <AmericanExpress className="h-3 sm:h-4" />
          </PaymentIcon>
        </div>
      </div>
      <div className="bg-accent-green-darker py-4 px-4 sm:px-12">
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm sm:text-base">
          <Link href="/" className="text-accent hover:text-accent-dark transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-accent hover:text-accent-dark transition-colors">
            About
          </Link>
          <Link href="/products" className="text-accent hover:text-accent-dark transition-colors">
            Products
          </Link>
          <Link href="/faq" className="text-accent hover:text-accent-dark transition-colors">
            FAQ
          </Link>
        </div>
      </div>
    </footer>
  );
} 