'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useCallback } from 'react';
import Image from 'next/image';

const categories = [
  {
    name: 'Sneakers',
    count: '48 Items',
    glowColor: 'blue' as const,
    icon: '👟',
    accent: '#00d4ff',
    image: '/category-sneakers.png',
  },
  {
    name: 'Hoodies',
    count: '36 Items',
    glowColor: 'pink' as const,
    icon: '🧥',
    accent: '#ff00ff',
    image: '/category-hoodies.png',
  },
  {
    name: 'Jackets',
    count: '24 Items',
    glowColor: 'blue' as const,
    icon: '🧤',
    accent: '#0ea5e9',
    image: '/category-jackets.png',
  },
  {
    name: 'Streetwear',
    count: '62 Items',
    glowColor: 'pink' as const,
    icon: '✨',
    accent: '#ec4899',
    image: '/category-streetwear.png',
  },
  {
    name: 'Accessories',
    count: '31 Items',
    glowColor: 'blue' as const,
    icon: '💎',
    accent: '#2d1b69',
    image: '/category-accessories.png',
  },
  {
    name: 'Limited Edition',
    count: '8 Items',
    glowColor: 'pink' as const,
    icon: '🔥',
    accent: '#ff00ff',
    image: '/category-limited.png',
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
  const shimmerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 30;
    cardRef.current.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) translateZ(20px)`;

    // Move shimmer overlay to follow mouse
    if (shimmerRef.current) {
      const percentX = ((e.clientX - rect.left) / rect.width) * 100;
      const percentY = ((e.clientY - rect.top) / rect.height) * 100;
      shimmerRef.current.style.background = `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(255,255,255,0.15) 0%, transparent 60%)`;
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)';
    }
    setIsHovered(false);
  }, []);

  return (
    <div className="perspective-1000">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="group relative cursor-pointer overflow-hidden rounded-xl border border-white/10 transition-all duration-500 preserve-3d"
        style={{
          minHeight: '220px',
          boxShadow: isHovered
            ? `0 0 30px ${category.accent}33, 0 0 60px ${category.accent}11, 0 20px 40px rgba(0,0,0,0.4)`
            : '0 4px 12px rgba(0,0,0,0.2)',
          willChange: 'transform',
        }}
      >
        {/* Background Image Layer */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={category.image}
            alt={`${category.name} category`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
        </div>

        {/* Shimmer overlay following mouse */}
        <div
          ref={shimmerRef}
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />

        {/* Holographic shimmer */}
        <div className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 holographic-shimmer" />

        {/* Content - with depth translateZ */}
        <div
          className="relative flex h-full flex-col justify-end p-5 md:p-6 preserve-3d"
          style={{
            minHeight: '220px',
          }}
        >
          <div
            className="mb-1"
            style={{
              transform: 'translateZ(40px)',
              transition: 'transform 0.4s ease',
            }}
          >
            <motion.div
              className="mb-3 h-[2px] w-8 transition-all duration-300 group-hover:w-12"
              style={{ background: category.accent }}
            />
            <h3 className="text-base font-medium uppercase tracking-[0.15em] md:text-lg text-white drop-shadow-lg">
              {category.name}
            </h3>
            <p className="mt-1 text-xs text-[rgba(240,240,255,0.5)]">
              {category.count}
            </p>
          </div>

          {/* Hover arrow - depth layer */}
          <motion.div
            className="absolute right-4 top-4"
            style={{ transform: 'translateZ(50px)' }}
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
          className="pointer-events-none absolute inset-0 z-20 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            boxShadow: `inset 0 0 30px ${category.accent}15`,
          }}
        />
      </div>
    </div>
  );
}
