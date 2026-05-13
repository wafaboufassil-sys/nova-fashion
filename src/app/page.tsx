'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingScreen from '@/components/fashion/LoadingScreen';
import Navbar from '@/components/fashion/Navbar';
import type { CartItem } from '@/components/fashion/Navbar';
import HeroSection from '@/components/fashion/HeroSection';
import Marquee from '@/components/fashion/Marquee';
import Categories from '@/components/fashion/Categories';
import FeaturedProducts from '@/components/fashion/FeaturedProducts';
import EditorialBanner from '@/components/fashion/EditorialBanner';
import ProductShowcase from '@/components/fashion/ProductShowcase';
import Newsletter from '@/components/fashion/Newsletter';
import Footer from '@/components/fashion/Footer';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <main className="min-h-screen bg-black">
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex min-h-screen flex-col"
          >
            <Navbar cartItems={cartItems} setCartItems={setCartItems} />
            <HeroSection />
            <Marquee />
            <Categories />
            <FeaturedProducts cartItems={cartItems} setCartItems={setCartItems} />
            <EditorialBanner />
            <ProductShowcase />
            <Newsletter />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
