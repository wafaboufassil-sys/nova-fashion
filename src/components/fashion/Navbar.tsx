'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X } from 'lucide-react';
import CartDrawer from './CartDrawer';

interface NavbarProps {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
}

export default function Navbar({ cartItems, setCartItems }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Collections', 'New Arrivals', 'About'];

  const scrollToSection = (name: string) => {
    setIsMobileMenuOpen(false);
    const sectionMap: Record<string, string> = {
      Collections: 'categories',
      'New Arrivals': 'featured',
      About: 'newsletter',
    };
    const el = document.getElementById(sectionMap[name]);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 3.2, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'glass-strong shadow-[0_0_30px_rgba(0,212,255,0.1)]'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          {/* Logo */}
          <motion.a
            href="#"
            className="relative text-2xl font-bold tracking-[0.3em] md:text-3xl"
            style={{
              background: 'linear-gradient(135deg, #00d4ff, #ff00ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 10px rgba(0, 212, 255, 0.4))',
            }}
            whileHover={{ scale: 1.05 }}
          >
            NØVA
          </motion.a>

          {/* Desktop Nav Links */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link, i) => (
              <motion.button
                key={link}
                onClick={() => scrollToSection(link)}
                className="relative text-xs font-light uppercase tracking-[0.3em] text-[rgba(240,240,255,0.7)] transition-colors hover:text-[#00d4ff]"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.4 + i * 0.1, duration: 0.5 }}
                whileHover={{ y: -2 }}
              >
                {link}
                <motion.div
                  className="absolute -bottom-1 left-0 h-[1px] w-0 bg-gradient-to-r from-[#00d4ff] to-[#ff00ff]"
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Cart Button */}
            <motion.button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[rgba(240,240,255,0.8)] transition-colors hover:text-[#00d4ff]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.6 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#ff00ff] text-[10px] font-bold text-black"
                >
                  {totalItems}
                </motion.span>
              )}
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[rgba(240,240,255,0.8)] md:hidden"
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-black/95 backdrop-blur-xl md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link}
                onClick={() => scrollToSection(link)}
                className="text-2xl font-light uppercase tracking-[0.3em] text-[rgba(240,240,255,0.8)]"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {link}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        setIsOpen={setIsCartOpen}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />
    </>
  );
}
