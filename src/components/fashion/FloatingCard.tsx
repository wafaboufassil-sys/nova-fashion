'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface FloatingCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'blue' | 'pink' | 'none';
}

export default function FloatingCard({ children, className = '', glowColor = 'blue' }: FloatingCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg']);

  const glowStyles = {
    blue: 'hover:shadow-[0_0_30px_rgba(0,212,255,0.3),0_0_60px_rgba(0,212,255,0.1)]',
    pink: 'hover:shadow-[0_0_30px_rgba(255,0,255,0.3),0_0_60px_rgba(255,0,255,0.1)]',
    none: '',
  };

  const borderGlow = {
    blue: 'hover:border-[rgba(0,212,255,0.3)]',
    pink: 'hover:border-[rgba(255,0,255,0.3)]',
    none: '',
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className={`glass transition-all duration-500 cursor-pointer ${glowStyles[glowColor]} ${borderGlow[glowColor]} ${className}`}
    >
      {children}
    </motion.div>
  );
}
