'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const logoText = "AWKWORLD";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 200,
    },
  },
};

export default function Logo({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn("font-headline text-2xl font-bold tracking-wider flex", className)}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      aria-label={logoText}
    >
      {logoText.split('').map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          variants={letterVariants}
          className="inline-block"
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
}
