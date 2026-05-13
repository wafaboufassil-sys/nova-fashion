'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send } from 'lucide-react';
import ParticleField from './ParticleField';

export default function Newsletter() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section id="newsletter" ref={ref} className="relative overflow-hidden py-24 md:py-32">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#0a0014]" />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(0, 212, 255, 0.05) 0%, transparent 60%), radial-gradient(ellipse at 30% 70%, rgba(255, 0, 255, 0.05) 0%, transparent 50%)',
          }}
        />
      </div>

      {/* Particles */}
      <ParticleField count={20} color="#ff00ff" className="opacity-20" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-2xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="mb-6 inline-block text-xs font-light uppercase tracking-[0.5em] text-[#00d4ff]"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Be First
          </motion.span>

          <h2 className="mb-4 text-3xl font-bold uppercase tracking-[0.1em] md:text-5xl lg:text-6xl">
            <span
              style={{
                background: 'linear-gradient(135deg, #f0f0ff 0%, #00d4ff 50%, #ff00ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Join The Future
            </span>
          </h2>

          <p className="mb-10 text-sm font-light leading-relaxed text-[rgba(240,240,255,0.5)]">
            Get exclusive access to limited drops, early releases, and member-only collections.
            Be the first to know what&apos;s next.
          </p>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <div className="relative w-full max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-lg border border-white/10 bg-[rgba(255,255,255,0.05)] px-5 py-3.5 text-sm text-[#f0f0ff] placeholder-[rgba(240,240,255,0.3)] outline-none backdrop-blur-sm transition-all duration-300 focus:border-[#00d4ff]/50 focus:shadow-[0_0_20px_rgba(0,212,255,0.15)]"
              />
              {/* Animated border glow on focus */}
              <div className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 has-[:focus]:opacity-100"
                style={{
                  boxShadow: '0 0 15px rgba(0, 212, 255, 0.2), inset 0 0 15px rgba(0, 212, 255, 0.05)',
                }}
              />
            </div>

            <motion.button
              type="submit"
              className="flex items-center gap-2 rounded-lg px-8 py-3.5 text-sm font-medium uppercase tracking-[0.15em] text-black transition-all"
              style={{
                background: 'linear-gradient(135deg, #00d4ff, #ff00ff)',
                boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)',
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 30px rgba(0, 212, 255, 0.5), 0 0 60px rgba(255, 0, 255, 0.2)',
              }}
              whileTap={{ scale: 0.97 }}
            >
              <Send size={14} />
              Subscribe
            </motion.button>
          </form>

          {/* Success message */}
          <motion.div
            initial={false}
            animate={{ opacity: isSubmitted ? 1 : 0, y: isSubmitted ? 0 : 10 }}
            className="mt-4"
          >
            <span className="text-sm text-[#00d4ff]">
              ✓ Welcome to the future. Check your inbox.
            </span>
          </motion.div>

          {/* Privacy note */}
          <p className="mt-6 text-[10px] uppercase tracking-wider text-[rgba(240,240,255,0.2)]">
            By subscribing, you agree to our Terms & Privacy Policy
          </p>
        </motion.div>
      </div>
    </section>
  );
}
