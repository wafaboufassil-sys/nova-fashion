'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useCallback } from 'react';
import FloatingCard from './FloatingCard';

const categories = [
  {
    name: 'Sneakers',
    count: '48 Items',
    gradient: 'category-gradient-sneakers',
    glowColor: 'blue' as const,
    icon: '👟',
    accent: '#00d4ff',
  },
  {
    name: 'Hoodies',
    count: '36 Items',
    gradient: 'category-gradient-hoodies',
    glowColor: 'pink' as const,
    icon: '🧥',
    accent: '#ff00ff',
  },
  {
    name: 'Jackets',
    count: '24 Items',
    gradient: 'category-gradient-jackets',
    glowColor: 'blue' as const,
    icon: '🧤',
    accent: '#0ea5e9',
  },
  {
    name: 'Streetwear',
    count: '62 Items',
    gradient: 'category-gradient-streetwear',
    glowColor: 'pink' as const,
    icon: '✨',
    accent: '#ec4899',
  },
  {
    name: 'Accessories',
    count: '31 Items',
    gradient: 'category-gradient-accessories',
    glowColor: 'blue' as const,
    icon: '💎',
    accent: '#2d1b69',
  },
  {
    name: 'Limited Edition',
    count: '8 Items',
    gradient: 'category-gradient-limited',
    glowColor: 'pink' as const,
    icon: '🔥',
    accent: '#ff00ff',
  },
];

export default function Categories() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="categories" className="relative px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="mb-4 inline-block text-xs font-light uppercase tracking-[0.5em] text-[#00d4ff]"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Browse
          </motion.span>
          <h2 className="text-3xl font-bold uppercase tracking-[0.1em] md:text-5xl">
            <span
              style={{
                background: 'linear-gradient(180deg, #f0f0ff 0%, rgba(240,240,255,0.6) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Categories
            </span>
          </h2>
          <motion.div
            className="mx-auto mt-4 h-[2px] w-24"
            style={{
              background: 'linear-gradient(90deg, #00d4ff, #ff00ff)',
            }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </motion.div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
            >
              <CategoryCard category={category} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ category, index }: { category: typeof categories[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    cardRef.current.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${-y}deg)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)';
    }
    setIsHovered(false);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`group relative cursor-pointer overflow-hidden rounded-xl border border-white/10 ${category.gradient} transition-all duration-500`}
      style={{
        transformStyle: 'preserve-3d',
        minHeight: '200px',
        boxShadow: isHovered
          ? `0 0 30px ${category.accent}33, 0 0 60px ${category.accent}11`
          : 'none',
      }}
    >
      {/* Geometric decoration */}
      <div className="absolute right-[-20px] top-[-20px] text-6xl opacity-10 transition-all duration-500 group-hover:scale-150 group-hover:opacity-20 group-hover:rotate-12">
        {category.icon}
      </div>

      {/* Content */}
      <div className="relative flex h-full flex-col justify-end p-5 md:p-6" style={{ minHeight: '200px' }}>
        <div
          className="mb-1 text-2xl md:text-3xl"
          style={{
            transform: 'translateZ(30px)',
            transition: 'transform 0.3s ease',
          }}
        >
          <motion.div
            className="h-[2px] w-8 mb-3 transition-all duration-300 group-hover:w-12"
            style={{ background: category.accent }}
          />
          <h3 className="text-base font-medium uppercase tracking-[0.15em] md:text-lg">
            {category.name}
          </h3>
          <p className="mt-1 text-xs text-[rgba(240,240,255,0.4)]">
            {category.count}
          </p>
        </div>

        {/* Hover arrow */}
        <motion.div
          className="absolute right-4 top-4"
          initial={false}
          animate={{ x: isHovered ? 0 : -10, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: category.accent }}>
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </div>

      {/* Border glow overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          boxShadow: `inset 0 0 30px ${category.accent}15`,
        }}
      />
    </div>
  );
}
