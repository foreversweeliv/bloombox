"use client"

import { LucideIcon } from "lucide-react";

interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  href?: string;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  iconLeft?: LucideIcon;
  iconRight?: LucideIcon;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export default function Button({ 
  onClick,
  href,
  variant = 'primary', 
  size = 'medium',
  iconLeft: IconLeft,
  iconRight: IconRight,
  children,
  className = "",
  type = 'button',
  disabled = false
}: ButtonProps) {
  const baseStyles = "select-none flex rounded-full gap-2 font-medium items-center transition-colors duration-300 cursor-pointer justify-center";
  const variants = {
    primary: "bg-accent-green-dark text-accent hover:bg-accent-green-darker",
    secondary: "bg-accent-dark text-accent-green-dark hover:bg-accent-darker"
  };
  const sizes = {
    small: "px-6 py-2 text-sm",
    medium: "px-10 py-3",
    large: "px-12 py-4 text-lg"
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (href) {
      window.location.href = href;
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button 
      onClick={handleClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      type={type}
      disabled={disabled}
    >
      {IconLeft && <IconLeft width={size === 'large' ? 24 : size === 'small' ? 16 : 20} />}
      {children}
      {IconRight && <IconRight width={size === 'large' ? 24 : size === 'small' ? 16 : 20} />}
    </button>
  );
} 