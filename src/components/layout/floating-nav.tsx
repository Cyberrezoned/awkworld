'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Shirt, Bot, Video, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/products', label: 'Collection', icon: Shirt },
  { href: '/stylist', label: 'AI Stylist', icon: Bot },
  { href: '/studio', label: 'AI Studio', icon: Video },
];

const orbVariants = {
  closed: { scale: 1, rotate: 0 },
  open: { scale: 1.1, rotate: 180 },
};

const menuVariants = {
  closed: { opacity: 0, scale: 0 },
  open: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2,
      when: 'beforeChildren',
    },
  },
};

const itemVariants = (index: number) => {
    const angle = (index / navItems.length) * 360 - 90;
    const radius = 100; // The radius of the circle
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;
  return {
    closed: { opacity: 0, x: 0, y: 0, scale: 0.5 },
    open: {
      opacity: 1,
      x,
      y,
      scale: 1,
      transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
  };
};

export default function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <TooltipProvider>
      <div className="fixed bottom-8 right-8 z-50">
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="absolute bottom-0 right-0 w-64 h-64 flex items-center justify-center"
            >
              {navItems.map((item, i) => (
                <motion.div key={item.href} custom={i} variants={itemVariants(i)} style={{position: 'absolute'}}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "w-14 h-14 rounded-full flex items-center justify-center bg-card hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-lg",
                          pathname === item.href ? "bg-primary text-primary-foreground" : "text-foreground"
                        )}
                        aria-label={item.label}
                      >
                        <item.icon className="w-6 h-6" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="bg-popover text-popover-foreground">
                      <p>{item.label}</p>
                    </TooltipContent>
                  </Tooltip>
                </motion.div>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
        <motion.button
          variants={orbVariants}
          animate={isOpen ? 'open' : 'closed'}
          onClick={() => setIsOpen(!isOpen)}
          className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-2xl focus:outline-none focus:ring-4 focus:ring-primary/50 relative z-10"
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isOpen ? 'close' : 'open'}
              initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? <X className="w-8 h-8" /> : <div className="w-8 h-8 rounded-full border-2 border-primary-foreground animate-pulse" />}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </div>
    </TooltipProvider>
  );
}
