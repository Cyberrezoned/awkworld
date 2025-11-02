'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Logo from '@/components/icons/logo';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Collection' },
  { href: '/stylist', label: 'AI Stylist' },
  { href: '/studio', label: 'AI Studio' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-6 w-auto text-primary" />
          <span className="font-headline text-xl font-bold tracking-tighter text-foreground">
            AWKWARD
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative font-medium text-muted-foreground transition-colors hover:text-primary',
                pathname === item.href && 'text-foreground'
              )}
            >
              {item.label}
              {pathname === item.href && (
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                  layoutId="underline"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
