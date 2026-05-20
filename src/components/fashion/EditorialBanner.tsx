'use client';

import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export default function EditorialBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.2]);
  const textY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const imageY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <section ref={ref} className="relative flex min-h-[70vh] items-center justify-center overflow-hidden py-24">
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0"
        style={{ scale }}
      >
        {/* Editorial Image with 3D parallax */}
        <motion.div className="absolute inset-0" style={{ y: imageY }}>
          <Image
            src="/editorial-ss2030.png"
            alt="SS 2030 Collection editorial"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>

        {/* Multi-layer gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70" />
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(0,212,255,0.08) 0%, transparent 50%, rgba(255,0,255,0.08) 100%)',
          }}
        />

        {/* Geometric shapes */}
        <motion.div
          className="absolute left-[10%] top-[20%] h-32 w-32 rounded-full border border-[#00d4ff]/10"
          style={{ y }}
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute right-[15%] top-[30%] h-48 w-48"
          style={{ y }}
        >
          <div className="h-full w-full rounded-full border border-[#ff00ff]/5" />
          <div className="absolute inset-8 rounded-full border border-[#ff00ff]/10" />
        </motion.div>
        <motion.div
          className="absolute bottom-[20%] left-[30%] h-20 w-20 rotate-45 border border-[#0ea5e9]/10"
          style={{ y }}
          animate={{ rotate: [45, 405] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute right-[25%] bottom-[30%] h-16 w-16 rotate-12 border border-[#00d4ff]/5"
          style={{ y }}
          animate={{ rotate: [12, 372] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>

      {/* Animated light streaks */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-[3]">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute h-[1px] opacity-0"
            style={{
              width: '200px',
              background: `linear-gradient(90deg, transparent, ${i === 1 ? '#ff00ff' : '#00d4ff'}, transparent)`,
              top: `${25 + i * 25}%`,
              left: 0,
              animationDelay: `${i * 2}s`,
              animationDuration: `${5 + i}s`,
            }}
            animate={{
              x: ['-200px', '110vw'],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: i * 2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden z-[2]">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full"
            style={{
              background: i % 2 === 0 ? '#00d4ff' : '#ff00ff',
              left: `${15 + i * 10}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Content - 3D text floating above image */}
      <motion.div
        className="relative z-10 px-4 text-center"
        style={{
          y: textY,
          perspective: '1000px',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="preserve-3d"
        >
          <motion.span
            className="mb-6 inline-block text-xs font-light uppercase tracking-[0.5em] text-[#00d4ff]"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            style={{ transform: 'translateZ(40px)' }}
          >
            Introducing
          </motion.span>

          <motion.h2
            className="mb-6 text-5xl font-bold uppercase tracking-[0.15em] md:text-7xl lg:text-9xl"
            style={{
              background: 'linear-gradient(135deg, #f0f0ff 0%, #00d4ff 40%, #ff00ff 70%, #f0f0ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200% 200%',
              transform: 'translateZ(60px)',
              textShadow: '0 0 40px rgba(0,212,255,0.3), 0 0 80px rgba(255,0,255,0.15)',
              animation: 'gradient-shift 4s ease infinite',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            SS 2030
          </motion.h2>

          <motion.h3
            className="mb-8 text-2xl font-light uppercase tracking-[0.3em] text-[rgba(240,240,255,0.5)] md:text-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            style={{ transform: 'translateZ(35px)' }}
          >
            Collection
          </motion.h3>

          <motion.div
            className="mx-auto h-[1px] w-32 md:w-48"
            style={{
              background: 'linear-gradient(90deg, transparent, #00d4ff, #ff00ff, transparent)',
              transform: 'translateZ(30px)',
            }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.7, duration: 1 }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
