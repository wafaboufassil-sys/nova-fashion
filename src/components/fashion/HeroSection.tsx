'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import GlowButton from './GlowButton';
import ParticleField from './ParticleField';
import Image from 'next/image';

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    });
  }, []);

  const headline = 'THE FUTURE OF FASHION';
  const letters = headline.split('');

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-black" />
        <div
          className="absolute inset-0 animate-gradient-shift"
          style={{
            background: 'radial-gradient(ellipse at 30% 50%, rgba(0, 212, 255, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, rgba(255, 0, 255, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 50% 100%, rgba(26, 0, 48, 0.5) 0%, transparent 50%)',
            backgroundSize: '200% 200%',
          }}
        />
        {/* Geometric grid lines */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,212,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </motion.div>

      {/* Volumetric light rays */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(0,212,255,0.03) 10deg, transparent 20deg, transparent 40deg, rgba(255,0,255,0.02) 50deg, transparent 60deg, transparent 90deg, rgba(0,212,255,0.03) 100deg, transparent 110deg, transparent 130deg, rgba(255,0,255,0.02) 140deg, transparent 150deg, transparent 180deg, rgba(0,212,255,0.02) 190deg, transparent 200deg, transparent 220deg, rgba(255,0,255,0.03) 230deg, transparent 240deg, transparent 270deg, rgba(0,212,255,0.02) 280deg, transparent 290deg, transparent 320deg, rgba(255,0,255,0.02) 330deg, transparent 340deg, transparent 360deg)',
          animation: 'volumetric-light 15s linear infinite',
        }}
      />

      {/* 3D Rotating wireframe cube decoration */}
      <div className="pointer-events-none absolute left-[8%] top-[15%] z-[2] hidden lg:block">
        <div className="relative h-24 w-24" style={{ perspective: '600px' }}>
          <div
            className="absolute inset-0 preserve-3d"
            style={{ animation: 'orbit-3d 12s linear infinite' }}
          >
            <div className="absolute inset-0 border border-[rgba(0,212,255,0.15)] rounded-lg" style={{ transform: 'translateZ(48px)' }} />
            <div className="absolute inset-0 border border-[rgba(0,212,255,0.1)] rounded-lg" style={{ transform: 'translateZ(-48px)' }} />
            <div className="absolute inset-0 border border-[rgba(255,0,255,0.1)] rounded-lg" style={{ transform: 'rotateY(90deg) translateZ(48px)' }} />
            <div className="absolute inset-0 border border-[rgba(255,0,255,0.08)] rounded-lg" style={{ transform: 'rotateY(-90deg) translateZ(48px)' }} />
            <div className="absolute inset-0 border border-[rgba(0,212,255,0.08)] rounded-lg" style={{ transform: 'rotateX(90deg) translateZ(48px)' }} />
            <div className="absolute inset-0 border border-[rgba(0,212,255,0.06)] rounded-lg" style={{ transform: 'rotateX(-90deg) translateZ(48px)' }} />
          </div>
        </div>
      </div>

      {/* 3D Orbital ring around heading area */}
      <div className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center">
        <div
          className="h-[500px] w-[700px] md:h-[600px] md:w-[900px] orbital-ring opacity-30"
          style={{
            animationDuration: '15s',
          }}
        />
      </div>

      {/* Particles */}
      <ParticleField count={30} className="opacity-40" />

      {/* Floating fashion image - RIGHT - with 3D perspective and mouse parallax */}
      <motion.div
        className="absolute right-[-10%] top-[10%] hidden xl:block"
        style={{
          y: textY,
          transform: `translate3d(${mousePos.x * -30}px, 0, 0)`,
          perspective: '1000px',
        }}
      >
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="preserve-3d"
          style={{
            transform: `rotateY(-5deg) rotateX(2deg)`,
          }}
        >
          <div className="relative h-[500px] w-[400px] overflow-hidden rounded-2xl shadow-2xl">
            <Image
              src="/hero-fashion-1.png"
              alt="Fashion editorial"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>
        </motion.div>
      </motion.div>

      {/* NEW: hero-fashion-2 floating element - LEFT - with 3D depth */}
      <motion.div
        className="absolute left-[-8%] top-[20%] hidden xl:block"
        style={{
          y: textY,
          transform: `translate3d(${mousePos.x * 20}px, ${mousePos.y * 15}px, 0)`,
          perspective: '1000px',
        }}
      >
        <motion.div
          animate={{ y: [-8, 12, -8] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="preserve-3d"
          style={{
            transform: 'rotateY(8deg) rotateX(-3deg)',
          }}
        >
          <div className="relative h-[350px] w-[500px] overflow-hidden rounded-2xl shadow-2xl opacity-40">
            <Image
              src="/hero-fashion-2.png"
              alt="Fashion editorial detail"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-l from-black via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>
        </motion.div>
      </motion.div>

      {/* Sneaker floating image with mouse parallax */}
      <motion.div
        className="absolute bottom-[10%] left-[-5%] hidden lg:block"
        style={{
          y: textY,
          transform: `translate3d(${mousePos.x * 15}px, ${mousePos.y * 10}px, 0)`,
        }}
      >
        <motion.div
          animate={{ y: [-15, 15, -15], rotate: [-5, 5, -5] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="relative h-[250px] w-[250px]" style={{ perspective: '800px' }}>
            <div className="preserve-3d" style={{ transform: 'rotateY(5deg) rotateX(5deg)' }}>
              <Image
                src="/sneaker-hero.png"
                alt="Premium sneaker"
                fill
                className="object-contain drop-shadow-[0_0_30px_rgba(0,212,255,0.3)]"
                priority
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* NEW: Jacket floating image - bottom right */}
      <motion.div
        className="absolute bottom-[5%] right-[-3%] hidden lg:block"
        style={{
          y: textY,
          transform: `translate3d(${mousePos.x * -20}px, ${mousePos.y * 12}px, 0)`,
        }}
      >
        <motion.div
          animate={{ y: [5, -10, 5] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="relative h-[200px] w-[200px] opacity-20" style={{ perspective: '800px' }}>
            <div className="preserve-3d" style={{ transform: 'rotateY(-8deg) rotateX(3deg)' }}>
              <Image
                src="/jacket-product.png"
                alt="Luxury tech jacket"
                fill
                className="object-contain drop-shadow-[0_0_25px_rgba(255,0,255,0.2)]"
                priority
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Main content */}
      <motion.div
        className="relative z-10 flex flex-col items-center px-4 text-center"
        style={{ y: textY, opacity }}
      >
        {/* Pre-headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.3, duration: 0.8 }}
          className="mb-6 flex items-center gap-3"
        >
          <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#00d4ff]" />
          <span className="text-xs font-light uppercase tracking-[0.5em] text-[rgba(240,240,255,0.5)]">
            SS 2030
          </span>
          <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#ff00ff]" />
        </motion.div>

        {/* Main headline with staggered letters */}
        <h1 className="mb-6 text-4xl font-bold uppercase leading-tight tracking-[0.05em] sm:text-5xl md:text-7xl lg:text-8xl">
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 3.5 + i * 0.04,
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="inline-block"
              style={
                letter === ' '
                  ? { width: '0.3em' }
                  : {
                      background: 'linear-gradient(180deg, #f0f0ff 0%, rgba(240,240,255,0.6) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }
              }
            >
              {letter}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.2, duration: 0.8 }}
          className="mb-10 max-w-lg text-sm font-light leading-relaxed text-[rgba(240,240,255,0.6)] md:text-base"
        >
          Where AI meets luxury streetwear. Experience the convergence of technology
          and high fashion in every thread.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4.5, duration: 0.8 }}
          className="flex flex-col items-center gap-4 sm:flex-row"
        >
          <GlowButton variant="gradient" size="lg">
            Explore Collection
          </GlowButton>
          <GlowButton variant="blue" size="lg" className="!bg-transparent !text-[#f0f0ff] !shadow-none border border-[rgba(0,212,255,0.3)]">
            Shop Now
          </GlowButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5, duration: 1 }}
          className="mt-20 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-[rgba(240,240,255,0.3)]">
            Scroll
          </span>
          <motion.div
            className="h-8 w-[1px] bg-gradient-to-b from-[#00d4ff] to-transparent"
            animate={{ scaleY: [1, 0.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
