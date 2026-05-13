'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlowButtonProps {
  children: ReactNode;
  variant?: 'blue' | 'pink' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
  icon?: ReactNode;
}

export default function GlowButton({
  children,
  variant = 'blue',
  size = 'md',
  onClick,
  className = '',
  icon,
}: GlowButtonProps) {
  const sizeClasses = {
    sm: 'px-5 py-2.5 text-xs tracking-[0.2em]',
    md: 'px-8 py-3.5 text-sm tracking-[0.2em]',
    lg: 'px-10 py-4 text-sm tracking-[0.25em]',
  };

  const variantStyles = {
    blue: {
      background: 'linear-gradient(135deg, #00d4ff, #0ea5e9)',
      shadow: '0 0 20px rgba(0, 212, 255, 0.4), 0 0 40px rgba(0, 212, 255, 0.2)',
      hoverShadow: '0 0 30px rgba(0, 212, 255, 0.6), 0 0 60px rgba(0, 212, 255, 0.3), 0 0 90px rgba(0, 212, 255, 0.15)',
    },
    pink: {
      background: 'linear-gradient(135deg, #ff00ff, #ec4899)',
      shadow: '0 0 20px rgba(255, 0, 255, 0.4), 0 0 40px rgba(255, 0, 255, 0.2)',
      hoverShadow: '0 0 30px rgba(255, 0, 255, 0.6), 0 0 60px rgba(255, 0, 255, 0.3), 0 0 90px rgba(255, 0, 255, 0.15)',
    },
    gradient: {
      background: 'linear-gradient(135deg, #00d4ff, #ff00ff)',
      shadow: '0 0 20px rgba(0, 212, 255, 0.3), 0 0 40px rgba(255, 0, 255, 0.2)',
      hoverShadow: '0 0 30px rgba(0, 212, 255, 0.5), 0 0 60px rgba(255, 0, 255, 0.3), 0 0 90px rgba(0, 212, 255, 0.15)',
    },
  };

  const style = variantStyles[variant];

  return (
    <motion.button
      onClick={onClick}
      className={`relative inline-flex items-center justify-center gap-2 font-medium uppercase text-black transition-all duration-300 ${sizeClasses[size]} ${className}`}
      style={{
        background: style.background,
        boxShadow: style.shadow,
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: style.hoverShadow,
      }}
      whileTap={{ scale: 0.97 }}
    >
      <span className="relative z-10 flex items-center gap-2">
        {icon}
        {children}
      </span>
    </motion.button>
  );
}
