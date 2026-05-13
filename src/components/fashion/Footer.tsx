'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Instagram, Twitter, Youtube, ArrowUpRight } from 'lucide-react';

const footerLinks = {
  Shop: ['New Arrivals', 'Sneakers', 'Hoodies', 'Jackets', 'Accessories', 'Sale'],
  Company: ['About Us', 'Careers', 'Press', 'Sustainability', 'Stores'],
  Support: ['Contact', 'Shipping', 'Returns', 'Size Guide', 'FAQs'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
};

const socialLinks = [
  { icon: Instagram, label: 'Instagram' },
  { icon: Twitter, label: 'Twitter' },
  { icon: Youtube, label: 'YouTube' },
];

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <footer ref={ref} className="relative border-t border-white/5 bg-[#050008]">
      {/* Top accent line */}
      <div
        className="h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent, #00d4ff, #ff00ff, transparent)' }}
      />

      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Top section */}
          <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-6">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div
                className="mb-4 text-3xl font-bold tracking-[0.3em]"
                style={{
                  background: 'linear-gradient(135deg, #00d4ff, #ff00ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 10px rgba(0, 212, 255, 0.3))',
                }}
              >
                NØVA
              </div>
              <p className="mb-6 max-w-xs text-sm font-light leading-relaxed text-[rgba(240,240,255,0.4)]">
                Redefining the boundaries of fashion through technology, innovation, and
                uncompromising design.
              </p>

              {/* Social links */}
              <div className="flex gap-3">
                {socialLinks.map(({ icon: Icon, label }) => (
                  <motion.a
                    key={label}
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[rgba(240,240,255,0.5)] transition-all hover:border-[#00d4ff]/30 hover:text-[#00d4ff]"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={label}
                  >
                    <Icon size={16} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([title, links], index) => (
              <div key={title}>
                <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[rgba(240,240,255,0.6)]">
                  {title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {links.map(link => (
                    <li key={link}>
                      <a
                        href="#"
                        className="group flex items-center gap-1 text-sm font-light text-[rgba(240,240,255,0.35)] transition-colors hover:text-[#00d4ff]"
                      >
                        {link}
                        <ArrowUpRight
                          size={10}
                          className="opacity-0 transition-opacity group-hover:opacity-100"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div
            className="mb-8 h-[1px] opacity-20"
            style={{ background: 'linear-gradient(90deg, #00d4ff, #ff00ff)' }}
          />

          {/* Bottom */}
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-[rgba(240,240,255,0.25)]">
              © 2030 NØVA. All rights reserved. Designed with AI.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-xs text-[rgba(240,240,255,0.25)]">
                <span className="inline-block h-2 w-2 rounded-full bg-[#00d4ff] mr-2 animate-pulse" />
                All systems operational
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
