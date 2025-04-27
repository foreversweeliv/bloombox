"use client"

import { Leaf } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="w-full fixed top-0 z-50">
      <div className={`w-full px-4 sm:px-12 h-16 sm:h-20 flex justify-between items-center text-accent-green-dark transition-all duration-300 ${hasScrolled ? 'bg-background shadow-md' : ''}`}>
        <Link href="/" className="text-xl sm:text-2xl font-black font-alternates flex items-center gap-2" onClick={closeMobileMenu}>
          <Leaf className="w-6 h-6 sm:w-8 sm:h-8"/>
          BloomBox
        </Link>
        
        <div className="hidden sm:flex items-center gap-6 text-xl font-alternates font-semibold">
          <Link 
            href="/about" 
            className={`hover:text-foreground transition-colors duration-300 ${isActive('/about') ? 'text-foreground' : ''}`}
          >
            About
          </Link>
          <Link 
            href="/products" 
            className={`hover:text-foreground transition-colors duration-300 ${isActive('/products') ? 'text-foreground' : ''}`}
          >
            Products
          </Link>
          <Link 
            href="/faq" 
            className={`hover:text-foreground transition-colors duration-300 ${isActive('/faq') ? 'text-foreground' : ''}`}
          >
            FAQ
          </Link>
        </div>

        <button 
          className="sm:hidden p-2 hover:bg-accent-dark/10 rounded-full transition-colors relative z-50"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-6">
            <span className={`absolute left-0 block h-0.5 w-6 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 top-3' : 'top-1'}`} />
            <span className={`absolute left-0 block h-0.5 w-6 bg-current top-3 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`absolute left-0 block h-0.5 w-6 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 top-3' : 'top-5'}`} />
          </div>
        </button>
      </div>

      <div 
        className={`fixed inset-0 bg-background transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        style={{ zIndex: 40 }}
      >
        <div className={`pt-24 px-4 flex flex-col items-center gap-8 transition-all duration-500 transform ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          {[
            { path: '/about', label: 'About' },
            { path: '/products', label: 'Products' },
            { path: '/faq', label: 'FAQ' }
          ].map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`text-2xl font-alternates font-semibold transition-colors duration-300 relative group ${isActive(item.path) ? 'text-accent-green-dark' : 'hover:text-accent-green-dark'}`}
              onClick={closeMobileMenu}
            >
              {item.label}
              <span className={`absolute -bottom-2 left-0 w-full h-0.5 bg-accent-green-dark transform origin-left transition-transform duration-300 ${isActive(item.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
} 