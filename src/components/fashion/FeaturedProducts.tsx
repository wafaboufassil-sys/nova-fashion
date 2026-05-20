'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useCallback } from 'react';
import { ShoppingBag, Heart } from 'lucide-react';
import Image from 'next/image';
import type { CartItem } from './Navbar';

const products = [
  {
    id: 1,
    name: 'Phantom Runner X1',
    price: 349,
    category: 'Sneakers',
    image: '/product-phantom-runner.png',
    tag: 'NEW',
    sizes: ['US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    accent: '#00d4ff',
  },
  {
    id: 2,
    name: 'Shadow Tech Hoodie',
    price: 289,
    category: 'Hoodies',
    image: '/product-shadow-hoodie.png',
    tag: 'BESTSELLER',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    accent: '#ff00ff',
  },
  {
    id: 3,
    name: 'Neon Flux Jacket',
    price: 459,
    category: 'Jackets',
    image: '/product-neon-jacket.png',
    tag: 'TRENDING',
    sizes: ['S', 'M', 'L', 'XL'],
    accent: '#0ea5e9',
  },
  {
    id: 4,
    name: 'Void Series Drop 01',
    price: 599,
    category: 'Limited Edition',
    image: '/product-void-series.png',
    tag: 'LIMITED',
    sizes: ['S', 'M', 'L'],
    accent: '#ff00ff',
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
        image: product.image,
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
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
    cardRef.current.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
    }
  }, []);

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
        y: [0, -5, 0],
      }}
      transition={{
        y: { duration: 5 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative overflow-hidden rounded-xl border border-white/5 bg-[rgba(255,255,255,0.03)] transition-shadow duration-500 preserve-3d"
        style={{
          boxShadow: isHovered
            ? `0 0 30px rgba(0, 212, 255, 0.15), 0 0 60px rgba(255, 0, 255, 0.05), 0 25px 50px rgba(0,0,0,0.4)`
            : '0 4px 12px rgba(0,0,0,0.2)',
          willChange: 'transform',
        }}
      >
        {/* 3D Glow ring behind product */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div
            className="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full glow-ring transition-opacity duration-500"
            style={{
              borderColor: `${product.accent}20`,
              border: `1px solid ${product.accent}20`,
              opacity: isHovered ? 1 : 0.3,
            }}
          />
        </div>

        {/* Image area */}
        <div className="relative aspect-square overflow-hidden">
          {/* Product Image with parallax depth */}
          <motion.div
            className="absolute inset-0 transition-transform duration-700"
            animate={{
              scale: isHovered ? 1.08 : 1,
              y: isHovered ? -5 : 0,
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </motion.div>

          {/* Holographic shimmer overlay */}
          <div className="pointer-events-none absolute inset-0 z-[5] opacity-0 transition-opacity duration-500 group-hover:opacity-100 holographic-shimmer" />

          {/* 3D Tag badge with ribbon effect */}
          <div className="absolute left-3 top-3 z-10">
            <span
              className={`relative rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${tagColors[product.tag]}`}
              style={{
                transform: 'translateZ(30px)',
              }}
            >
              {product.tag}
              {/* Ribbon tail */}
              <span
                className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45"
                style={{
                  backgroundColor: product.tag === 'NEW' ? '#00d4ff' : product.tag === 'BESTSELLER' ? '#ff00ff' : product.tag === 'TRENDING' ? '#ec4899' : '#00d4ff',
                }}
              />
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

        {/* Reflective floor effect */}
        <div className="relative h-12 overflow-hidden">
          <div className="absolute inset-0 reflective-floor opacity-40" />
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
