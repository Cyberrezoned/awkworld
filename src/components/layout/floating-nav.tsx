
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
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
  closed: { scale: 0.5, opacity: 0, transition: { when: "afterChildren", staggerChildren: 0.05, staggerDirection: -1 } },
  open: {
    scale: 1,
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  closed: { opacity: 0, y: 20, scale: 0.8 },
  open: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } },
};

export default function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const controls = useAnimation();

  useEffect(() => {
    // Close menu on route change
    setIsOpen(false);
  }, [pathname]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <TooltipProvider>
      <div className="fixed bottom-8 right-8 z-50">
        <motion.nav
          initial={false}
          animate={isOpen ? 'open' : 'closed'}
          className="relative flex items-center justify-center"
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                variants={menuVariants}
                className="absolute bottom-0 right-0 w-80 h-80"
                style={{
                  pointerEvents: isOpen ? 'auto' : 'none',
                }}
              >
                {navItems.map((item, i) => {
                  const angle = -90 - i * 30;
                  const radius = 110;
                  const x = Math.cos((angle * Math.PI) / 180) * radius;
                  const y = Math.sin((angle * Math.PI) / 180) * radius;
                  return (
                    <motion.div
                      key={item.href}
                      variants={itemVariants}
                      style={{ position: 'absolute', left: `calc(50% - 1.75rem + ${x}px)`, top: `calc(50% - 1.75rem + ${y}px)` }}
                    >
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link
                            href={item.href}
                            onClick={handleLinkClick}
                            className={cn(
                              'w-14 h-14 rounded-full flex items-center justify-center bg-card hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-lg',
                              pathname === item.href ? 'bg-primary text-primary-foreground' : 'text-foreground'
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
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            variants={orbVariants}
            onClick={toggleMenu}
            className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-2xl focus:outline-none focus:ring-4 focus:ring-primary/50 relative z-10"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isOpen ? 'close' : 'open'}
                initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                {isOpen ? <X className="w-8 h-8" /> : <div className="w-8 h-8 rounded-full border-2 border-primary-foreground animate-pulse" />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </motion.nav>
      </div>
    </TooltipProvider>
  );
}
