'use client';

import { useEffect, useRef, useMemo } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
}

interface ParticleFieldProps {
  count?: number;
  color?: string;
  className?: string;
}

export default function ParticleField({ count = 40, color = '#00d4ff', className = '' }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    particlesRef.current = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 15000 + 10000,
      delay: Math.random() * 5000,
      drift: (Math.random() - 0.5) * 0.5,
    }));

    const startTime = Date.now();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const elapsed = Date.now() - startTime;

      particlesRef.current.forEach((p) => {
        const progress = ((elapsed + p.delay) % p.duration) / p.duration;
        const y = canvas.height - progress * canvas.height;
        const x = p.x + Math.sin(progress * Math.PI * 2) * 50 + p.drift * progress * 200;
        const opacity = progress < 0.1
          ? progress / 0.1
          : progress > 0.9
            ? (1 - progress) / 0.1
            : 0.6;

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = color + Math.floor(opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();

        // Glow effect
        if (p.size > 1) {
          ctx.beginPath();
          ctx.arc(x, y, p.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = color + Math.floor(opacity * 40).toString(16).padStart(2, '0');
          ctx.fill();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [count, color]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-0 ${className}`}
      style={{ opacity: 0.6 }}
    />
  );
}
