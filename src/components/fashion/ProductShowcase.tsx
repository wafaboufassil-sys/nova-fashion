'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const showcaseItems = [
  {
    id: 1,
    name: 'Eclipse Runner Pro',
    price: 449,
    gradient: 'linear-gradient(135deg, #000010 0%, #00d4ff 40%, #1a0030 80%, #000 100%)',
    description: 'Zero-gravity cushioning with reactive nano-fiber sole.',
    tech: ['Nano-Fiber Sole', 'Adaptive Fit', 'Zero-G Cushion'],
  },
  {
    id: 2,
    name: 'Quantum Drift Jacket',
    price: 529,
    gradient: 'linear-gradient(135deg, #0a0014 0%, #2d1b69 30%, #ff00ff 70%, #000 100%)',
    description: 'Thermo-reactive smart fabric with integrated LED accents.',
    tech: ['Smart Fabric', 'LED Accents', 'Weather Seal'],
  },
  {
    id: 3,
    name: 'Void Walker Hoodie',
    price: 319,
    gradient: 'linear-gradient(135deg, #001020 0%, #0ea5e9 50%, #ec4899 100%)',
    description: 'Weightless merino-tech blend with geometric print.',
    tech: ['Merino-Tech', '3D Print', 'Anti-Microbial'],
  },
  {
    id: 4,
    name: 'Prism Cargo Pants',
    price: 389,
    gradient: 'linear-gradient(135deg, #1a0030 0%, #00d4ff 30%, #0ea5e9 70%, #000 100%)',
    description: 'Modular cargo system with magnetic closures.',
    tech: ['Magnetic Closures', 'Modular Pockets', 'Stretch Weave'],
  },
  {
    id: 5,
    name: 'Nova Crossbody Bag',
    price: 279,
    gradient: 'linear-gradient(135deg, #000 0%, #ff00ff 40%, #2d1b69 80%, #000 100%)',
    description: 'Holographic material with wireless charging pocket.',
    tech: ['Holo-Material', 'Wireless Charge', 'RFID Block'],
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
              initial={{ opacity: 0, x: 60 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
            >
              <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[rgba(255,255,255,0.02)] transition-all duration-500 hover:border-white/10">
                {/* Image area */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                    style={{ background: item.gradient }}
                  >
                    {/* Pattern */}
                    <div className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(255,255,255,0.03) 30px, rgba(255,255,255,0.03) 31px), repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(255,255,255,0.03) 30px, rgba(255,255,255,0.03) 31px)',
                      }}
                    />
                  </div>

                  {/* Price tag */}
                  <div className="absolute bottom-4 right-4 rounded-full bg-black/60 px-4 py-2 backdrop-blur-sm">
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
