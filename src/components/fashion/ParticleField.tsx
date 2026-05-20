'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseSize: number;
  duration: number;
  delay: number;
  drift: number;
  opacity: number;
}

interface MousePos {
  x: number;
  y: number;
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
  const mouseRef = useRef<MousePos>({ x: -1000, y: -1000 });

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

    // Mouse tracking for particle repulsion
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Initialize particles with varying sizes
    particlesRef.current = Array.from({ length: count }, (_, i) => {
      const sizeCategory = Math.random();
      let baseSize: number;
      let opacity: number;
      if (sizeCategory < 0.6) {
        // Small particles (60%)
        baseSize = Math.random() * 1.2 + 0.3;
        opacity = Math.random() * 0.3 + 0.2;
      } else if (sizeCategory < 0.9) {
        // Medium particles (30%)
        baseSize = Math.random() * 1.5 + 1.2;
        opacity = Math.random() * 0.3 + 0.3;
      } else {
        // Large particles (10%)
        baseSize = Math.random() * 1.5 + 2.5;
        opacity = Math.random() * 0.2 + 0.4;
      }

      return {
        id: i,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: baseSize,
        baseSize,
        duration: Math.random() * 15000 + 10000,
        delay: Math.random() * 5000,
        drift: (Math.random() - 0.5) * 0.5,
        opacity,
      };
    });

    const startTime = Date.now();
    const connectionDistance = 120;
    const mouseRepelDistance = 150;
    const mouseRepelForce = 0.8;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const elapsed = Date.now() - startTime;
      const mouse = mouseRef.current;

      // Update and draw particles
      particlesRef.current.forEach((p) => {
        // Mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseRepelDistance && dist > 0) {
          const force = (mouseRepelDistance - dist) / mouseRepelDistance * mouseRepelForce;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // Apply velocity with damping
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;

        // Add gentle drift
        p.x += p.drift * 0.1;

        // Wrap around edges
        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;
        if (p.y < -20) p.y = canvas.height + 20;
        if (p.y > canvas.height + 20) p.y = -20;

        // Floating animation
        const progress = ((elapsed + p.delay) % p.duration) / p.duration;
        const floatY = Math.sin(progress * Math.PI * 2) * 2;
        const drawX = p.x;
        const drawY = p.y + floatY;

        // Draw particle
        ctx.beginPath();
        ctx.arc(drawX, drawY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = color + Math.floor(p.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();

        // Glow effect for larger particles
        if (p.baseSize > 1.5) {
          ctx.beginPath();
          ctx.arc(drawX, drawY, p.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = color + Math.floor(p.opacity * 30).toString(16).padStart(2, '0');
          ctx.fill();
        }
      });

      // Draw connecting lines (constellation effect)
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particlesRef.current.length; i++) {
        const a = particlesRef.current[i];
        const progressA = ((elapsed + a.delay) % a.duration) / a.duration;
        const floatYA = Math.sin(progressA * Math.PI * 2) * 2;
        const ax = a.x;
        const ay = a.y + floatYA;

        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const b = particlesRef.current[j];
          const progressB = ((elapsed + b.delay) % b.duration) / b.duration;
          const floatYB = Math.sin(progressB * Math.PI * 2) * 2;
          const bx = b.x;
          const by = b.y + floatYB;

          const ddx = ax - bx;
          const ddy = ay - by;
          const distance = Math.sqrt(ddx * ddx + ddy * ddy);

          if (distance < connectionDistance) {
            const alpha = (1 - distance / connectionDistance) * 0.15;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.strokeStyle = color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
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
