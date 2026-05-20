'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const showcaseItems = [
  {
    id: 1,
    name: 'Eclipse Runner Pro',
    price: 449,
    image: '/showcase-eclipse-runner.png',
    description: 'Zero-gravity cushioning with reactive nano-fiber sole.',
    tech: ['Nano-Fiber Sole', 'Adaptive Fit', 'Zero-G Cushion'],
    accent: '#00d4ff',
  },
  {
    id: 2,
    name: 'Quantum Drift Jacket',
    price: 529,
    image: '/showcase-quantum-jacket.png',
    description: 'Thermo-reactive smart fabric with integrated LED accents.',
    tech: ['Smart Fabric', 'LED Accents', 'Weather Seal'],
    accent: '#ff00ff',
  },
  {
    id: 3,
    name: 'Void Walker Hoodie',
    price: 319,
    image: '/showcase-void-walker.png',
    description: 'Weightless merino-tech blend with geometric print.',
    tech: ['Merino-Tech', '3D Print', 'Anti-Microbial'],
    accent: '#0ea5e9',
  },
  {
    id: 4,
    name: 'Prism Cargo Pants',
    price: 389,
    image: '/showcase-prism-cargo.png',
    description: 'Modular cargo system with magnetic closures.',
    tech: ['Magnetic Closures', 'Modular Pockets', 'Stretch Weave'],
    accent: '#ec4899',
  },
  {
    id: 5,
    name: 'Nova Crossbody Bag',
    price: 279,
    image: '/showcase-nova-bag.png',
    description: 'Holographic material with wireless charging pocket.',
    tech: ['Holo-Material', 'Wireless Charge', 'RFID Block'],
    accent: '#ff00ff',
  },
];

export default function ProductShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 400;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
    setTimeout(checkScroll, 400);
  };

  return (
    <section className="relative py-24 md:py-32">
      <div ref={ref}>
        {/* Header */}
        <motion.div
          className="mx-auto mb-12 max-w-7xl px-4 md:mb-16 md:px-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-end justify-between">
            <div>
              <span className="mb-4 inline-block text-xs font-light uppercase tracking-[0.5em] text-[#00d4ff]">
                Showcase
              </span>
              <h2 className="text-3xl font-bold uppercase tracking-[0.1em] md:text-5xl">
                <span
                  style={{
                    background: 'linear-gradient(180deg, #f0f0ff 0%, rgba(240,240,255,0.6) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Deep Dive
                </span>
              </h2>
            </div>

            {/* Scroll controls */}
            <div className="hidden items-center gap-2 sm:flex">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => scroll('left')}
                className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all ${
                  canScrollLeft
                    ? 'border-[rgba(0,212,255,0.3)] text-[#00d4ff] hover:bg-[rgba(0,212,255,0.1)]'
                    : 'border-white/5 text-[rgba(240,240,255,0.2)]'
                }`}
              >
                <ChevronLeft size={18} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => scroll('right')}
                className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all ${
                  canScrollRight
                    ? 'border-[rgba(0,212,255,0.3)] text-[#00d4ff] hover:bg-[rgba(0,212,255,0.1)]'
                    : 'border-white/5 text-[rgba(240,240,255,0.2)]'
                }`}
              >
                <ChevronRight size={18} />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Horizontal scroll */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4 md:gap-8 md:px-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {showcaseItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="min-w-[300px] flex-shrink-0 snap-center sm:min-w-[350px] md:min-w-[400px]"
              initial={{ opacity: 0, x: 60, rotateY: 8 }}
              animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.8, ease: 'easeOut' }}
            >
              <ShowcaseCard item={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ShowcaseCard({ item }: { item: typeof showcaseItems[0] }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const itemInView = useInView(cardRef, { once: true, margin: '-50px' });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    cardRef.current.style.transform = `perspective(1200px) rotateY(${x}deg) rotateX(${-y}deg) translateZ(10px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg) translateZ(0px)';
    }
    setIsHovered(false);
  }, []);

  return (
    <div className="perspective-1200" style={{ perspective: '1200px' }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[rgba(255,255,255,0.02)] transition-all duration-500 preserve-3d"
        style={{
          boxShadow: isHovered
            ? `0 0 30px ${item.accent}15, 0 0 60px ${item.accent}08, 0 30px 60px rgba(0,0,0,0.4)`
            : '0 4px 16px rgba(0,0,0,0.2)',
          willChange: 'transform',
        }}
      >
        {/* 3D Reveal animation on scroll into view */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={itemInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Image area */}
          <div className="relative aspect-[16/9] overflow-hidden">
            <motion.div
              className="absolute inset-0 transition-transform duration-700"
              animate={{
                scale: isHovered ? 1.05 : 1,
              }}
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 85vw, (max-width: 768px) 350px, 400px"
              />
            </motion.div>

            {/* Holographic shimmer overlay */}
            <div className="pointer-events-none absolute inset-0 z-[5] opacity-0 transition-opacity duration-500 group-hover:opacity-100 holographic-shimmer" />

            {/* Depth shadow layer */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500"
              style={{ opacity: isHovered ? 0.7 : 0.9 }}
            />

            {/* Price tag */}
            <div className="absolute bottom-4 right-4 z-10 rounded-full bg-black/60 px-4 py-2 backdrop-blur-sm">
              <span className="text-lg font-bold gradient-text">${item.price}</span>
            </div>
          </div>

          {/* Info */}
          <div className="p-5 md:p-6">
            <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-[rgba(240,240,255,0.4)]">
              NØVA TECHWEAR
            </p>
            <h3 className="mb-2 text-lg font-semibold tracking-wide">{item.name}</h3>
            <p className="mb-4 text-xs leading-relaxed text-[rgba(240,240,255,0.5)]">
              {item.description}
            </p>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2">
              {item.tech.map(tag => (
                <span
                  key={tag}
                  className="rounded-full border border-white/5 bg-[rgba(255,255,255,0.03)] px-3 py-1 text-[10px] uppercase tracking-wider text-[rgba(240,240,255,0.5)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Light streak effect */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl light-streak" />
      </motion.div>
    </div>
  );
}
