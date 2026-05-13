'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 800);
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Expanding rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute h-40 w-40 rounded-full border border-[#00d4ff]/30"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{
                  scale: [0.5, 4],
                  opacity: [0.8, 0],
                }}
                transition={{
                  duration: 2.5,
                  delay: i * 0.5,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
            ))}
            <motion.div
              className="absolute h-40 w-40 rounded-full border border-[#ff00ff]/20"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{
                scale: [0.5, 3.5],
                opacity: [0.6, 0],
              }}
              transition={{
                duration: 2.5,
                delay: 0.8,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />
          </div>

          {/* Logo text */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div
              className="text-7xl font-bold tracking-[0.3em] md:text-8xl"
              style={{
                background: 'linear-gradient(135deg, #00d4ff, #ff00ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: 'none',
                filter: 'drop-shadow(0 0 30px rgba(0, 212, 255, 0.5))',
              }}
              animate={{
                filter: [
                  'drop-shadow(0 0 30px rgba(0, 212, 255, 0.5))',
                  'drop-shadow(0 0 50px rgba(255, 0, 255, 0.5))',
                  'drop-shadow(0 0 30px rgba(0, 212, 255, 0.5))',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              NØVA
            </motion.div>

            <motion.div
              className="h-[1px] w-24 md:w-32"
              style={{
                background: 'linear-gradient(90deg, transparent, #00d4ff, #ff00ff, transparent)',
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />

            <motion.p
              className="text-xs font-light uppercase tracking-[0.5em] text-[rgba(240,240,255,0.5)]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              The Future of Fashion
            </motion.p>
          </motion.div>

          {/* Background gradient pulse */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at center, rgba(0, 212, 255, 0.05) 0%, transparent 70%)',
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
