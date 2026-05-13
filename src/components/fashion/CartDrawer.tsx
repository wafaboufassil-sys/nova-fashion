'use client';

import { motion } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import type { CartItem } from './Navbar';

interface CartDrawerProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

export default function CartDrawer({ isOpen, setIsOpen, cartItems, setCartItems }: CartDrawerProps) {
  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev =>
      prev
        .map(item =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <motion.div
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-black/95 backdrop-blur-xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <div className="flex items-center gap-2">
          <ShoppingBag size={18} className="text-[#00d4ff]" />
          <h2 className="text-sm font-medium uppercase tracking-[0.2em]">Your Cart</h2>
          <span className="text-xs text-[rgba(240,240,255,0.5)]">({cartItems.length})</span>
        </div>
        <motion.button
          onClick={() => setIsOpen(false)}
          className="p-1 text-[rgba(240,240,255,0.6)] transition-colors hover:text-white"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X size={20} />
        </motion.button>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {cartItems.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-4">
            <ShoppingBag size={48} className="text-[rgba(240,240,255,0.15)]" />
            <p className="text-sm text-[rgba(240,240,255,0.4)]">Your cart is empty</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {cartItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass flex gap-4 p-3"
              >
                <div
                  className="h-20 w-20 flex-shrink-0 rounded-lg"
                  style={{ background: item.image }}
                />
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-medium">{item.name}</h3>
                    <p className="text-xs text-[rgba(240,240,255,0.5)]">Size: {item.size}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateQuantity(item.id, -1)}
                        className="flex h-6 w-6 items-center justify-center rounded border border-white/10 text-xs"
                      >
                        <Minus size={12} />
                      </motion.button>
                      <span className="text-xs">{item.quantity}</span>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateQuantity(item.id, 1)}
                        className="flex h-6 w-6 items-center justify-center rounded border border-white/10 text-xs"
                      >
                        <Plus size={12} />
                      </motion.button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-[#00d4ff]">
                        ${item.price * item.quantity}
                      </span>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeItem(item.id)}
                        className="text-[rgba(240,240,255,0.3)] transition-colors hover:text-[#ff4444]"
                      >
                        <X size={14} />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {cartItems.length > 0 && (
        <div className="border-t border-white/10 px-6 py-4">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm uppercase tracking-wider text-[rgba(240,240,255,0.6)]">Total</span>
            <span className="text-xl font-bold gradient-text">${total}</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full rounded-lg py-3 text-sm font-medium uppercase tracking-[0.2em] text-black transition-all"
            style={{
              background: 'linear-gradient(135deg, #00d4ff, #ff00ff)',
              boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)',
            }}
          >
            Checkout
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}
