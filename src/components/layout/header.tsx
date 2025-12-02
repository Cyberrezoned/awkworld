'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Logo from '@/components/icons/logo';

const navItems = [
  { href: '/products', label: 'Collection' },
  { href: '/stylist', label: 'AI Stylist' },
  { href: '/studio', label: 'AI Studio' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <div className="md:flex-1">
          <nav className="hidden md:flex items-center gap-8">
            {navItems.slice(0,1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative font-medium text-sm uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary',
                  pathname === item.href && 'text-foreground'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex justify-center md:flex-1">
            <Link href="/" className="flex items-center gap-2">
                <Logo className="h-8 w-auto text-foreground" />
            </Link>
        </div>
        
        <div className="md:flex-1 flex justify-end">
            <nav className="hidden md:flex items-center gap-8">
            {navItems.slice(1).map((item) => (
                <Link
                key={item.href}
                href={item.href}
                className={cn(
                    'relative font-medium text-sm uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary',
                    pathname === item.href && 'text-foreground'
                )}
                >
                {item.label}
                </Link>
            ))}
            </nav>
        </div>
      </div>
    </header>
  );
}
