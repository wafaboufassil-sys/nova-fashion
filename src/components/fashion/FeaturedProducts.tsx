'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ShoppingBag, Heart } from 'lucide-react';
import type { CartItem } from './Navbar';
import GlowButton from './GlowButton';

const products = [
  {
    id: 1,
    name: 'Phantom Runner X1',
    price: 349,
    category: 'Sneakers',
    gradient: 'linear-gradient(135deg, #001020 0%, #00d4ff 60%, #2d1b69 100%)',
    tag: 'NEW',
    sizes: ['US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
  },
  {
    id: 2,
    name: 'Shadow Tech Hoodie',
    price: 289,
    category: 'Hoodies',
    gradient: 'linear-gradient(135deg, #0a0020 0%, #ff00ff 50%, #1a0030 100%)',
    tag: 'BESTSELLER',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 3,
    name: 'Neon Flux Jacket',
    price: 459,
    category: 'Jackets',
    gradient: 'linear-gradient(135deg, #000020 0%, #0ea5e9 40%, #ff00ff 100%)',
    tag: 'TRENDING',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 4,
    name: 'Void Series Drop 01',
    price: 599,
    category: 'Limited Edition',
    gradient: 'linear-gradient(135deg, #1a0030 0%, #ff00ff 30%, #00d4ff 70%, #000 100%)',
    tag: 'LIMITED',
    sizes: ['S', 'M', 'L'],
  },
];

interface FeaturedProductsProps {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

export default function FeaturedProducts({ cartItems, setCartItems }: FeaturedProductsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const addToCart = (product: typeof products[0]) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.gradient,
        size: product.sizes[2] || product.sizes[0],
        quantity: 1,
      }];
    });
  };

  return (
    <section id="featured" className="relative px-4 py-24 md:px-8 md:py-32">
      {/* Background accent */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-0 top-1/2 h-[600px] w-[600px] -translate-y-1/2 -translate-x-1/2 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #ff00ff, transparent)' }}
        />
        <div
          className="absolute right-0 top-1/2 h-[600px] w-[600px] -translate-y-1/2 translate-x-1/2 rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #00d4ff, transparent)' }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="mb-16 flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="mb-4 text-xs font-light uppercase tracking-[0.5em] text-[#ff00ff]">
            Curated
          </span>
          <h2 className="text-3xl font-bold uppercase tracking-[0.1em] md:text-5xl">
            <span
              style={{
                background: 'linear-gradient(180deg, #f0f0ff 0%, rgba(240,240,255,0.6) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Featured Products
            </span>
          </h2>
          <motion.div
            className="mt-4 h-[2px] w-24"
            style={{ background: 'linear-gradient(90deg, #ff00ff, #00d4ff)' }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}
            >
              <ProductCard product={product} onAddToCart={() => addToCart(product)} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  product,
  onAddToCart,
}: {
  product: typeof products[0];
  onAddToCart: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const tagColors: Record<string, string> = {
    NEW: 'bg-[#00d4ff] text-black',
    BESTSELLER: 'bg-[#ff00ff] text-white',
    TRENDING: 'bg-[#ec4899] text-white',
    LIMITED: 'bg-gradient-to-r from-[#00d4ff] to-[#ff00ff] text-black',
  };

  return (
    <motion.div
      className="group relative"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        y: { duration: 4 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      <div className="relative overflow-hidden rounded-xl border border-white/5 bg-[rgba(255,255,255,0.03)] transition-all duration-500"
        style={{
          boxShadow: isHovered
            ? '0 0 30px rgba(0, 212, 255, 0.15), 0 0 60px rgba(255, 0, 255, 0.05)'
            : 'none',
        }}
      >
        {/* Image area */}
        <div className="relative aspect-square overflow-hidden">
          <div
            className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
            style={{ background: product.gradient }}
          >
            {/* Geometric pattern overlay */}
            <div className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.05) 20px, rgba(255,255,255,0.05) 40px)',
              }}
            />
          </div>

          {/* Tag */}
          <div className="absolute left-3 top-3 z-10">
            <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${tagColors[product.tag]}`}>
              {product.tag}
            </span>
          </div>

          {/* Like button */}
          <motion.button
            className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm transition-colors"
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
          >
            <Heart
              size={14}
              className={isLiked ? 'fill-[#ff00ff] text-[#ff00ff]' : 'text-[rgba(240,240,255,0.6)]'}
            />
          </motion.button>

          {/* Quick add overlay */}
          <motion.div
            className="absolute inset-x-0 bottom-0 z-10 flex justify-center p-4"
            initial={false}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              onClick={onAddToCart}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[rgba(0,0,0,0.8)] py-2.5 text-xs font-medium uppercase tracking-[0.15em] text-white backdrop-blur-md transition-colors hover:bg-[#00d4ff] hover:text-black"
              whileTap={{ scale: 0.97 }}
            >
              <ShoppingBag size={14} />
              Add to Cart
            </motion.button>
          </motion.div>
        </div>

        {/* Product info */}
        <div className="p-4">
          <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-[rgba(240,240,255,0.4)]">
            {product.category}
          </p>
          <h3 className="text-sm font-medium tracking-wide">{product.name}</h3>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-base font-bold gradient-text">${product.price}</span>
            <div className="flex gap-1">
              {product.sizes.slice(0, 3).map(size => (
                <span key={size} className="text-[10px] text-[rgba(240,240,255,0.3)]">{size}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
